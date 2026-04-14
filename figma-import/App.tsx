import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search } from "lucide-react";
import { WeatherBackground } from "./components/WeatherBackground";
import { WeatherCard } from "./components/WeatherCard";

// Mock weather data for different cities
const mockWeatherData: Record<string, any> = {
  "new york": {
    city: "New York",
    country: "United States",
    temperature: 22,
    feelsLike: 20,
    condition: "Partly Cloudy",
    weatherType: "cloudy" as const,
    humidity: 65,
    windSpeed: 15,
    description: "Clouds moving in from the west"
  },
  "london": {
    city: "London",
    country: "United Kingdom",
    temperature: 12,
    feelsLike: 10,
    condition: "Rainy",
    weatherType: "rainy" as const,
    humidity: 85,
    windSpeed: 20,
    description: "Light rain throughout the day"
  },
  "tokyo": {
    city: "Tokyo",
    country: "Japan",
    temperature: 28,
    feelsLike: 30,
    condition: "Sunny",
    weatherType: "sunny" as const,
    humidity: 45,
    windSpeed: 8,
    description: "Clear skies with brilliant sunshine"
  },
  "moscow": {
    city: "Moscow",
    country: "Russia",
    temperature: -5,
    feelsLike: -8,
    condition: "Snowy",
    weatherType: "snowy" as const,
    humidity: 90,
    windSpeed: 25,
    description: "Heavy snowfall expected"
  },
  "miami": {
    city: "Miami",
    country: "United States",
    temperature: 18,
    feelsLike: 16,
    condition: "Thunderstorm",
    weatherType: "stormy" as const,
    humidity: 95,
    windSpeed: 35,
    description: "Severe thunderstorms with lightning"
  },
  "paris": {
    city: "Paris",
    country: "France",
    temperature: 16,
    feelsLike: 15,
    condition: "Cloudy",
    weatherType: "cloudy" as const,
    humidity: 70,
    windSpeed: 12,
    description: "Overcast skies throughout the day"
  },
  "sydney": {
    city: "Sydney",
    country: "Australia",
    temperature: 25,
    feelsLike: 26,
    condition: "Clear",
    weatherType: "sunny" as const,
    humidity: 55,
    windSpeed: 10,
    description: "Perfect beach weather"
  },
  "dubai": {
    city: "Dubai",
    country: "United Arab Emirates",
    temperature: 38,
    feelsLike: 42,
    condition: "Sunny",
    weatherType: "sunny" as const,
    humidity: 35,
    windSpeed: 5,
    description: "Hot and dry desert climate"
  },
  "reykjavik": {
    city: "Reykjavik",
    country: "Iceland",
    temperature: 2,
    feelsLike: -2,
    condition: "Snowy",
    weatherType: "snowy" as const,
    humidity: 88,
    windSpeed: 30,
    description: "Snow showers with strong winds"
  },
  "singapore": {
    city: "Singapore",
    country: "Singapore",
    temperature: 31,
    feelsLike: 35,
    condition: "Rainy",
    weatherType: "rainy" as const,
    humidity: 80,
    windSpeed: 15,
    description: "Tropical afternoon showers"
  }
};

export default function App() {
  const [cityInput, setCityInput] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cityKey = cityInput.toLowerCase().trim();

    if (!cityKey) {
      setError("Please enter a city name");
      return;
    }

    const weatherData = mockWeatherData[cityKey];

    if (weatherData) {
      setWeather(weatherData);
      setError("");
    } else {
      setError("City not found. Try: New York, London, Tokyo, Moscow, Miami, Paris, Sydney, Dubai, Reykjavik, Singapore");
      setWeather(null);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Dynamic Weather Background */}
      <AnimatePresence mode="wait">
        <WeatherBackground
          key={weather?.weatherType || 'clear'}
          weatherType={weather?.weatherType || 'clear'}
        />
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className="text-white mb-3"
            style={{
              fontSize: '3.5rem',
              fontWeight: '300',
              letterSpacing: '-0.02em',
              textShadow: '0 2px 20px rgba(0,0,0,0.2)'
            }}
          >
            Weather Dashboard
          </h1>
          <p
            className="text-white/70"
            style={{
              fontSize: '1.125rem',
              letterSpacing: '0.05em',
              textShadow: '0 1px 10px rgba(0,0,0,0.2)'
            }}
          >
            Discover the atmosphere of any city
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.form
          onSubmit={handleSearch}
          className="relative mb-12 w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative">
            <input
              type="text"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              placeholder="Enter city name..."
              className="w-full px-6 py-4 pr-14 rounded-2xl backdrop-blur-xl bg-white/15 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all shadow-xl"
              style={{ fontSize: '1rem' }}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-all backdrop-blur-sm"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute mt-3 text-white/90 px-4 py-2 rounded-lg backdrop-blur-md bg-red-500/30 border border-red-300/30"
              style={{ fontSize: '0.875rem' }}
            >
              {error}
            </motion.p>
          )}
        </motion.form>

        {/* Weather Card */}
        <AnimatePresence mode="wait">
          {weather && (
            <WeatherCard key={weather.city} weather={weather} />
          )}
        </AnimatePresence>

        {/* Hint text when no weather is shown */}
        {!weather && !error && (
          <motion.p
            className="text-white/60 text-center max-w-md backdrop-blur-md bg-white/5 px-6 py-4 rounded-2xl border border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ fontSize: '0.875rem', lineHeight: '1.6' }}
          >
            Try searching for: New York, London, Tokyo, Moscow, Miami, Paris, Sydney, Dubai, Reykjavik, or Singapore
          </motion.p>
        )}
      </div>
    </div>
  );
}
