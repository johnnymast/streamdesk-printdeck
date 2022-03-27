/**
 @file      setup.js
 @brief     Print Deck Plugin
 @copyright (c) 2022, Johnny Mast
 @license   This source code is licensed under the MIT-style license found in the LICENSE file.
 */

/**
 * Request an API key from OctoPrint.
 *
 * @param {string} app The name of the application.
 * @param {string} user The username on the octoprint instance.
 * @param {string} host The host to connect to.
 */
function getApiKey (app, user, host) {

  const interval = 1000
  const maxtries = 30
  let tries = 0

  if (host.indexOf('http://') || host.indexOf('https://')) {
    host = host.replace('http://', '')
    host = host.replace('https://', '')
  }

  OctoPrintRest.webhost = `http://${host}/`
  OctoPrintRest.probe().then((response) => {
    if (response.ok === false) {
      if (response.status === 404) {
        displayError('Did you disable the Application key plugin?')
      }
      return false
    }

    OctoPrintRest.requestForUser(app, user).then((response) => {

      if (response.ok) {
        displayMessage('Please login to Octprint to allow access')
        openURL(OctoPrintRest.webhost)

        response.json().then((obj) => {
          let appToken = obj.app_token

          let handle = setInterval(() => {
            OctoPrintRest.checkDecision(appToken).then((response) => {

              if (tries > maxtries) {
                displayError('You waited to long')
                clearInterval(handle)
                return
              }

              if (response.status != 202) {

                displayMessage('ACCEPTED')

                response.json().then((apiKey) => {
                  setAPIKey(apiKey.api_key, OctoPrintRest.webhost)
                })

                clearInterval(handle)
              }
            })

            tries++
          }, interval)
        })

      } else {
        displayError('Could not request API key from Octprint.')
      }
    }).catch(e => displayError(e))

  }).catch(function (err) {
    displayError(`failed to connect to ${OctoPrintRest.webhost}`)
  })

    .catch(err => displayError(err))
}

/**
 * Set the API key for Octoprint. Close the window and report it to the inspector.
 *
 * @param {string} key The API key.
 */
function setAPIKey (key, host) {
  window.opener.postMessage(JSON.stringify({ type: 'key', webhost: host, apiKey: key, source: 'connectToOctoPrint' }), '*')
  window.close()
}

/**
 * Tell the Stream Deck inspector to open a url.
 *
 * @param {string} url The url to open in the default browser.
 */
function openURL (url) {
  window.opener.postMessage(JSON.stringify({ type: 'url', url: url,  source: 'connectToOctoPrint' }), '*')
}