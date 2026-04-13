from flask import Flask, render_template, request, session
import requests
from dotenv import load_dotenv
import os

app = Flask(__name__)
load_dotenv()
API_KEY = os.getenv("OPENWEATHER_API_KEY")
app.secret_key = os.getenv("FLASK_SECRET_KEY", "dev-secret-key-change-me")

@app.route('/', methods=['GET', 'POST'])
def index():
    weather = None
    error = None
    recent_searches = session.get('recent_searches', [])

    if request.method == 'POST':
        city = (request.form.get('city') or '').strip()
        if not city:
            error = 'Please enter a city name.'
        elif not API_KEY:
            error = 'Missing OPENWEATHER_API_KEY. Add it to your .env file.'
        else:
            try:
                url = "https://api.openweathermap.org/data/2.5/weather"
                params = {
                    'q': city,
                    'appid': API_KEY,
                    'units': 'metric'
                }
                api_response = requests.get(url, params=params, timeout=10)
                response = api_response.json()

                code = str(response.get('cod', ''))
                if code == '200':
                    icon = response['weather'][0].get('icon')
                    normalized_city = response['name']
                    weather = {
                        'city': normalized_city,
                        'temp_c': round(response['main']['temp'], 1),
                        'temp_f': round((response['main']['temp'] * 9 / 5) + 32, 1),
                        'desc': response['weather'][0].get('description', 'N/A').title(),
                        'condition': response['weather'][0].get('main', 'Unknown'),
                        'humidity': response['main'].get('humidity', 'N/A'),
                        'wind': response['wind'].get('speed', 'N/A'),
                        'icon_url': f"https://openweathermap.org/img/wn/{icon}@2x.png" if icon else None,
                    }

                    updated_searches = [s for s in recent_searches if s.lower() != normalized_city.lower()]
                    updated_searches.insert(0, normalized_city)
                    session['recent_searches'] = updated_searches[:5]
                    session.modified = True
                    recent_searches = session['recent_searches']
                else:
                    error = response.get('message', 'Unable to fetch weather right now.').capitalize()
            except requests.RequestException:
                error = 'Network issue while contacting weather service. Please try again.'

    return render_template('index.html', weather=weather, error=error, recent_searches=recent_searches)

if __name__ == '__main__':
    app.run(debug=True)