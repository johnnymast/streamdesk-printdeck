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
const saveSettings = (silent = false) => {
  let payload = {}
  let domElements = document.querySelectorAll('.inspector-value')

  domElements.forEach((elm) => {
    payload[elm.id] = elm.value
  })

  if (silent === false) {
    displayMessage('Changes are saved')
  }
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
 * @param {string} action The action the panel belongs to.
 */
const loadInspectorPage = (url, action) => {
  const xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      let container = document.getElementById('inspector_page_content')
      if (container) {
        container.innerHTML = this.responseText
        Localization.localizeInspector(action)
        injectStreamDeckTitleStyle()
      }
    }
  }
  xhttp.open('GET', url, true)
  xhttp.send()
}

/**
 * Elgato has some information about the colors
 * of the buttons that overwrite the default style.
 * I suggest this is because of the different colors of stream
 * deck modules they sell. This function injects the custom styles
 * into the inspector window.
 */
const injectStreamDeckTitleStyle = () => {
  if (typeof StreamDeck.appInfo.colors !== 'undefined') {
    let colors = StreamDeck.appInfo.colors
    let styleElm = document.querySelector('style[id="inline_style"]')

    let style = `
      ::selection {
         color: ${colors.highlightColor};
      }

      button:hover {
        background-color: ${colors.buttonMouseOverBackgroundColor};
      }

      button:active {
        background-color: ${colors.buttonPressedBackgroundColor};
        border-color: ${colors.buttonPressedBorderColor};
        color: ${colors.buttonPressedTextColor};
      }`

    styleElm.innerHTML = style
  }
}