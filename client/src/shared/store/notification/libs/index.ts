export const getServerErrorMessage = (payload: unknown) => {
  if (typeof payload !== 'object' || !payload) {
    return ''
  }

  if ('message' in payload && typeof payload.message === 'string') {
    return payload.message
  }

  return ''
}
