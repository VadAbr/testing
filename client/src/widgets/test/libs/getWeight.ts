type ValidationResult = {
  isValid: boolean
  error?: string
}

export const getWeight_tire = (value: number) => {
  if (value >= 1 && value <= 4) {
    return 2
  }

  if (value >= 5 && value <= 7) {
    return 0
  }

  if (value >= 8 && value <= 10) {
    return -2
  }

  return 0
}

export const getWeight_pressure = (value: string): number => {
  const trimmedValue = value.trim()

  const validationResult = validateBloodPressure(trimmedValue)
  if (!validationResult.isValid) return 0

  const [systolicStr, diastolicStr] = trimmedValue.split('/')
  const systolic = parseInt(systolicStr, 10)
  const diastolic = parseInt(diastolicStr, 10)

  if (systolic === 120 && diastolic === 80) return 2

  const isSystolicMinor = systolic >= 90 && systolic <= 130
  const isDiastolicMinor = diastolic >= 60 && diastolic <= 90

  return isSystolicMinor && isDiastolicMinor ? 0 : -2
}

const validateBloodPressure = (value: string): ValidationResult => {
  const trimmedValue = value.trim()

  // 1. Проверка базового формата (два числа через слэш)
  if (!/^\d+\/\d+$/.test(trimmedValue)) {
    return {
      isValid: false,
      error: 'Неправильный формат. Используйте формат 120/80',
    }
  }

  // 2. Разделение на части
  const [systolicStr, diastolicStr] = trimmedValue.split('/')
  const systolic = parseInt(systolicStr, 10)
  const diastolic = parseInt(diastolicStr, 10)

  // 3. Проверка валидности чисел
  if (isNaN(systolic) || isNaN(diastolic)) {
    return { isValid: false, error: 'Оба значения должны быть числами' }
  }

  // 4. Проверка диапазонов
  if (systolic < 90 || systolic > 200) {
    return {
      isValid: false,
      error: 'Систолическое давление должно быть в диапазоне 90-200',
    }
  }

  if (diastolic < 60 || diastolic > 120) {
    return {
      isValid: false,
      error: 'Диастолическое давление должно быть в диапазоне 60-120',
    }
  }

  // 5. Проверка соотношения значений
  if (diastolic > systolic) {
    return {
      isValid: false,
      error: 'Диастолическое давление не может быть выше систолического',
    }
  }

  return { isValid: true }
}
