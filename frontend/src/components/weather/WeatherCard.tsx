import { Cloud, CloudLightning, CloudRain, CloudSnow, Sun } from 'lucide-react'
import { motion } from 'motion/react'
import type { WeatherData } from '../../types/weather'

interface WeatherCardProps {
  weather: WeatherData
}

export function WeatherCard({ weather }: WeatherCardProps) {
  const getWeatherIcon = () => {
    const iconProps = { className: 'w-24 h-24', strokeWidth: 1.5 }

    switch (weather.weatherType) {
      case 'sunny':
        return <Sun {...iconProps} />
      case 'cloudy':
        return <Cloud {...iconProps} />
      case 'rainy':
        return <CloudRain {...iconProps} />
      case 'snowy':
        return <CloudSnow {...iconProps} />
      case 'stormy':
        return <CloudLightning {...iconProps} />
      default:
        return <Cloud {...iconProps} />
    }
  }

  return (
    <motion.div
      className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 shadow-2xl max-w-md w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-white/90 mb-1" style={{ fontSize: '1.125rem', letterSpacing: '0.05em' }}>
            {weather.city}
          </h2>
          <p className="text-white/60" style={{ fontSize: '0.875rem' }}>
            {weather.country}
          </p>
        </motion.div>

        <div className="flex items-start justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-white" style={{ fontSize: '5rem', lineHeight: '1', fontWeight: '300' }}>
              {Math.round(weather.temperature)}°
            </div>
            <p className="text-white/70 mt-2" style={{ fontSize: '1rem' }}>
              Feels like {Math.round(weather.feelsLike)}°
            </p>
          </motion.div>

          <motion.div
            className="text-white/90"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            {getWeatherIcon()}
          </motion.div>
        </div>

        <motion.div
          className="mb-8 pb-8 border-b border-white/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-white/90" style={{ fontSize: '1.5rem', fontWeight: '500' }}>
            {weather.condition}
          </p>
          <p className="text-white/60 mt-1" style={{ fontSize: '0.875rem' }}>
            {weather.description}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div>
            <p className="text-white/50 mb-1" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Humidity
            </p>
            <p className="text-white/90" style={{ fontSize: '1.25rem', fontWeight: '500' }}>
              {weather.humidity}%
            </p>
          </div>
          <div>
            <p className="text-white/50 mb-1" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Wind Speed
            </p>
            <p className="text-white/90" style={{ fontSize: '1.25rem', fontWeight: '500' }}>
              {weather.windSpeed} km/h
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
