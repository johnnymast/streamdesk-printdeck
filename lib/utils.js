/**
 @file      main.js
 @brief     Print Deck Plugin
 @copyright (c) 2022, Johnny Mast
 @license   This source code is licensed under the MIT-style license found in the LICENSE file.
 */

const PAYLOAD_TARGET = {
  'HARDWARE_AND_SOFTWARE': 0,
  'HARDWARE_ONLY': 1,
  'SOFTWARE_ONLY': 2,
}

let canvas = document.createElement('canvas')

// let context = canvas.getContext('2d')

/**
 * This function is used by the plugin and the inspector side to
 * register itself to Stream Deck.
 *
 * @param event
 */
function sendRegistrationEvent (event) {
  if (StreamDeck.socket) {
    let json = {
      'event': event,
      'uuid': StreamDeck.uuid
    }

    StreamDeck.socket.send(JSON.stringify(json))
  }
}

/**
 * Ask Stream Deck for the plugin settings.
 */
function getSettings () {
  if (StreamDeck.socket) {
    let json = {
      'event': 'getSettings',
      'uuid': StreamDeck.uuid
    }

    StreamDeck.socket.send(JSON.stringify(json))
  }
}

/**
 * Push the settings to the Stream Deck Software.
 *
 * @param {object} payload The settings to set.
 */
function setSettings (payload) {
  if (StreamDeck.socket) {
    let json = {
      'event': 'setSettings',
      'context': StreamDeck.uuid,
      'payload': payload
    }
    StreamDeck.socket.send(JSON.stringify(json))
    console.log('setSettings sent')
  }
}

/**
 * Push the global settings to the Stream Deck Software.
 *
 * @param {object} payload The global settings to set.
 */
function setGlobalSettings (settings) {
  if (StreamDeck.socket) {
    let json = {
      'event': 'setGlobalSettings',
      'context': StreamDeck.uuid,
      'payload': payload
    }
    StreamDeck.socket.send(JSON.stringify(json))
    console.log('setSettings sent')
  }
}

/**
 * Ask the Stream Deck software for the global settings.
 */
function getGlobalSettings () {
  if (StreamDeck.socket) {
    let json = {
      'event': 'getGlobalSettings',
      'uuid': StreamDeck.uuid,
    }

    StreamDeck.socket.send(JSON.stringify(json))
    console.log('getGlobalSettings sent')
  }
}

/**
 * Send a message to the plugin.
 *
 * @param {string} action The action this message is for.
 * @param {string} key The key of the value to send.
 * @param {string} val The value to send to the plugin.
 */
function sendToPlugin (action, key, val) {

  if (StreamDeck.socket) {

    let json = {
      'action': action,
      'event': 'sendToPlugin',
      'context': StreamDeck.uuid,
      'payload': {
        [key]: val
      }
    }

    StreamDeck.socket.send(JSON.stringify(json))
  }
}

/**
 * Send a message from the plugin to the inspector form.
 *
 * @param {string} action The action this message is for.
 * @param {string} key The key for the value to send.
 * @param {(} val The value to send.
 */
function sendToPropertyInspector (action, key, val) {
  if (StreamDeck.socket) {

    let json = {
      'action': action,
      'event': 'sendToPropertyInspector',
      'context': StreamDeck.uuid,
      'payload': {
        [key]: val
      }
    }

    console.log('sendToPropertyInspector sending to inspector', json)
    StreamDeck.socket.send(JSON.stringify(json))
  }
}

/**
 * Thell the Stream Deck software to log a message.
 *
 * @param {string} message The message to log.
 */
function logMessage (message) {
  if (StreamDeck.socket) {
    let json = {
      'event': 'logMessage',
      'payload': {
        'message': message,
      }
    }
    StreamDeck.socket.send(JSON.stringify(json))
  }
}

/**
 * Tell the Stream Deck software to open an url in the
 * standard browser.
 *
 * @param {string} context The context of the action.
 * @param {string} url The url to open.
 */
function openUrl (context, url) {
  if (StreamDeck.socket) {
    let json = {
      'event': 'openUrl',
      'context': context,
      'payload': {
        'url': url,
      }
    }
    StreamDeck.socket.send(JSON.stringify(json))
  }
}

/**
 * Set the title on the Stream Deck tile.
 *
 * @param {string} context The context of the action.
 * @param {string} title  The title to set.
 * @param {int} state The state of the button.
 */
function setTitle (context, title, state) {
  if (StreamDeck.socket) {
    let json = {
      'event': 'setTitle',
      'context': context,
      'payload': {
        'title': title,
        'target': PAYLOAD_TARGET.HARDWARE_AND_SOFTWARE,
        'state': state
      }
    }
    StreamDeck.socket.send(JSON.stringify(json))
  }
}

/**
 * Set the image for the current Stream Deck tile.
 *
 * @param {string} context The context of the action.
 * @param {string} data The base64 source of the image.
 */
async function setImage (context, data) {
  let json = {
    'event': 'setImage',
    'context': context,
    'payload': {
      'image': data,
      'target': PAYLOAD_TARGET.HARDWARE_AND_SOFTWARE
    }
  }

  StreamDeck.socket.send(JSON.stringify(json))
}

/**
 * Show an alert symbol on the Stream Deck tile.
 *
 * @param {string} context The context for this action.
 */
function showAlert (context) {
  if (StreamDeck.socket) {
    let json = {
      'event': 'showAlert',
      'context': context,
    }
    StreamDeck.socket.send(JSON.stringify(json))
  }
}

/**
 * Show the ok symbol on the Stream Deck tile.
 *
 * @param {string} context The context for this action.
 */
function showOk (context) {
  if (StreamDeck.socket) {
    let json = {
      'event': 'showOk',
      'context': context,
    }
    StreamDeck.socket.send(JSON.stringify(json))
  }
}

// Fixme this does not work yet
function switchToProfile (context, device, profile) {
  if (StreamDeck.socket) {
    let json = {
      'event': 'switchToProfile',
      'context': context,
      'device': device,
      'payload': {
        'profile': profile
      }
    }
    StreamDeck.socket.send(JSON.stringify(json))
  }
}