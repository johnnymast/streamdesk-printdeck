/**
 @file      forms.js
 @brief     Print Deck Plugin
 @copyright (c) 2022, Johnny Mast
 @license   This source code is licensed under the MIT-style license found in the LICENSE file.
 */

/**
 * Hide the caution/error message element.
 */
const hideError = () => {
  let caution = document.getElementById('caution')
  if (caution) {
    caution.style.display = 'none'
  }
}

/**
 * Hide the success message element.
 */
const hideMessage = () => {
  let success = document.getElementById('success')
  if (success) {
    success.style.display = 'none'
  }
}

/**
 * Display an error message.
 *
 * @param {string} msg The message to display.
 */
const displayError = (msg) => {
  let caution = document.getElementById('caution')
  let caution_message = document.getElementById('caution_message')

  caution_message.innerText = msg
  caution.style.display = 'block'
  hideMessage()
}

/**
 * Display a success message.
 *
 * @param {string} msg The message to display.
 */
const displayMessage = (msg) => {
  let success = document.getElementById('success')
  let success_message = document.getElementById('success_message')

  hideError()
  success_message.innerText = msg
  success.style.display = 'block'
}
