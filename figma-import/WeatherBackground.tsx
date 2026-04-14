import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface WeatherBackgroundProps {
  weatherType: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'stormy' | 'clear';
}

export function WeatherBackground({ weatherType }: WeatherBackgroundProps) {
  const [lightning, setLightning] = useState(false);

  useEffect(() => {
    if (weatherType === 'stormy') {
      const interval = setInterval(() => {
        setLightning(true);
        setTimeout(() => setLightning(false), 200);
      }, Math.random() * 4000 + 2000);

      return () => clearInterval(interval);
    }
  }, [weatherType]);

  const getBackgroundGradient = () => {
    switch (weatherType) {
      case 'sunny':
        return 'linear-gradient(135deg, #FF6B35 0%, #FF8E53 25%, #FFB347 50%, #FFA500 75%, #FF7F50 100%)';
      case 'cloudy':
        return 'linear-gradient(180deg, #B0B8C1 0%, #8B95A0 30%, #CFD8DC 100%)';
      case 'rainy':
        return 'linear-gradient(180deg, #4A5F7A 0%, #6B7F99 50%, #8BA3B8 100%)';
      case 'snowy':
        return 'linear-gradient(180deg, #8BA3B8 0%, #A8BFD1 40%, #C4D7E6 100%)';
      case 'stormy':
        return 'linear-gradient(180deg, #2C3E50 0%, #34495E 30%, #1C2833 70%, #0B1622 100%)';
      case 'clear':
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)';
      default:
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ background: getBackgroundGradient() }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Sun */}
      {weatherType === 'sunny' && (
        <motion.div
          className="absolute top-20 right-32 w-48 h-48 rounded-full bg-yellow-300/80 blur-xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [0.8, 1.1, 0.8],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Clouds */}
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
                opacity: 0.3
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5
              }}
            />
          ))}
        </div>
      )}

      {/* Rain */}
      {(weatherType === 'rainy' || weatherType === 'stormy') && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(80)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 bg-gradient-to-b from-white/60 to-transparent"
              style={{
                height: `${20 + Math.random() * 20}px`,
                left: `${Math.random() * 100}%`,
                top: -50,
              }}
              animate={{
                y: [0, window.innerHeight + 50],
                opacity: [0, 1, 0.8, 0]
              }}
              transition={{
                duration: 0.8 + Math.random() * 0.5,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      )}

      {/* Snow */}
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
                y: [0, window.innerHeight + 20],
                x: [0, Math.sin(i) * 50],
                opacity: [0, 1, 0.8, 0]
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 3
              }}
            />
          ))}
        </div>
      )}

      {/* Lightning flash */}
      {weatherType === 'stormy' && lightning && (
        <motion.div
          className="absolute inset-0 bg-white/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0, 1, 0] }}
          transition={{ duration: 0.2 }}
        />
      )}
    </div>
  );
}
