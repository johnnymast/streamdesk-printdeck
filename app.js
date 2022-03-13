/**
 @file      app.js
 @brief     Print Deck Plugin
 @copyright (c) 2022, Johnny Mast
 @license   This source code is licensed under the MIT-style license found in the LICENSE file.
 */

var cache = []
var websocket = null

/**
 * This function is called by the Elgato plugin engine. This is the entry point to
 * our plugin.
 *
 * @param {string} inPort The port used to create the WebSocket.
 * @param {string} inPluginUUID The unique identifier for this plugin.
 * @param {string} inApplicationInfo A JSON object containing information about the application.
 * @param {string} inActionInfo  A JSON object containing information about the action.
 */
function connectElgatoStreamDeckSocket (inPort, inPluginUUID, inApplicationInfo, inActionInfo) {

  if (websocket) {
    websocket.close()
  }

  websocket = new WebSocket('ws://127.0.0.1:' + inPort)

  let options = {
    'websocket': websocket,
    'uuid': inPluginUUID,
    'info': inApplicationInfo,
    'port': inPort,
  }

  cache[inPluginUUID] = new ProgressAction(options)

}