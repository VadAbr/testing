import { AnalysisCategory, AnalysisStep } from '../constants'
import type { ProblemType, QuestionItem, StepKey, TestResult } from '../model'

export const calculateTest = (questions: QuestionItem[]) => {
  const categoriesScore: Partial<Record<ProblemType, number>> = {}
  // Рассчёт баллов по категориям
  for (const question of questions) {
    const problemType = question.problemType
    if (!problemType) continue

    const weight = getWeight(question)
    categoriesScore[problemType] = (categoriesScore[problemType] || 0) + weight
  }

  const results: Partial<TestResult> = {}
  // Рассчёт баллов по шагам
  for (const categoryKey in categoriesScore) {
    const problemType = categoryKey as ProblemType
    const categoryInfo = AnalysisCategory[problemType]

    const stepKey = categoryInfo.stepKey

    if (!results[stepKey]) {
      results[stepKey] = {
        totalScore: 0,
        categories: [],
        isValid: false,
      }
    }

    const categoryScore = categoriesScore[problemType] || 0
    results[stepKey].totalScore += categoryScore
    results[stepKey].categories.push({
      totalScore: categoryScore,
      category: problemType,
      isValid: categoryScore >= categoryInfo.minNormalWeight,
    })
  }

  // Проверка валидности шагов
  for (const stepKey in results) {
    const key = stepKey as StepKey
    const stepInfo = AnalysisStep[key]

    if (!results[key]) continue

    results[key].isValid = results[key].totalScore >= stepInfo.minNormalWeight
  }

  return results as TestResult
}

const getWeight = (question: QuestionItem): number => {
  if (question.type === 'select' || question.type === 'choice') {
    return question.value?.weight ?? question.weight ?? 0
  }

  return question.weight ?? 0
}
