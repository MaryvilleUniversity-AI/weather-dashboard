from flask import Flask, render_template, request
import requests
from dotenv import load_dotenv
import os

app = Flask(__name__)
load_dotenv()
API_KEY = os.getenv("OPENWEATHER_API_KEY")

@app.route('/', methods=['GET', 'POST'])
def index():
    weather = None
    if request.method == 'POST':
        city = request.form.get('city')
        url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
        response = requests.get(url).json()
        if response.get('cod') == 200:
            weather = {
                'city': response['name'],
                'temp_c': response['main']['temp'],
                'temp_f': round((response['main']['temp'] * 9/5) + 32, 2),
                'desc': response['weather'][0]['description'],
                'humidity': response['main']['humidity'],
                'wind': response['wind']['speed']
            }

    return render_template('index.html', weather=weather)

if __name__ == '__main__':
    app.run(debug=True)