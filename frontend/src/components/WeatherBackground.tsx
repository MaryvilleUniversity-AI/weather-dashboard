import { motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'

interface WeatherBackgroundProps {
  weatherType: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'stormy' | 'clear'
  isDaytime?: boolean
}

export function WeatherBackground({ weatherType, isDaytime = false }: WeatherBackgroundProps) {
  const [lightning, setLightning] = useState(false)

  useEffect(() => {
    if (weatherType === 'stormy') {
      const interval = setInterval(() => {
        setLightning(true)
        setTimeout(() => setLightning(false), 200)
      }, Math.random() * 4000 + 2000)

      return () => clearInterval(interval)
    }

    return undefined
  }, [weatherType])

  const sceneHeight = typeof window !== 'undefined' ? window.innerHeight : 1080

  const rainDrops = useMemo(
    () =>
      [...Array(96)].map((_, i) => {
        const nearLayer = i % 3 !== 0

        return {
          id: i,
          left: Math.random() * 100,
          height: nearLayer ? 28 + Math.random() * 26 : 18 + Math.random() * 16,
          width: nearLayer ? 1 : 0.8,
          duration: nearLayer ? 0.85 + Math.random() * 0.45 : 1.15 + Math.random() * 0.45,
          delay: Math.random() * 2.2,
          drift: 120 + Math.random() * 70,
          angle: 18 + Math.random() * 12,
          peakOpacity: nearLayer ? 0.95 : 0.65,
          blur: nearLayer ? 0.35 : 0.6,
        }
      }),
    []
  )

  const stars = useMemo(
    () =>
      [...Array(90)].map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 68,
        size: 1 + Math.random() * 2.2,
        opacity: 0.35 + Math.random() * 0.55,
        delay: Math.random() * 3,
        duration: 2.8 + Math.random() * 3.2,
      })),
    []
  )

  const getBackgroundGradient = () => {
    switch (weatherType) {
      case 'sunny':
        return isDaytime
          ? 'linear-gradient(135deg, #FF6B35 0%, #FF8E53 25%, #FFB347 50%, #FFA500 75%, #FF7F50 100%)'
          : 'linear-gradient(180deg, #1B2544 0%, #273765 55%, #35508E 100%)'
      case 'cloudy':
        return isDaytime
          ? 'linear-gradient(180deg, #B0B8C1 0%, #8B95A0 30%, #CFD8DC 100%)'
          : 'linear-gradient(180deg, #2A3240 0%, #3A4353 45%, #4D5A6E 100%)'
      case 'rainy':
        return isDaytime
          ? 'linear-gradient(180deg, #4A5F7A 0%, #6B7F99 50%, #8BA3B8 100%)'
          : 'linear-gradient(180deg, #1E2A3D 0%, #29384D 50%, #3C4F67 100%)'
      case 'snowy':
        return isDaytime
          ? 'linear-gradient(180deg, #8BA3B8 0%, #A8BFD1 40%, #C4D7E6 100%)'
          : 'linear-gradient(180deg, #2A3850 0%, #394C66 45%, #526985 100%)'
      case 'stormy':
        return isDaytime
          ? 'linear-gradient(180deg, #2C3E50 0%, #34495E 30%, #1C2833 70%, #0B1622 100%)'
          : 'linear-gradient(180deg, #121A26 0%, #172132 35%, #0F1726 70%, #090F1B 100%)'
      case 'clear':
        return isDaytime
          ? 'linear-gradient(180deg, #67B7F8 0%, #8FCBFF 45%, #DDF3FF 100%)'
          : 'linear-gradient(180deg, #0C1630 0%, #182C55 45%, #2A3D6A 100%)'
      default:
        return isDaytime
          ? 'linear-gradient(180deg, #6EB9FF 0%, #A6D5FF 55%, #E4F5FF 100%)'
          : 'linear-gradient(180deg, #101A35 0%, #1B2E59 60%, #2A4176 100%)'
    }
  }

  return (
    <div className="fixed inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ background: getBackgroundGradient() }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {isDaytime && (
        <motion.div
          className="absolute top-20 right-32 w-48 h-48 rounded-full bg-yellow-300/80 blur-xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [0.8, 1.1, 0.8],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {!isDaytime && (
        <>
          <div className="absolute inset-0 pointer-events-none">
            {stars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${star.left}%`,
                  top: `${star.top}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  opacity: star.opacity,
                }}
                animate={{
                  opacity: [star.opacity * 0.35, star.opacity, star.opacity * 0.45],
                  scale: [1, 1.15, 0.95],
                }}
                transition={{
                  duration: star.duration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: star.delay,
                }}
              />
            ))}
          </div>

          <motion.div
            className="absolute top-16 right-24 w-40 h-40 rounded-full bg-slate-100/95"
            style={{ boxShadow: '0 0 45px rgba(226, 232, 240, 0.55)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="absolute -left-3 top-7 w-40 h-40 rounded-full bg-[#1A2D54]/80" />
          </motion.div>
        </>
      )}

      {(weatherType === 'rainy' || weatherType === 'stormy') && (
        <div className="absolute top-0 left-0 w-full h-64">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/20 backdrop-blur-sm"
              style={{
                width: `${120 + Math.random() * 100}px`,
                height: `${60 + Math.random() * 40}px`,
                top: `${Math.random() * 150}px`,
                left: `${i * 20}%`,
              }}
              initial={{ x: -100, opacity: 0 }}
              animate={{
                x: [0, 30, 0],
                opacity: 0.3,
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      )}

      {(weatherType === 'rainy' || weatherType === 'stormy') && (
        <div className="absolute inset-0 pointer-events-none">
          {rainDrops.map((drop) => (
            <motion.div
              key={drop.id}
              className="absolute bg-gradient-to-b from-white/70 via-white/45 to-transparent"
              style={{
                width: `${drop.width}px`,
                height: `${drop.height}px`,
                left: `${drop.left}%`,
                top: -80,
                opacity: drop.peakOpacity,
                filter: `blur(${drop.blur}px)`,
                transform: `rotate(${drop.angle}deg)`,
                transformOrigin: 'center top',
              }}
              animate={{
                y: [-30, sceneHeight + 80],
                x: [0, drop.drift],
                opacity: [0, drop.peakOpacity * 0.5, drop.peakOpacity, drop.peakOpacity * 0.7, 0],
              }}
              transition={{
                duration: drop.duration,
                repeat: Infinity,
                ease: 'linear',
                delay: drop.delay,
              }}
            />
          ))}
        </div>
      )}

      {weatherType === 'snowy' && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full shadow-lg"
              style={{
                left: `${Math.random() * 100}%`,
                top: -20,
              }}
              animate={{
                y: [0, sceneHeight + 20],
                x: [0, Math.sin(i) * 50],
                opacity: [0, 1, 0.8, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                ease: 'linear',
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      )}

      {weatherType === 'stormy' && lightning && (
        <motion.div
          className="absolute inset-0 bg-white/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0, 1, 0] }}
          transition={{ duration: 0.2 }}
        />
      )}
    </div>
  )
}
