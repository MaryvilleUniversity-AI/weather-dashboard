import type { WeatherData } from '../types/weather'

export async function fetchWeather(city: string): Promise<WeatherData> {
  const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`)
  const payload = (await response.json()) as WeatherData | { error?: string }

  if (!response.ok) {
    throw new Error(payload && 'error' in payload ? payload.error || 'Unable to fetch weather right now.' : 'Unable to fetch weather right now.')
  }

  return payload as WeatherData
}
