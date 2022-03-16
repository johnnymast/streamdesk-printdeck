/**
 @file      stream-deck.js
 @brief     Print Deck Plugin
 @copyright (c) 2022, Johnny Mast
 @license   This source code is licensed under the MIT-style license found in the LICENSE file.
 */

class StreamDeck {

  static socket = null
  static uuid = ''
  static port = 80
  static registerEvent = ''
  static appInfo = null
  static actionInfo = null
  static actions = []

  static addAction (action) {
    StreamDeck.actions[action.actionUUID] = action
    return self
  }

  /**
   * Store information the Steam Deck software provides us with
   * our plugin.
   *
   * @param {string} port The port used to create the WebSocket.
   * @param {string} uuid A unique identifier string to register with the Stream Deck software
   * @param {string} registerEvent A JSON object containing information about the application.
   * @param {string} info  A stringified JSON containing Stream Deck and device information.
   * @param {string} actionInfo  A JSON object containing information about the action (inspector only).
   */
  static identify (port, uuid, registerEvent, info, actionInfo) {
    this.port = port
    this.uuid = uuid
    this.registerEvent = registerEvent
    this.appInfo = JSON.parse(info)
    this.actionInfo = JSON.parse(actionInfo)
  }

  static connect () {

    if (StreamDeck.socket !== null) {
      console.log('Closing existing connection')
      StreamDeck.socket.close()
    }

    console.log('Connecting to port ' + StreamDeck.port)
    console.log(`UUID: ${this.uuid}`)

    StreamDeck.socket = new WebSocket('ws://127.0.0.1:' + StreamDeck.port)

    StreamDeck.socket.onopen = (evt) => {
      console.log('[STREAMDECK]***** WEBSOCKET OPENED ****', evt)

      sendRegistrationEvent(StreamDeck.registerEvent)

      EventEmitter.emit('streamdeck.websocket.connected', evt)
    }

    StreamDeck.socket.onerror = (evt) => {
      console.warn('WEBSOCKET ERROR', evt, evt.data)
      EventEmitter.emit('streamdeck.websocket.error', evt)
    }

    StreamDeck.socket.onclose = (evt) => {
      console.log('[STREAMDECK]***** WEBSOCKET CLOSED **** reason:', evt)
      EventEmitter.emit('streamdeck.websocket.close', evt)
    }

    StreamDeck.socket.onmessage = (evt) => {

      let jsonOBJ = JSON.parse(evt.data)
      var event = jsonOBJ['event']
      var action = this.actions[jsonOBJ.action]

      this.actionInfo = jsonOBJ
      //this.actions = jsonOBJ

      if (event !== 'applicationDidLaunch') {
        //       console.log('actionInfo', this.actionInfo)
      }

      EventEmitter.emit(event, jsonOBJ)

      if (action) {
        action.setContext(jsonOBJ.context)
        console.log(jsonOBJ.context)
        switch (event) {
          case 'keyDown':
            action.onKeyDown(this.actionInfo)
            break

          case 'keyUp':
            action.onKeyUp(this.actionInfo)
            break
          default:
            console.warn('[NOT IMPLEMENTED] event: ', event)
            break
        }
      }
    }
  }

  static on(event, fn) {
    if (typeof fn === 'function') {
      EventEmitter.on(event, fn)
    }
  }

  static onConnected (fn) {
    if (typeof fn === 'function') {
      EventEmitter.on('streamdeck.websocket.connected', fn)
    }
  }

  static onClose (fn) {
    if (typeof fn === 'function') {
      EventEmitter.on('streamdeck.websocket.close', fn)
    }
  }

  static onError (fn) {
    if (typeof fn === 'function') {
      EventEmitter.on('streamdeck.websocket.error', fn)
    }
  }
}