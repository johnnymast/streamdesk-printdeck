/**
 @file      main.js
 @brief     Print Deck Plugin
 @copyright (c) 2022, Johnny Mast
 @license   This source code is licensed under the MIT-style license found in the LICENSE file.
 */

/**
 * This function is called by the Elgato plugin engine. This is the entry point to
 * our plugin.
 *
 * @param {string} inPort The port used to create the WebSocket.
 * @param {string} inPluginUUID The unique identifier for this plugin.
 * @param {string} inApplicationInfo A JSON object containing information about the application.
 * @param {string} inActionInfo  A JSON object containing information about the action.
 */
StreamDeck.onConnected(() => {

  console.log('inspector websocket connected')
 // getSettings()

  restoreSettings(StreamDeck.actionInfo.payload.settings)

})

EventEmitter.on('sendToPropertyInspector', (evt) => {
  console.log('Did receive sendToPropertyInspector')
});

const restoreSettings = (settings) => {
  Object.keys(settings).forEach((key) => {
    let val = settings[key]
    let elm = document.getElementById(key);
    if (elm) {
      elm.value = val
    }
  });
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

/**
 * This function is called by the Elgato plugin engine. This is the entry point to
 * our plugin.
 *
 * @param {string} inPort The port used to create the WebSocket.
 * @param {string} inPropertyInspectorUUID The unique identifier for this plugin.
 * @param {string} inRegisterEvent A JSON object containing information about the application.
 * @param {string} inInfo  A JSON object containing information about the application.
 * @param {string} inActionInfo  A JSON object containing information about the action.
 */
//
function connectElgatoStreamDeckSocket (inPort, inPropertyInspectorUUID, inRegisterEvent, inInfo, inActionInfo) {
  console.log('INSPECTOR', inActionInfo)
  StreamDeck.identify(inPort, inPropertyInspectorUUID, inRegisterEvent, inInfo, inActionInfo)
  StreamDeck.connect()
}
