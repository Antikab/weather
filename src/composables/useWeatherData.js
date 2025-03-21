import { computed } from 'vue'
// Утилиты
import { capitalizeFirstLetter, getWeatherGradient } from '@/utils/utils'
// Константы
import { WEATHER_IMG_URL } from '@/constants/index'
import { localWeatherIcons } from '@/constants/localWeatherIcons'

export function useWeatherData(weatherInfo) {
  // Температура (мин/макс и сейчас)
  const weatherTemp = computed(() => {
    if (!weatherInfo.value?.main) {
      return {
        temp: 'N/A',
        temp_min: 'N/A',
        temp_max: 'N/A'
      }
    }
    const { temp, temp_min, temp_max } = weatherInfo.value.main
    return {
      temp: Math.round(temp),
      temp_min: Math.round(temp_min),
      temp_max: Math.round(temp_max)
    }
  })

  // Градиент = температура
  const weatherGradient = computed(() => getWeatherGradient(weatherTemp.value.temp))

  // Название города
  const weatherCity = computed(() => weatherInfo.value?.name || 'Not loaded..')

  // Иконка и описание погоды
  const weatherData = computed(() => {
    if (!weatherInfo.value?.weather?.length) {
      // Если данные погоды отсутствуют, возвращаем дефолтную иконку с API
      return {
        icon: new URL('../assets/image/weather/none.png', import.meta.url).href,
        description: 'Not loaded..'
      }
    }

    let { icon, description } = weatherInfo.value.weather[0] //название иконки и погоды
    let iconUrl = `${WEATHER_IMG_URL}/${icon}@2x.png`

    description = capitalizeFirstLetter(description)

    if (localWeatherIcons[description]) {
      // Если для данного описания есть локальная иконка то берем ее
      iconUrl = new URL(
        `../assets/image/weather/${localWeatherIcons[description]}`,
        import.meta.url
      ).href
    }

    return {
      icon: iconUrl,
      description
    }
  })

  return {
    weatherTemp,
    weatherGradient,
    weatherCity,
    weatherData
  }
}
