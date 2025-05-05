declare global {
  // необходимо для получения типов из src/app/store в других слайсах
  type RootState = import('./appStore').RootState
  type AppDispatch = import('./appStore').AppDispatch
}

export {}
