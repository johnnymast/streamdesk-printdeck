const restoreSettings = (settings) => {
  Object.keys(settings).forEach((key) => {
    let val = settings[key]
    let elm = document.getElementById(key)
    if (elm) {
      elm.value = val
    }
  })
}

const save = () => {
  let payload = {}
  let domElements = document.querySelectorAll('.inspector-value')

  domElements.forEach((elm) => {
    payload[elm.id] = elm.value
  })

  setSettings(payload)
  // sendToPlugin(StreamDeck.actionInfo.action, 'settings', payload)

  console.log('saved')
}