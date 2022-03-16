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
let context = canvas.getContext('2d')

function sendRegistrationEvent (event) {
  if (StreamDeck.socket) {
    let json = {
      'event': event,
      'uuid': StreamDeck.uuid
    }

    StreamDeck.socket.send(JSON.stringify(json))
  }
}

function getSettings () {
  if (StreamDeck.socket) {
    let json = {
      'event': 'getSettings',
      'uuid': StreamDeck.uuid
    }

    StreamDeck.socket.send(JSON.stringify(json))
    console.log('getSettings sent')
  }
}

function getGlobalSettings () {
  if (StreamDeck.socket) {
    let json = {
      'event': 'getGlobalSettings',
      'uuid': StreamDeck.uuid
    }

    StreamDeck.socket.send(JSON.stringify(json))
    console.log('getGlobalSettings sent')
  }
}

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

function sendToPlugin (action, prop, val) {

  if (StreamDeck.socket) {

    let json = {
      'action': action,
      'event': 'sendToPlugin',
      'context': StreamDeck.uuid,
      'payload': {
        [prop]: val
      }
    }

    StreamDeck.socket.send(JSON.stringify(json))
  }
}

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

function showAlert (context) {
  if (StreamDeck.socket) {
    let json = {
      'event': 'showAlert',
      'context': context,
    }
    StreamDeck.socket.send(JSON.stringify(json))
  }
}

function showOk (context) {
  if (StreamDeck.socket) {
    let json = {
      'event': 'showOk',
      'context': context,
    }
    StreamDeck.socket.send(JSON.stringify(json))
  }
}

// Fixme
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