# Weather Dashboard

Interactive weather dashboard with a Flask backend and a modern React frontend (Figma-inspired UI), powered by the OpenWeatherMap API.

## Architecture

- Backend: Flask app in [`app.py`](app.py)
- Frontend: React + TypeScript + Vite + Tailwind CSS v4 in [`frontend`](frontend)
- Frontend weather request: `GET /api/weather?city=CityName`
- Vite dev proxy forwards `/api` to Flask at `http://127.0.0.1:5000`

## App Features

- Search real-time weather by city name using OpenWeatherMap
- Animated glassmorphism weather card UI
- Dynamic weather backgrounds (clear/cloudy/rainy/snowy/stormy)
- Day/night scene behavior driven by API sunrise/sunset times
- Weather details: temperature, feels-like, humidity, wind speed, condition, and description
- Robust error handling for invalid city names, missing API key, and network issues

## Prerequisites

- Python 3.10+ (recommended)
- Node.js 18+ (recommended)
- npm

## Environment Setup

Create a `.env` file in the project root:

```ini
OPENWEATHER_API_KEY=YOUR_API_KEY_HERE
```

## Installation

Install backend dependencies (from repo root):

```bash
pip install -r requirements.txt
```

Install frontend dependencies:

```bash
npm --prefix frontend install
```

## Run the App (Development)

Use two terminals from the repo root.

Terminal 1: start Flask API server

```bash
python app.py
```

Terminal 2: start React frontend

```bash
npm run frontend:dev
```

Then open:

```text
http://127.0.0.1:5173
```

## Build Frontend for Production

From repo root:

```bash
npm run frontend:build
```

Preview the production frontend build locally:

```bash
npm run frontend:preview
```

## Optional Legacy Flask View

The original Flask-rendered template is still available at:

```text
http://127.0.0.1:5000
```

## Useful Scripts (Repo Root)

- `npm run frontend:dev` - start Vite dev server
- `npm run frontend:build` - type-check and build frontend
- `npm run frontend:preview` - preview built frontend

## License

This project is for educational purposes and free to use or modify.
