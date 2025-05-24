const MAX_AGE = 100

export const parseAgeInput = (value: string | null) => {
  if (value === null) return ''

  // Удаляем все нецифровые символы
  const cleaned = value.replace(/[^\d]/g, '')

  // Обрезаем строку до 3 символов
  const trimmed = cleaned.slice(0, 3)

  // Проверяем на пустую строку
  if (!trimmed) return ''

  // Преобразуем в число и проверяем максимум
  const numericValue = parseInt(trimmed, 10)

  if (numericValue > MAX_AGE) {
    return '100'
  }

  // Убираем ведущие нули (кроме единственного нуля)
  return String(numericValue)
}
