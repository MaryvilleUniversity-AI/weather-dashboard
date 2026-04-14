export type WeatherType = 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'stormy' | 'clear'

export interface WeatherData {
  city: string
  country: string
  sunrise?: number
  sunset?: number
  temperature: number
  feelsLike: number
  condition: string
  weatherType: WeatherType
  humidity: number
  windSpeed: number
  description: string
}
