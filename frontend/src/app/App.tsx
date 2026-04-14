import { type FormEvent, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Search } from 'lucide-react'
import { fetchWeather } from '../services/weatherApi'
import type { WeatherData } from '../types/weather'
import { WeatherBackground } from '../components/weather/WeatherBackground'
import { WeatherCard } from '../components/weather/WeatherCard'

const defaultHint = 'Try searching for any city name (e.g. New York, London, Tokyo).'

function App() {
  const [cityInput, setCityInput] = useState('')
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const nowUnix = Math.floor(Date.now() / 1000)
  const isDaytime = Boolean(
    weather &&
      typeof weather.sunrise === 'number' &&
      typeof weather.sunset === 'number' &&
      nowUnix >= weather.sunrise &&
      nowUnix < weather.sunset
  )

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const city = cityInput.trim()

    if (!city) {
      setError('Please enter a city name')
      setWeather(null)
      return
    }

    setLoading(true)
    setError('')

    try {
      const nextWeather = await fetchWeather(city)
      setWeather(nextWeather)
      setError('')
    } catch (err) {
      setWeather(null)
      setError(err instanceof Error ? err.message : 'Network issue while contacting the weather service. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <WeatherBackground
          key={`${weather?.weatherType || 'clear'}-${isDaytime ? 'day' : 'night'}`}
          weatherType={weather?.weatherType || 'clear'}
          isDaytime={isDaytime}
        />
      </AnimatePresence>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
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
              textShadow: '0 2px 20px rgba(0,0,0,0.2)',
            }}
          >
            Weather Dashboard
          </h1>
          <p
            className="text-white/70"
            style={{
              fontSize: '1.125rem',
              letterSpacing: '0.05em',
              textShadow: '0 1px 10px rgba(0,0,0,0.2)',
            }}
          >
            Discover the atmosphere of any city
          </p>
        </motion.div>

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
              disabled={loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-all backdrop-blur-sm disabled:opacity-60"
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

        <AnimatePresence mode="wait">{weather && <WeatherCard key={weather.city} weather={weather} />}</AnimatePresence>

        {!weather && !error && (
          <motion.p
            className="text-white/60 text-center max-w-md backdrop-blur-md bg-white/5 px-6 py-4 rounded-2xl border border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ fontSize: '0.875rem', lineHeight: '1.6' }}
          >
            {loading ? 'Loading weather data...' : defaultHint}
          </motion.p>
        )}
      </div>
    </div>
  )
}

export default App
