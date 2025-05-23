export type InitialState = {
  form: RegistrationForm
  isAllReadyFilled: boolean
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
