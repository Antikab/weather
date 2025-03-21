<script setup>
import { toRef } from 'vue'
// Утилиты и composables
import { useWeatherData } from '@/composables/useWeatherData'

const props = defineProps({
  weatherInfo: {
    type: [Object, null],
    required: true
  },
  formattedDate: {
    type: String,
    required: true
  },
  backgroundImage: {
    type: String,
    required: true
  }
})

const { weatherTemp, weatherGradient, weatherCity, weatherData } = useWeatherData(
  toRef(() => props.weatherInfo)
)
</script>

<template>
  <div class="flex justify-center items-center h-screen overflow-hidden">
    <div class="flex flex-col w-[243px] h-[332px] shadow-8-16 rounded-2xl">
      <div :class="[weatherGradient, 'relative flex h-[239px] w-full p-6 rounded-t-2xl']">
        <div class="flex">
          <img
            :src="backgroundImage"
            alt="Weather"
            class="absolute inset-0 w-full h-full object-cover rounded-t-2xl -z-10"
          />
          <div class="flex flex-col items-center w-full z-10">
            <h1 class="title-40 text-white pl-4">{{ weatherTemp.temp }}°</h1>
            <h2 class="title-15 text-white uppercase tracking-[0.07em]">{{ weatherCity }}</h2>
          </div>
        </div>
      </div>
      <div class="flex flex-col p-4 z-10">
        <h3 class="pb-1.5 title-15 opacity-70">{{ formattedDate }}</h3>
        <div class="flex justify-between items-center">
          <div class="flex flex-col">
            <p class="pb-0.5 title-12 text-neutral-color-2 opacity-40">
              {{ weatherData.description }}
            </p>
            <p class="title-12 text-neutral-color-2 opacity-40">
              {{ weatherTemp.temp_min }}° / {{ weatherTemp.temp_max }}°
            </p>
          </div>
          <img class="size-[38px] text-[9px]" :src="weatherData.icon" alt="Icon weather" />
        </div>
      </div>
    </div>
  </div>
</template>
