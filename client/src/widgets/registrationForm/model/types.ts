export type InitialState = {
  form: RegistrationForm
  activeStep: 'test' | 'form' | 'payment'
  isAuthModalActive: boolean
}

export type RegistrationForm = {
  name: string
  password: string
  age: number
  activityField: string
  education: string
  workExperience: number
  position: string
  email: string
  keyQuestionField: string | null
  isChecked: boolean
}
