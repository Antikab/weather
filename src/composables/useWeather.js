import { ref } from 'vue'
// Константы
import { WEATHER_API_KEY, WEATHER_BASE_URL } from '@/constants'

export function useWeather() {
  const weatherInfo = ref(null)
  // Запрос данных погоды по городу через OpenWeatherMap API
  async function getWeather(lat, lon) {
    const url = `${WEATHER_BASE_URL}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Ошибка запроса: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      weatherInfo.value = data
    } catch (error) {
      console.error('Ошибка загрузки погоды:', error.message)
    }
  }

  return { weatherInfo, getWeather }
}
