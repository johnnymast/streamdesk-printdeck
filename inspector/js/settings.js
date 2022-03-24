/**
 @file      settings.js
 @brief     Print Deck Plugin
 @copyright (c) 2022, Johnny Mast
 @license   This source code is licensed under the MIT-style license found in the LICENSE file.
 */

/**
 * Restore the settings and set the form values in inspector/index.html.
 *
 * @param {Object} settings An object containing values to restore.
 */
const restoreSettings = (settings) => {

  console.log('restoreSettings', settings)
  Object.keys(settings).forEach((key) => {
    let val = settings[key]
    let elm = document.getElementById(key)
    if (elm) {
      elm.value = val
    }
  })
}

/**
 * Save the inspector values (from the form) and send the values
 * to Stream Deck.
 */
const saveProgress = () => {
  let payload = {}
  let domElements = document.querySelectorAll('.inspector-value')

  domElements.forEach((elm) => {
    payload[elm.id] = elm.value
  })

  displayMessage('Changes are saved');
  setSettings(payload)
}

const resetSettings = () => {
  setSettings(null)
  setGlobalSettings(null)
}

/**
 * Populate the instances' dropdown with values previously stored
 * in globalSettings.
 */
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
  }
}

/**
 * Load an inspector form.
 *
 * @param {string} url The url to load.
 */
const loadInspectorPage = (url) => {
  const xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      let container = document.getElementById('inspector_page_content')
      if (container) {
        container.innerHTML = this.responseText
      }
    }
  }
  xhttp.open('GET', url, true)
  xhttp.send()
}