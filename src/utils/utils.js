// Функция для изменения первой буквы на заглавную
export function capitalizeFirstLetter(str) {
  return str.replace(/^./, (match) => match.toUpperCase())
}

// Функция для получения строки запроса для фонового изображения
export function getBackgroundQuery(temp) {
  if (typeof temp !== 'number' || isNaN(temp)) {
    return 'weather'
  } else if (temp <= -20) {
    return 'arctic weather'
  } else if (temp <= 0) {
    return 'winter weather'
  } else if (temp <= 10) {
    return 'chilly weather'
  } else if (temp <= 20) {
    return 'spring weather'
  } else if (temp <= 30) {
    return 'summer weather'
  } else if (temp <= 35) {
    return 'hot summer weather'
  } else if (temp > 35) {
    return 'desert weather'
  }
}

// Функция для получения класса градиента на основе температуры
export function getWeatherGradient(temp) {
  if (typeof temp !== 'number' || isNaN(temp)) return 'bg-weather-none'
  if (temp <= -21) return 'bg-weather-extreme-cold'
  if (temp <= -10) return 'bg-weather-icy'
  if (temp <= 0) return 'bg-weather-cold'
  if (temp <= 10) return 'bg-weather-freezing'
  if (temp <= 20) return 'bg-weather-cool'
  if (temp <= 30) return 'bg-weather-mild'
  if (temp <= 35) return 'bg-weather-warm'
  if (temp <= 40) return 'bg-weather-hot'
  return 'bg-weather-extreme'
}
