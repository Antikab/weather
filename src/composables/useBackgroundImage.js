import { ref } from 'vue'
// Константы
import { IMAGE_API_KEY, IMAGE_BASE_URL } from '@/constants'
// Утилиты
import { getBackgroundQuery } from '@/utils/utils'

export function useBackgroundImage(weatherInfo) {
  const defaultImage = new URL('@/assets/image/mrCat.jpg', import.meta.url).href
  const backgroundImage = ref(defaultImage)

  // Запрос картинок через Pexels API
  async function updateBackgroundImage() {
    if (!weatherInfo.value?.main?.temp) {
      return backgroundImage.value
    }
    const temp = Math.round(weatherInfo.value?.main?.temp)
    const query = getBackgroundQuery(temp)
    const randomPage = Math.floor(Math.random() * 10) + 1
    const url = `${IMAGE_BASE_URL}/search?query=${encodeURIComponent(query)}&page=${randomPage}&per_page=1`
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: IMAGE_API_KEY
        }
      })
      if (!response.ok) {
        throw new Error(`Ошибка запроса: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log(data)

      if (data.photos && data.photos.length > 0) {
        backgroundImage.value = data.photos[0].src.medium
      } else {
        backgroundImage.value = defaultImage
      }
    } catch (error) {
      console.error('Ошибка загрузки изображения с Pexels:', error.message)
      backgroundImage.value = defaultImage
    }
  }

  return { backgroundImage, updateBackgroundImage }
}
