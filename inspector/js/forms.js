

const hideError = () => {
  let caution = document.getElementById('caution')
  if (caution) {
    caution.style.display = 'none'
  }
}

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
