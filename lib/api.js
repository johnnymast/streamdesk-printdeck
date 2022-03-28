/**
 @file      api.js
 @brief     Print Deck Plugin
 @copyright (c) 2022, Johnny Mast
 @license   This source code is licensed under the MIT-style license found in the LICENSE file.
 */

/**
 * Where do we want to display the content?
 *
 * @type {{HARDWARE_ONLY: number, HARDWARE_AND_SOFTWARE: number, SOFTWARE_ONLY: number}}
 */
const TARGET = {
  'HARDWARE_AND_SOFTWARE': 0,
  'HARDWARE_ONLY': 1,
  'SOFTWARE_ONLY': 2
}

/**
 * Send the registration event to register the inspector
 * or plugin.
 *
 * @param {string} event The event to send.
 */
const sendRegistrationEvent = (event) => {
  if (StreamDeck.socket) {
    let json = {
      'event': event,
      'uuid': StreamDeck.uuid
    }

    StreamDeck.socket.send(JSON.stringify(json))
  }
}

/**
 * Store the settings on Stream Deck.
 *
 * @param {Object} settings The settings to store.
 */
const setSettings = (settings) => {
  if (StreamDeck.socket) {
    let json = {
      'event': 'setSettings',
      'context': StreamDeck.uuid,
      'payload': settings
    }

    StreamDeck.socket.send(JSON.stringify(json))
  }
}

/**
 * Ask Stream Deck for the settings.
 */
const getSettings = () => {
  if (StreamDeck.socket) {
    let json = {
      'event': 'getSettings',
      'context': StreamDeck.uuid,
    }

    StreamDeck.socket.send(JSON.stringify(json))
  }
}

/**
 * Tell Stream Deck to save these settings for all actions.
 *
 * @param {Object} settings The settings to save.
 */
const setGlobalSettings = (settings) => {
  if (StreamDeck.socket) {
    let json = {
      'event': 'setGlobalSettings',
      'context': StreamDeck.uuid,
      'payload': settings
    }

    StreamDeck.socket.send(JSON.stringify(json))
  }
}

/**
 * Ask Stream Deck for the global settings.
 */
const getGlobalSettings = () => {
  if (StreamDeck.socket) {
    let json = {
      'event': 'getGlobalSettings',
      'context': StreamDeck.uuid
    }

    StreamDeck.socket.send(JSON.stringify(json))
  }
}

/**
 * Tell Stream Deck to open an url.
 *
 * @param {string} url The url to open.
 */
const openUrl = (url) => {
  if (StreamDeck.socket) {
    let json = {
      'event': 'openUrl',
      'payload': {
        'url': url
      }
    }

    StreamDeck.socket.send(JSON.stringify(json))
  }
}

/**
 * Show the Alert symbol on the button.
 *
 * @param {string} context The context that wants to show an alert.
 */
const showAlert = (context) => {
  if (StreamDeck.socket) {
    let json = {
      'event': 'showAlert',
      'context': context
    }

    StreamDeck.socket.send(JSON.stringify(json))
  }
}

/**
 * Show the OK symbol on the button.
 *
 * @param {string} context The context that wants to show an alert.
 */
const showOk = (context) => {
  if (StreamDeck.socket) {
    let json = {
      'event': 'showOk',
      'context': context
    }

    StreamDeck.socket.send(JSON.stringify(json))
  }
}

/**
 * Tell Stream Deck to set an image on the button for a given state.
 *
 * @param {string} context The context that is sending this action.
 * @param {string} title The new title.
 * @param {number} state The button stage (0 for down 1 for up).
 */
const setTitle = (context, title, state = -1) => {
  if (StreamDeck.socket) {
    let json = {
      'event': 'setTitle',
      'context': context,
      'payload': {
        'title': title,
        'target': TARGET.HARDWARE_AND_SOFTWARE,
      }
    }

    if (state) {
      json.payload.state = state
    }

    StreamDeck.socket.send(JSON.stringify(json))
  }
}

/**
 * Send a message to the Stream Deck log file(s).
 *
 * @param {string} message The message to log.
 */
const logMessage = (message) => {
  if (StreamDeck.socket) {
    let json = {
      'event': 'logMessage',
      'payload': {
        'message': message
      }
    }

    StreamDeck.socket.send(JSON.stringify(json))
  }
}

/**
 * Send a message from the plugin to the inspector window.
 *
 * @param {string} action The action name.
 * @param {string} context The unique context for the action.
 * @param {object} payload The payload to send.
 */
const sendToPropertyInspector = (action, context, payload) => {
  if (StreamDeck.socket) {
    let json = {
      'action': action,
      'event': 'sendToPropertyInspector',
      'context': context,
      'payload': payload
    }

    StreamDeck.socket.send(JSON.stringify(json))
  }
}