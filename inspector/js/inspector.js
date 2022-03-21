/**
 @file      inspector.js
 @brief     Print Deck Plugin
 @copyright (c) 2022, Johnny Mast
 @license   This source code is licensed under the MIT-style license found in the LICENSE file.
 */

var instanceSettings = null

/**
 * This function is called by the Elgato plugin engine. This is the entry point to
 * our plugin.
 *
 * @param {string} inPort The port used to create the WebSocket.
 * @param {string} inPluginUUID The unique identifier for this plugin.
 * @param {string} inApplicationInfo A JSON object containing information about the application.
 * @param {string} inActionInfo  A JSON object containing information about the action.
 */
StreamDeck.onConnected(async () => {

  window.addEventListener('message', (event) => {

    let data = JSON.parse(event.data)

    switch (data.type) {
      case 'key':
        let hosts = Storage.get('hosts', [])
        hosts.push({
          host: data.host,
          key: data.apiKey
        })

        Storage.set('hosts', hosts);
        setGlobalSettings(Storage.values)

        let select = document.getElementById('apikey')
        if (select) {
          select.value = data.apiKey
        }
        break
      case 'url':
        openUrl(data.url)
        break
    }

  }, false)

  getGlobalSettings()

  /**
   * We need to have the settings global because once the
   * 'didReceiveGlobalSettings' event is handled the value of
   * StreamDeck.actionInfo.payload.settings will be overwritten.
   */
  instanceSettings = StreamDeck.actionInfo.payload.settings

  if (typeof  StreamDeck.actionInfo.action !== 'undefined') {
    switch(StreamDeck.actionInfo.action) {
      case 'com.johnnymast.printdeck.progress':
        loadInspectorPage('./progress.html')
        break;
      case 'com.johnnymast.printdeck.openportal':
        loadInspectorPage('./openportal.html')
        break;

    }
  }

  restoreSettings(instanceSettings)
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
 * @param {string} inPort The port used to create the WebSocket.
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