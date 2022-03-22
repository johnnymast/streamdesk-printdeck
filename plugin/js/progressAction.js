/**
 @file      action.js
 @brief     Print Deck Plugin
 @copyright (c) 2022, Johnny Mast
 @license   This source code is licensed under the MIT-style license found in the LICENSE file.
 */

class OctoPrintProgressionPol {

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
}

class ProgressAction extends Action {

  /**
   * @classdesc
   * Displays the progress of your printer on a stream deck button.
   *
   * @class ProgressAction
   * @constructor
   * @since 1.0.0
   */
  constructor (context, settings) {
    super()

    // TODO: Send error to inspector with reset instructions.
    // TODO: Add host to settings data.
    // TODO: Maybe add websockets connection?
    // http://localhost:23654/

    this.actionUUID = 'com.johnnymast.printdeck.progress'
    this.settings = settings
    this.context = context
    this.resetInterval = 3000 // 3 seconds

    this.webhost = null
    this.hasError = false

    EventEmitter.on('com.johnnymast.printdeck.progress.start_polling', () => {
      let hosts = Storage.get('hosts') || []
      let apiKey = this.settings.apikey || ''
      let webHost = null

      Object.values(hosts).forEach((host) => {
        if (host.key == apiKey) {
          webHost = `http://${host.host}/`
        }
      })

      this.webhost = webHost

      if (webHost) {
        var api = new OctoPrintProgressionPol(webHost)

        setInterval(async () => {
          if (this.hasError == true) {
            return false
          }

          api.getJob(apiKey).then((response) => {
            if (response) {
              response.json().then((data) => {
                var progress = data.state

                switch (progress) {
                  case 'Printing':
                    progress = parseFloat(data.progress.completion)
                    progress = Math.floor(progress) + '%'
                    break

                  default:
                    /**
                     * Maybe we extend the switch further one day.
                     * We might be able to show custom icons based o n
                     * the progress.
                     */
                    progress = 'done'
                    break
                }

                setTitle(this.context, progress)
              })
            }
          }).catch((err) => {
            StreamDeck.debug(`Error: Could not reach ${this.webhost}`)
            setTitle(this.context, 'error')
            showAlert(this.context)

            this.hasError = true
          })
        }, 5000)
      }
    })
  }

  /**
   * The stream deck tile has been pressed down.
   *
   * @param {Object} evt
   */
  onKeyDown (evt) {

    this.buttonPressed = performance.now()

    if (this.hasError == false) {

      if (this.webhost) {
        StreamDeck.debug(`${this.actionUUID} Opening url to webhost ${this.webhost}.`)
        openUrl(this.context, this.webhost)
      } else {
        StreamDeck.debug(`${this.actionUUID} cannot open url cause: webhost not found.`)
        showAlert(this.context)
      }
    }
  }

  /**
   * The stream deck tile has been released.
   *
   * @param {Object} evt
   */
  onKeyUp (evt) {
    let now = performance.now()
    let delta = now - this.buttonPressed

    if (delta > this.resetInterval) {
      setTitle(this.context, 'reset')
      showOk(this.context)

      this.hasError = false
    }
  }
}