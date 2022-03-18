class OctoPrintRest {
  static webhost

  static async probe () {
    return fetch(OctoPrintRest.webhost + '/plugin/appkeys/probe')
  }

  static async requestForUser (app, user) {
    return fetch(OctoPrintRest.webhost + '/plugin/appkeys/request',
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ app, user })
      })
  }

  static async checkDecision (token) {
    return fetch(OctoPrintRest.webhost + '/plugin/appkeys/request/' + token)
  }

  static async generateKey (app, token) {
    return fetch(OctoPrintRest.webhost + '/api/plugin/appkeys', {
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': token
      },
      //mode: 'no-cors',
      method: 'POST',
      body: JSON.stringify({
        'command': 'generate',
        'app': app,
      })
    })
  }

  static async appKeys (apiKey) {
    return fetch(OctoPrintRest.webhost + '/api/plugin/appkeys', {
      headers: {
        'X-Api-Key': apiKey
      }
    })
  }
}