<script setup>
import { ref, onMounted } from 'vue'
import { format } from 'date-fns'
// Composables
import { useWeather } from '@/composables/useWeather'
import { useBackgroundImage } from '@/composables/useBackgroundImage'
// Компоненты
import Widget from '@/components/Widget.vue'

const coordinates = ref({ lat: null, lon: null })
const today = new Date()
const formattedDate = format(today, 'EEEE, d MMM') // текущая дата

const { weatherInfo, getWeather } = useWeather()
const { backgroundImage, updateBackgroundImage } = useBackgroundImage(weatherInfo)

// Геолокация
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
}

async function success(position) {
  const { latitude, longitude } = position.coords
  coordinates.value = { lat: latitude, lon: longitude }
  await getWeather(latitude, longitude)
  await updateBackgroundImage()
}

async function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`)
  // Задаем координаты по умолчанию (Москва)
  const defaultLat = 55.7558
  const defaultLon = 37.6176
  coordinates.value = { lat: defaultLat, lon: defaultLon }
  await getWeather(defaultLat, defaultLon)
  await updateBackgroundImage()
}

// Координаты пользователя
onMounted(() => {
  navigator.geolocation.getCurrentPosition(success, error, options)
})
</script>

<template>
  <Widget
    :weatherInfo="weatherInfo"
    :formattedDate="formattedDate"
    :backgroundImage="backgroundImage"
  />
</template>
