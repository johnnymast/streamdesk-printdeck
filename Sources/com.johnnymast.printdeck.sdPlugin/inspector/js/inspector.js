/**
 @file      inspector.js
 @brief     Print Deck Plugin
 @copyright (c) 2022, Johnny Mast
 @license   This source code is licensed under the MIT-style license found in the LICENSE file.
 */

var instanceSettings = null

StreamDeck.onConnected(() => {

  window.addEventListener('message', (event) => {

    let data = JSON.parse(event.data)

    if (data.source === 'connectToOctoPrint') {
      switch (data.type) {
        case 'key':
          let select = document.getElementById('apikey')
          let host = document.getElementById('host')

          if (select) {
            select.value = data.apiKey
          }

          if (host) {
            host.value = data.webhost
          }

          saveSettings()
          break
        case 'url':
          openUrl(data.url)
          break
      }
    }

  }, false)

  getGlobalSettings()

  /**
   * We need to have the settings global because once the
   * 'didReceiveGlobalSettings' event is handled the value of
   * StreamDeck.actionInfo.payload.settings will be overwritten.
   */
  instanceSettings = StreamDeck.actionInfo.payload.settings
  if (typeof StreamDeck.actionInfo.action !== 'undefined') {
    switch (StreamDeck.actionInfo.action) {
      case 'com.johnnymast.printdeck.octoprint.progress':
        loadInspectorPage('./octoprint_progress.html', StreamDeck.actionInfo.action)
        break
      case 'com.johnnymast.printdeck.octoprint.openaction':
        loadInspectorPage('./octoprint_openaction.html', StreamDeck.actionInfo.action)
        break
      case 'com.johnnymast.printdeck.octoprint.temperature':
        loadInspectorPage('./octoprint_set_temperature.html', StreamDeck.actionInfo.action)
        break
      case 'com.johnnymast.printdeck.octoprint.cooldown':
        loadInspectorPage('./octoprint_cooldown.html', StreamDeck.actionInfo.action)
        break
    }
  }

  restoreSettings(instanceSettings)
})

EventEmitter.on('sendToPropertyInspector', (evt) => {
  if (evt.payload.type) {
    switch (evt.payload.type) {
      case 'error':
        displayError(evt.payload.message)
        break
      case 'hide_error':
        hideError()
        break
    }
  }
})

EventEmitter.on('didReceiveGlobalSettings', (evt) => {
  if (!evt.payload.settings) {
    setGlobalSettings({
      hosts: []
    })
  }

  Storage.values = evt.payload.settings

  populateHosts()
  restoreSettings(instanceSettings)
})

/**
 * This function is called by the Elgato plugin engine. This is the entry point to
 * our plugin.
 *
 * @param {number} inPort The port used to create the WebSocket.
 * @param {string} inPropertyInspectorUUID The unique identifier for this plugin.
 * @param {string} inRegisterEvent A JSON object containing information about the application.
 * @param {string} inInfo  A JSON object containing information about the application.
 * @param {string} inActionInfo  A JSON object containing information about the action.
 */
function connectElgatoStreamDeckSocket (inPort, inPropertyInspectorUUID, inRegisterEvent, inInfo, inActionInfo) {
  greetDeveloper('INSPECTOR')
  StreamDeck.identify(inPort, inPropertyInspectorUUID, inRegisterEvent, inInfo, inActionInfo)
  StreamDeck.connect()
}