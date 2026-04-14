from flask import Flask, jsonify, render_template, request
import os

import requests
from dotenv import load_dotenv


app = Flask(__name__)
load_dotenv()

API_KEY = os.getenv("OPENWEATHER_API_KEY")


def classify_weather(condition_id: int, description: str) -> str:
    description = (description or "").lower()

    if condition_id == 800:
        return "clear"
    if 801 <= condition_id <= 804:
        return "cloudy"
    if 200 <= condition_id < 300:
        return "stormy"
    if 300 <= condition_id < 600:
        return "rainy"
    if 600 <= condition_id < 700:
        return "snowy"
    if any(keyword in description for keyword in ("thunder", "storm")):
        return "stormy"
    if "snow" in description:
        return "snowy"
    if "rain" in description or "drizzle" in description:
        return "rainy"
    if any(keyword in description for keyword in ("cloud", "mist", "fog", "haze")):
        return "cloudy"
    if "clear" in description or "sun" in description:
        return "sunny"

    return "clear"


def fetch_weather_for_city(city: str):
    city = (city or "").strip()
    if not city:
        return None, "Please enter a city name.", 400

    if not API_KEY:
        return None, "Missing OPENWEATHER_API_KEY. Add it to your .env file.", 500

    try:
        response = requests.get(
            "https://api.openweathermap.org/data/2.5/weather",
            params={
                "q": city,
                "appid": API_KEY,
                "units": "metric",
            },
            timeout=10,
        )
        payload = response.json()
        code = str(payload.get("cod", ""))

        if code != "200":
            return None, payload.get("message", "Unable to fetch weather right now.").capitalize(), 404

        weather_data = payload["weather"][0]
        main_data = payload["main"]
        wind_data = payload.get("wind", {})
        sys_data = payload.get("sys", {})
        condition_id = int(weather_data.get("id", 0))
        description = weather_data.get("description", "N/A").title()
        weather_type = classify_weather(condition_id, weather_data.get("main", description))
        icon_code = weather_data.get("icon")
        temp_c = round(main_data.get("temp", 0), 1)
        feels_like_c = round(main_data.get("feels_like", temp_c), 1)
        wind_kmh = round(wind_data.get("speed", 0) * 3.6)

        weather = {
            "city": payload.get("name", city.title()),
            "country": sys_data.get("country", ""),
            "sunrise": sys_data.get("sunrise"),
            "sunset": sys_data.get("sunset"),
            "temperature": temp_c,
            "temperatureF": round((temp_c * 9 / 5) + 32, 1),
            "temperature_f": round((temp_c * 9 / 5) + 32, 1),
            "feelsLike": feels_like_c,
            "feelsLikeF": round((feels_like_c * 9 / 5) + 32, 1),
            "feels_like": feels_like_c,
            "feels_like_f": round((feels_like_c * 9 / 5) + 32, 1),
            "condition": weather_data.get("main", "Unknown"),
            "description": description,
            "weatherType": weather_type,
            "weather_type": weather_type,
            "humidity": main_data.get("humidity", "N/A"),
            "windSpeed": wind_kmh,
            "wind_speed": wind_kmh,
            "iconUrl": f"https://openweathermap.org/img/wn/{icon_code}@2x.png" if icon_code else None,
            "icon_url": f"https://openweathermap.org/img/wn/{icon_code}@2x.png" if icon_code else None,
        }
        return weather, None, 200
    except (requests.RequestException, ValueError, KeyError):
        return None, "Network issue while contacting the weather service. Please try again.", 502


@app.route("/", methods=["GET", "POST"])
def index():
    weather = None
    error = None

    if request.method == "POST":
        weather, error, _ = fetch_weather_for_city(request.form.get("city"))

    weather_type = weather["weatherType"] if weather else "clear"
    return render_template("index.html", weather=weather, error=error, weather_type=weather_type)


@app.get("/api/weather")
def get_weather():
    weather, error, status = fetch_weather_for_city(request.args.get("city"))
    if error:
        return jsonify({"error": error}), status
    return jsonify(weather), 200


if __name__ == "__main__":
    app.run(debug=True)