const restoreSettings = (settings) => {
  console.log('RESTORING', settings)
  Object.keys(settings).forEach((key) => {
    let val = settings[key]
    let elm = document.getElementById(key)
    if (elm) {
      elm.value = val
    } else {
      console.trace('no elm!!!', key)
    }
  })

  console.log('Settings restored')
}

const save = () => {
  let payload = {}
  let domElements = document.querySelectorAll('.inspector-value')

  domElements.forEach((elm) => {
    payload[elm.id] = elm.value
  })

  console.log('payload', payload)
  setSettings(payload)

  console.log('saved')
}

const populateHosts = () => {
  let select = document.getElementById('apikey')
  let hosts = Storage.get('hosts', [])

  if (select) {
    Object.values(select.children).forEach(child => child.remove())

    let option = document.createElement('option')
    option.innerText = 'Add new'
    option.value = ''

    select.appendChild(option)

    Object.values(hosts).forEach((host) => {
      let option = document.createElement('option')
      option.innerText = host.host
      option.value = host.key

      select.appendChild(option)
    })

    if (hosts.length > 0) {
      select.removeAttribute('disabled')
    } else {
      select.setAttribute('disabled', 'disabled')
    }

    console.log('Hosts populated')
  }
}

document.getElementById('apikey').addEventListener('change', (evt) => {
  if (evt.target.value == 'addnew') {
    //connectOctoPrint()
  }
})