/**
 @file      localization.js
 @brief     Print Deck Plugin
 @copyright (c) 2022, Johnny Mast
 @license   This source code is licensed under the MIT-style license found in the LICENSE file.
 */

class Localization {

  /**
   * Container for the translations.
   *
   * @type {Object}
   */
  static strings = {}

  /**
   * Load the locale file.
   *
   * @param {string} locale The locale for example "fr" for "fr.json".
   */
  static load (locale) {

    const file = `${locale}.json`
    const path = '../'

    let request = new XMLHttpRequest()

    request.onerror = function (e) {
      StreamDeck.debug(`Could not load locale file ${file}`)
      return false
    }

    request.overrideMimeType('application/json')
    request.open('GET', `${path}${file}`, true)
    request.onreadystatechange = function () {
      if (request.readyState === 4 && request.responseText.length > 0) {
        let json = request.responseText
        Localization.strings = JSON.parse(json)
      }
    }
    request.send(null)
  }

  /**
   * Localize the inspector html fields.
   *
   * @param {string} action The action to look up the text for.
   */
  static localizeInspector (action) {
    let translations = {}

    if (typeof Localization.strings.inspector[action] !== 'undefined') {
      translations = Localization.strings.inspector[action]
    }

    let elements = document.querySelectorAll('.inspector-translatable')

    if (elements.length > 0) {
      elements.forEach((elm) => {
        if (elm.dataset.text) {
          elm.innerText = translations[elm.dataset.text] || elm.dataset.text
        }
        if (elm.dataset.placeholder) {
          elm.setAttribute('placeholder', translations[elm.dataset.placeholder] || elm.dataset.placeholder)
        }
      })
    }
  }

  /**
   * Translate a text from the plugin side.
   *
   * @param {string } action The action to look up the text for.
   * @param {string } text The text to translate.
   * @returns {*}
   */
  static localizePluginText (action, text) {
    if (typeof Localization.strings.plugin[action] !== 'undefined') {
      let translations = Localization.strings.plugin[action]

      if (translations.hasOwnProperty(text)) {
        return translations[text]
      }
    }
    return text
  }
}
