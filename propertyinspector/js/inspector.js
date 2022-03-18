/**
 @file      main.js
 @brief     Print Deck Plugin
 @copyright (c) 2022, Johnny Mast
 @license   This source code is licensed under the MIT-style license found in the LICENSE file.
 */

let dialog = null

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

  window.addEventListener('message', (event) => {

    let data = JSON.parse(event.data)

    switch (data.type) {
      case 'key':
        alert('Save ' + data.apiKey)
        break
      case 'url':
        openUrl(WebSocket.uuid, data.url)
        break
    }

  }, false)

  restoreSettings(StreamDeck.actionInfo.payload.settings)
})

EventEmitter.on('sendToPropertyInspector', (evt) => {
  console.log('Did receive sendToPropertyInspector')
})

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
  greetDeveloper('INSPECTOR', inActionInfo)
  StreamDeck.identify(inPort, inPropertyInspectorUUID, inRegisterEvent, inInfo, inActionInfo)
  StreamDeck.connect()
}