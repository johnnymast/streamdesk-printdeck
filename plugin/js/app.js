/**
 @file      app.js
 @brief     Print Deck Plugin
 @copyright (c) 2022, Johnny Mast
 @license   This source code is licensed under the MIT-style license found in the LICENSE file.
 */

StreamDeck.onConnected(() => {
  getGlobalSettings()
  getSettings()

  StreamDeck.registerAction(new ProgressAction)
  StreamDeck.registerAction(new OpenOctoPrintAction)
})

EventEmitter.on('willAppear', (evt) => {
  if (typeof StreamDeck.actionInfo.payload !== 'undefined') {
    Storage.values = StreamDeck.actionInfo.payload.settings
  }
})

EventEmitter.on('didReceiveGlobalSettings', (evt) => {
  if (evt.payload.settings.hosts) {
    Storage.set('hosts', evt.payload.settings.hosts)
  }
})

/**
 * This function is called by the Elgato plugin engine. This is the entry point to
 * our plugin.
 *
 * @param {string} inPort The port used to create the WebSocket.
 * @param {string} inPluginUUID The unique identifier for this plugin.
 * @param {string} inRegisterEvent a string containing the register event to send to Stream Deck.
 * @param {string} inInfo  A JSON object containing information about the action.
 */
function connectElgatoStreamDeckSocket (inPort, inPluginUUID, inRegisterEvent, inInfo) {
  greetDeveloper('PLUGIN')
  StreamDeck.identify(inPort, inPluginUUID, inRegisterEvent, inInfo, '{}')
  StreamDeck.connect()
}