/**
 @file      action.js
 @brief     Print Deck Plugin
 @copyright (c) 2022, Johnny Mast
 @license   This source code is licensed under the MIT-style license found in the LICENSE file.
 */

class Action {

  /**
   * @classdesc
   * Base class for all actions.
   *
   * @class Action
   * @constructor
   * @since 1.0.0
   *
   * @param {Object} options The options for the Action.
   */
  constructor (options) {
    this.uuid = options.uuid || ''
    this.port = options.port || -1
    this.websocket = options.websocket

    this.target = Object.freeze({ 'HARDWARE_AND_SOFTWARE': 0, 'HARDWARE_ONLY': 1, 'SOFTWARE_ONLY': 2 })

    this._createSocket()
  }

  /**
   * Create a new websocket connection to the stream deck.
   *
   * @param {Object} evt The event object.
   * @private
   */
  _createSocket () {
    this.websocket.addEventListener('open', this._onOpen.bind(this))
    this.websocket.addEventListener('close', this._onClose.bind(this))
    this.websocket.addEventListener('error', this._onError.bind(this))
    this.websocket.addEventListener('message', this._onMessage.bind(this))
  }

  /**
   * Callback for when a Websocket connection opened.
   *
   * @param {Object} evt The event object.
   * @private
   */
  _onOpen (evt) {
    console.log('[STREAMDECK]***** WEBOCKET OPENED ****', evt)

    var json = {
      'event': 'registerPlugin',
      'uuid': this.uuid
    }

    this.send(JSON.stringify(json))
  }

  /**
   * Callback for when a Websocket connection opened.
   *
   * @param {Object} evt The event object.
   * @private
   */
  _onClose (evt) {
    console.log('[STREAMDECK]***** WEBOCKET CLOSED **** reason:', evt)
  }

  /**
   * Callback for when a Websocket receives an error.
   *
   * @param {Object} evt The event object.
   * @private
   */
  _onError (evt) {
    console.warn('WEBOCKET ERROR', evt, evt.data)
  }

  /**
   * Callback for when a Websocket receives an message.
   *
   * @param {Object} evt The event object.
   * @private
   */
  _onMessage (evt) {

    var jsonObj = JSON.parse(evt.data)
    var event = jsonObj['event']

    switch (event) {
      case 'keyDown':
        this.onKeyDown(jsonObj)
        break

      case 'keyUp':
        this.onKeyUp(jsonObj)
        break

      default:
        console.warn('[NOT IMPLEMENTED] event: ', event)
        break
    }
  }

  /**
   * Callback for when a Websocket receives an message.
   *
   * @param {Object} evt The event object.
   * @public
   */
  setImage (context, imgData) {

    let json = {
      'event': 'setImage',
      'context': context,
      'payload': {
        'image': imgData,
        'target': this.target.HARDWARE_AND_SOFTWARE
      }
    }

    this.send(JSON.stringify(json))
  };

  /**
   * Send data over the websocket to the stream deck.
   *
   * @param {string} json The json string to send to the stream deck app.
   * @public
   */
  send (json) {
    this.websocket.send(json)
  }

  /**
   * Callback for actions to overwrite, so they get notified when
   * the button (key) is down.
   *
   * @param {Object} evt The event object.
   * @public
   */
  onKeyDown (event) {
    // This will be overwritten
  }

  /**
   * Callback for actions to overwrite, so they get notified when
   * the button (key) is up.
   *
   * @param {Object} evt The event object.
   * @public
   */
  onKeyUp (event) {
    // This will be overwritten
  }
}