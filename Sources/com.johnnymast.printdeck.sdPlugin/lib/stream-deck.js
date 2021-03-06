/**
 @file      stream-deck.js
 @brief     Print Deck Plugin
 @copyright (c) 2022, Johnny Mast
 @license   This source code is licensed under the MIT-style license found in the LICENSE file.
 */

class StreamDeck {

  /**
   * The websocket socket.
   *
   * @type {Object}
   */
  static socket = null

  /**
   * The UUID for the plugin or the inspector.
   *
   * @type {string}
   */
  static uuid = ''

  /**
   * The port number to connect to.
   *
   * @default 80
   * @type {number}
   */
  static port = 80

  /**
   * The register event to send and authorize
   * the plugin or inspector with the websockets
   * Stream Deck uses.
   *
   * @type {string}
   */
  static registerEvent = ''

  /**
   * Information about the Steam Deck application
   * provided by the Stream Deck Application.
   *
   * @type {Object}
   */
  static appInfo = {}

  /**
   * Information about the current action the Steam Deck application
   * is contacting you about. This information is sent by the Stream Deck
   * application.
   *
   * @type {Object}
   */
  static actionInfo = {}

  /**
   * A container for the registered actions.
   *
   * @type {Array}
   */
  static actions = []

  /**
   * A flag to see if there is an open websocket
   * connection with the Stream Deck application.
   *
   * @type {boolean}
   */
  static isOpen = false

  /**
   * Register a new Action.
   *
   * @param {string} context The context string.
   * @param {Object} action The instance of an action to register.
   *
   * @returns {(WorkerGlobalScope & Window) | Window}
   */
  static registerAction (context, action) {
    StreamDeck.actions[context] = action
    return StreamDeck
  }

  /**
   * Store information the Steam Deck software provides us with
   * our plugin.
   *
   * @param {number} port The port used to create the WebSocket.
   * @param {string} uuid A unique identifier string to register with the Stream Deck software
   * @param {string} registerEvent A JSON object containing information about the application.
   * @param {string} info  A JSON string containing Stream Deck and device information.
   * @param {string} actionInfo  A JSON object containing information about the action (inspector only).
   */
  static identify (port, uuid, registerEvent, info, actionInfo) {
    this.port = port
    this.uuid = uuid
    this.registerEvent = registerEvent
    this.appInfo = JSON.parse(info)
    this.actionInfo = JSON.parse(actionInfo)

    if (typeof StreamDeck.appInfo.application.language !== 'undefined') {
      const locale = StreamDeck.appInfo.application.language
      Localization.load(locale)
    }
  }

  /**
   * Connect to the stream deck via a websocket.
   */
  static connect () {

    if (StreamDeck.socket !== null) {
      StreamDeck.debug('Closing existing connection')
      StreamDeck.socket.close()
    }

    StreamDeck.debug('Connecting to port ' + StreamDeck.port)
    StreamDeck.debug(`UUID: ${this.uuid}`)

    StreamDeck.socket = new WebSocket(`ws://127.0.0.1:${StreamDeck.port}`)

    StreamDeck.socket.onopen = (evt) => {
      StreamDeck.isOpen = true

      console.log('[STREAMDECK] ***** WEBSOCKET OPENED ****')
      sendRegistrationEvent(StreamDeck.registerEvent)

      EventEmitter.emit('streamdeck.websocket.connected', evt)
    }

    StreamDeck.socket.onerror = (evt) => {
      StreamDeck.isOpen = false
      console.warn('WEBSOCKET ERROR', evt, evt.data)
      EventEmitter.emit('streamdeck.websocket.error', evt)
    }

    StreamDeck.socket.onclose = (evt) => {
      StreamDeck.isOpen = false

      console.log('[STREAMDECK]***** WEBSOCKET CLOSED **** reason:', evt)
      EventEmitter.emit('streamdeck.websocket.close', evt)
    }

    StreamDeck.socket.onmessage = (evt) => {

      let jsonOBJ = JSON.parse(evt.data)
      const event = jsonOBJ['event']
      const action = this.actions[jsonOBJ.context]
      this.actionInfo = jsonOBJ

      EventEmitter.emit(event, jsonOBJ)

      if (action) {
        switch (event) {
          case 'keyDown':
            action.onKeyDown(evt)
            break
          case 'keyUp':
            action.onKeyUp(evt)
            break
        }
      }
    }
  }

  /**
   * Print a debug message in the console.
   *
   * @param {string} msg The message to print.
   */
  static debug (msg) {
    console.log(`[DEBUG] ${msg}`)

    if (StreamDeck.isOpen === true) {
      logMessage(`[DEBUG] ${msg}`)
    }
  }

  /**
   * Register an event listener.
   *
   * @param {string} event The event to listen for.
   * @param {function} fn The callback for when the event is triggered.
   */
  static on (event, fn) {
    if (typeof fn === 'function') {
      EventEmitter.on(event, fn)
    }
  }

  /**
   * open callback.
   *
   * @param {function} fn The callback for when the websocket opens a connection.
   */
  static onConnected (fn) {
    if (typeof fn === 'function') {
      EventEmitter.on('streamdeck.websocket.connected', fn)
    }
  }

  /**
   * close callback.
   *
   * @param {function} fn The callback for when the websocket closes.
   */
  static onClose (fn) {
    if (typeof fn === 'function') {
      EventEmitter.on('streamdeck.websocket.close', fn)
    }
  }

  /**
   * error callback.
   *
   * @param {function} fn The callback for when the websocket catches an error.
   */
  static onError (fn) {
    if (typeof fn === 'function') {
      EventEmitter.on('streamdeck.websocket.error', fn)
    }
  }
}