export { generateId } from './generateId'

/**
 * Возвращает форму слова по правилу русского языка.
 *
 * @param n — число
 * @param forms — массив из трёх форм: ['яблоко', 'яблока', 'яблок']
 */
export function pluralRu(forms: [string, string, string], count: number): string {
  const [one, few, many] = forms
  const mod10 = count % 10
  const mod100 = count % 100

  if (mod10 === 1 && mod100 !== 11) {
    return one
  }
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return few
  }
  return many
}
