const greetDeveloper = (msg) => {
  if (window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
    const args = [
      `%c %c %c ✰ ✰ - ${msg} - ✰ ✰  %c`,
      'background: #ff66a5; padding:5px 0;',
      'background: #ff66a5; padding:5px 0;',
      'color: #ff66a5; background: #030307; padding:5px 0;',
      'background: #ff66a5; padding:5px 0;'
    ]

    window.console.log.apply(console, args)
  } else if (window.console) {
    window.console.log(`{$msg}`)
  }
}