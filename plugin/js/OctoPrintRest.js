class OctoPrintRest {

  constructor (webhost) {
    this.webhost = webhost
  }

  async getJob (apiKey) {
    return fetch(this.webhost + '/api/job', {
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': apiKey
      },
    })
  }

  /**
   * Set the bed temperature.
   *
   * @param {number} temp The temperature to set for the bed.
   * @param {string} apiKey The api key to use for this request.
   *
   * @returns {Promise<Response>}
   */
  async setBedTemperature (temp, apiKey) {
    let body = {
      "command": "target",
      "target": temp
    }
    return fetch(this.webhost + '/api/printer/bed', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': apiKey
      },
    })
  }

  /**
   * Set the bed temperature.
   *
   * @param {number} temp The temperature to set for the bed.
   * @param {string} apiKey The api key to use for this request.
   * @returns {Promise<Response>}
   */
  async setHotEndTemperature (temp, apiKey) {
    let body = {
      "command": "target",
      "targets": {
        "tool0": temp,
      }
    }
    return fetch(this.webhost + '/api/printer/tool', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': apiKey
      },
    })
  }
}
