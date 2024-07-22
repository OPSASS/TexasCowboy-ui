export const LocalStorageEventTarget = new EventTarget()

export const clearLS = () => {
  localStorage.removeItem('rff636edtg7rf1')
  localStorage.removeItem('accdfw2qyb13a4')
  localStorage.removeItem('profile')
  const clearLSEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}
