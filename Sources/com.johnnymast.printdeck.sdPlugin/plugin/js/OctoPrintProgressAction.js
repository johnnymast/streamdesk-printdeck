/**
 @file      OctoPrintProgressAction.js
 @brief     Print Deck Plugin
 @copyright (c) 2022, Johnny Mast
 @license   This source code is licensed under the MIT-style license found in the LICENSE file.
 */

class OctoPrintProgressAction extends Action {

  /**
   * @classdesc
   * Displays the progress of your printer on a stream deck button.
   *
   * @class OctoPrintProgressAction
   * @constructor
   * @since 1.0.0
   */
  constructor (context, settings) {
    super()
    
    // TODO: Maybe add websockets connection?
    // http://localhost:23654/

    this.actionUUID = 'com.johnnymast.printdeck.octoprint.progress'
    this.settings = settings
    this.context = context
    this.resetInterval = 2000 // 2 seconds

    this.webhost = null
    this.hasError = false
    this.didConnect = false

    let apiKey = this.settings.apikey || ''
    let webHost = this.settings.host || ''

    this.webhost = webHost

    if (this.webhost) {
      var api = new OctoPrintRest(this.webhost)

      setInterval(async () => {
        if (this.hasError === true) {
          return false
        }

        api.getJob(apiKey).then((response) => {
          if (response) {

            this.didConnect = true

            response.json().then((data) => {
              var progress = data.state

              switch (progress) {
                case 'Printing':
                  progress = parseFloat(data.progress.completion)
                  progress = progress.toFixed(1) + '%'
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

          setTitle(this.context, Localization.localizePluginText(this.actionUUID, 'error'))
          showAlert(this.context)

          sendToPropertyInspector(this.actionUUID, this.context, {
            type: 'error',
            message: Localization.localizePluginText(this.actionUUID, "There was an error connecting to webhost. Hold how the button on your Stream Deck for 3 seconds to try again.")
          })

          this.hasError = true
        })
      }, 5000)
    }
  }

  /**
   * The stream deck tile has been pressed down.
   *
   * @param {object} evt The event for the keyDown.
   */
  onKeyDown (evt) {

    this.buttonPressed = performance.now()

    if (this.hasError === false) {

      if (this.webhost && this.didConnect === true) {
        StreamDeck.debug(`${this.actionUUID} Opening url to webhost ${this.webhost}.`)
        openUrl(this.webhost)
      } else {
        StreamDeck.debug(`${this.actionUUID} cannot open url cause: webhost not found.`)
        showAlert(this.context)
      }
    }
  }

  /**
   * The stream deck tile has been released.
   *
   * @param {object} evt The event for the keyUp.
   */
  onKeyUp (evt) {
    let now = performance.now()
    let delta = now - this.buttonPressed

    if (this.hasError === true && delta > this.resetInterval) {
      setTitle(this.context, Localization.localizePluginText(this.actionUUID, 'reset'))
      showOk(this.context)

      sendToPropertyInspector(this.actionUUID, this.context, { type: 'hide_error' })

      this.buttonPressed = 0
      this.didConnect = false
      this.hasError = false
    }
  }
}