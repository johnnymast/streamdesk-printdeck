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
    if (response.ok == false) {
      if (response.status == 404) {
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
                  setAPIKey(apiKey.api_key)
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

displayError = (msg) => {
  let success = document.getElementById('success')
  let caution = document.getElementById('caution')
  let caution_message = document.getElementById('caution_message')

  caution_message.innerText = msg
  success.style.display = 'none'
  caution.style.display = 'block'
}

displayMessage = (msg) => {
  let success = document.getElementById('success')
  let caution = document.getElementById('caution')
  let success_message = document.getElementById('success_message')

  success_message.innerText = msg
  caution.style.display = 'none'
  success.style.display = 'block'
}

function setAPIKey (key) {
  window.opener.postMessage(JSON.stringify({ type: 'key', apiKey: key }), "*")
  window.close()
}

function openURL(url) {
  window.opener.postMessage(JSON.stringify({ type: 'url', url: url }), "*")
}