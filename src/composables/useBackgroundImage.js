import { ref } from 'vue'
import { createClient } from 'pexels'
// Константы
import { IMAGE_API_KEY } from '@/constants'
// Утилиты
import { getBackgroundQuery } from '@/utils/utils'

export function useBackgroundImage(weatherInfo) {
  const backgroundImage = ref(new URL('@/assets/image/mrCat.jpg', import.meta.url).href)
  const pexelsClient = createClient(IMAGE_API_KEY)

  // Запрос картинок через Pexels API
  async function updateBackgroundImage() {
    if (!weatherInfo.value?.main?.temp) {
      return backgroundImage.value
    }
    const temp = Math.round(weatherInfo.value?.main?.temp)
    const query = getBackgroundQuery(temp)
    const randomPage = Math.floor(Math.random() * 10) + 1
    try {
      const response = await pexelsClient.photos.search({
        query,
        page: randomPage,
        per_page: 1
      })
      if (response.photos && response.photos.length > 0) {
        backgroundImage.value = response.photos[0].src.medium
      } else {
        backgroundImage.value = new URL('@/assets/image/mrCat.jpg', import.meta.url).href
      }
    } catch (error) {
      console.error('Ошибка загрузки изображения с Pexels:', error.message)
      backgroundImage.value = new URL('@/assets/image/mrCat.jpg', import.meta.url).href
    }
  }

  return { backgroundImage, updateBackgroundImage }
}
