# Weather Dashboard

Interactive weather dashboard with a React frontend and Flask backend API, powered by OpenWeatherMap.

## Architecture

- Frontend: React + TypeScript + Vite in [frontend](frontend)
- Backend: Flask API in [app.py](app.py)
- Weather endpoint used by React: GET /api/weather?city=CityName

## Features

- Search weather by city name
- Dynamic weather-themed background and animated UI
- Temperature, feels-like, humidity, and wind speed display
- Error handling for invalid cities, missing API key, and network failures

## Environment Variable

Create a .env file in the project root with:

```ini
OPENWEATHER_API_KEY=YOUR_API_KEY_HERE
```

## Setup

1. Install Python dependencies

```bash
pip install -r requirements.txt
```

2. Install frontend dependencies

```bash
cd frontend
npm install
```

## Run in Development (split mode)

Start Flask API in terminal 1:

```bash
python app.py
```

Start React frontend in terminal 2:

```bash
npm run frontend:dev
```

Open:

```text
http://127.0.0.1:5173
```

The React dev server proxies /api requests to Flask at http://127.0.0.1:5000.

## Optional Legacy View

The original Flask-rendered page still exists at:

```text
http://127.0.0.1:5000
```

## Useful Scripts

From repo root:

- npm run frontend:dev
- npm run frontend:build
- npm run frontend:preview

## License

This project is for educational purposes and is free to use or modify.
