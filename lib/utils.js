const TARGET = { 'HARDWARE_AND_SOFTWARE': 0, 'HARDWARE_ONLY': 1, 'SOFTWARE_ONLY': 2 }

const sendRegistrationEvent = (event) => {
  if (StreamDeck.socket) {
    let json = {
      'event': event,
      'uuid': StreamDeck.uuid
    }

    console.log('Sending', json)
    StreamDeck.socket.send(JSON.stringify(json))
  }
}

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

const getSettings = (settings) => {
  if (StreamDeck.socket) {
    let json = {
      'event': 'getSettings',
      'context': StreamDeck.uuid,
    }

    StreamDeck.socket.send(JSON.stringify(json))
  }
}

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

const getGlobalSettings = () => {
  if (StreamDeck.socket) {
    let json = {
      'event': 'getGlobalSettings',
      'context': StreamDeck.uuid
    }

    StreamDeck.socket.send(JSON.stringify(json))
  }
}

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

const showAlert = () => {
  if (StreamDeck.socket) {
    let json = {
      'event': 'showAlert',
      'context': StreamDeck.actionInfo.context || StreamDeck.uuid
    }

    StreamDeck.socket.send(JSON.stringify(json))
  }
}

const showOk = () => {
  if (StreamDeck.socket) {
    let json = {
      'event': 'showOk',
      'context': StreamDeck.actionInfo.context || StreamDeck.uuid
    }

    StreamDeck.socket.send(JSON.stringify(json))
  }
}

const setTitle = (context, title, state) => {
  if (StreamDeck.socket) {
    let json = {
      'event': 'setTitle',
      'context': StreamDeck.actionInfo.context,
      'payload': {
        'title': title,
        'target': TARGET.HARDWARE_AND_SOFTWARE,
        'state': state,
      }
    }
    StreamDeck.socket.send(JSON.stringify(json))
  }
}

const setImage = (data, state) => {
  if (StreamDeck.socket) {
    let json = {
      'event': 'setImage',
      'context': StreamDeck.actionInfo.context,
      'payload': {
        'image': data,
        'target': TARGET.HARDWARE_AND_SOFTWARE,
        'state': state,
      }
    }

    StreamDeck.socket.send(JSON.stringify(json))
  }
}

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

const switchToProfile = (profile) => {
  if (StreamDeck.socket) {
    let json = {
      'event': 'switchToProfile',
      'context': StreamDeck.uuid,
      'device': StreamDeck.actionInfo.device,
      'payload': {
        'profile': profile,
      }
    }

    console.log('sending', json)
    StreamDeck.socket.send(JSON.stringify(json))
  }

}