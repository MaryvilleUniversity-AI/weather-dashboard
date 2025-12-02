# Weather Dashboard
A simple Flask-bsaed web application that displays the current weather for any city using the OpenWeatherMap API. Users can enter a city name and view temperature, a weather description, humidity, and wind speed.

## Features
* Search weather by city name
* Temperature shown in both Celsius and Fahrenheit
* Live weather data from OpenWeatherMap API
* Clear, responsive front-end dashboard (HTML/CSS)
* Error handling for invalid cities or API issues

## Technologies Used
* Python
* Flask
* HTML/CSS
* OpenWeatherMap API

## Getting Started
**1. Install Dependencies**
``` bash
pip install -r requirements.txt
```

**2. Run the Flask app**
``` bash
python app.py
```
Then open:
``` cpp
http://127.0.0.1:5000
```

## Environment Variables
This project requires an OpenWeatherMap API key.
Create a ```.env``` file in the project root:
``` ini
API_KEY=YOUR_API_KEY_HERE
```

## Project Structure
``` cpp
weather-dashboard/
│── templates/
│     └── index.html
│── static/
      └── styles.css
│── .gitignore
│── README.md
│── app.py
│── requirements.txt
```

## Future Improvements
* Add 5-day forecast support
* Auto-suggest for city names
* Improved mobile layout
* More polished UI
