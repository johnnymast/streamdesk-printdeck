/**
 @file      OctoPrintSetTemperatureAction.js
 @brief     Print Deck Plugin
 @copyright (c) 2022, Johnny Mast
 @license   This source code is licensed under the MIT-style license found in the LICENSE file.
 */

class OctoPrintSetTemperatureAction extends Action {

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
    this.actionUUID = 'com.johnnymast.printdeck.octoprint.temperature'
    this.settings = settings
    this.context = context

    this.api = null

    this.options = {
      apikey: this.settings.apikey || '',
      webhost: this.settings.host || '',
      bedTemp: parseInt(this.settings.bed_temp) || 65,
      hotEndTemp: parseInt(this.settings.hotend_temp) || 205
    }

    if (this.options.webhost) {
      this.api = new OctoPrintRest(this.options.webhost)
    }
  }

  /**
   * The stream deck tile has been released.
   *
   * @param {object} evt The event for the keyUp.
   */
  onKeyUp (evt) {
    if (this.api) {
      let hotEndCommand = this.api.setHotEndTemperature(this.options.hotEndTemp, this.options.apikey)
      let bedCommand = this.api.setBedTemperature(this.options.bedTemp, this.options.apikey)

      Promise.all([hotEndCommand, bedCommand]).then(() => {
        showOk(this.context)
      }).catch(() => {
        showAlert(this.context)
      })
    }
  }
}