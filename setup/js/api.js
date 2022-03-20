/**
 @file      api.js
 @brief     Print Deck Plugin
 @copyright (c) 2022, Johnny Mast
 @license   This source code is licensed under the MIT-style license found in the LICENSE file.
 */

class OctoPrintRest {
  /**
   * The webhost url will be stored here.
   *
   * @type {string}
   */
  static webhost = ''

  /**
   * Probe to API to see if the Application keys plugin is running.
   *
   * @returns {Promise<Response>}
   */
  static async probe () {
    return fetch(OctoPrintRest.webhost + '/plugin/appkeys/probe')
  }

  /**
   * Start the Auth cycle by registering an application token.
   *
   * @param {string} app The Application name.
   * @param {string} user The username.
   * @returns {Promise<Response>}
   */
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

  /**
   * Check if the user clicked allow already.
   *
   * @param {string} token The app token we got from requestForUser.
   * @returns {Promise<Response>}
   */
  static async checkDecision (token) {
    return fetch(OctoPrintRest.webhost + '/plugin/appkeys/request/' + token)
  }

  /**
   * Request an API key.
   *
   * @param {string} app The name of the Application.
   * @param {string} token The app token we got from requestForUser.
   * @returns {Promise<Response>}
   */
  static async generateKey (app, token) {
    return fetch(OctoPrintRest.webhost + '/api/plugin/appkeys', {
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': token
      },
      method: 'POST',
      body: JSON.stringify({
        'command': 'generate',
        'app': app,
      })
    })
  }
}