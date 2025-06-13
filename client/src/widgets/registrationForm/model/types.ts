export type InitialState = {
  form: RegistrationForm
  activeStep: 'test' | 'form' | 'payment'
}

export type RegistrationForm = {
  name: string
  age: string
  activityField: string
  education: string
  workExperience: string
  position: string
  email: string
  keyQuestionField: string | null
  isChecked: boolean
}
