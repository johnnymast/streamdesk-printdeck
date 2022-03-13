class Action {
  constructor (options) {
    this.websocket = null;
    this.uuid = options.uuid || '';
    this.port = options.port || -1;

    this.target = Object.freeze({ 'HARDWARE_AND_SOFTWARE': 0, 'HARDWARE_ONLY': 1, 'SOFTWARE_ONLY': 2 })

    this.setupWebsocket();
  }

  _onOpen(evt) {
    console.log('[STREAMDECK]***** WEBOCKET OPENED ****', evt)

    var json = {
      'event': 'registerPlugin',
      'uuid': this.uuid
    }

    this.send(JSON.stringify(json))
  }

  _onClose(evt) {
    console.log('[STREAMDECK]***** WEBOCKET CLOSED **** reason:', evt)
  }

  _onError(evt) {
    console.warn('WEBOCKET ERROR', evt, evt.data)
  }

  _onMessage(evt) {

    var jsonObj = JSON.parse(evt.data)
    var event = jsonObj['event']

    console.log('event', event)
    if (event == 'keyDown') {
      this.onKeyDown(jsonObj)
      console.log('ONMESSAGE: ', event)
      console.log('jsonObj: ', jsonObj)

      // loadAndSetImage(jsn.context, `images/piterminated.png`)

      // var data = canvas.toDataURL('image/png')
      // setImage(jsonObj.context, data);
    }
  }

  setupWebsocket() {

    if (this.websocket) {
      this.websocket.close();
    }

    this.websocket = new WebSocket('ws://127.0.0.1:' + this.port)

    this.websocket.addEventListener('open', this._onOpen.bind(this));
    this.websocket.addEventListener('close', this._onClose.bind(this));
    this.websocket.addEventListener('error', this._onError.bind(this));
    this.websocket.addEventListener('message', this._onMessage.bind(this));
  }



  onKeyDown(event, data) {
    // This will be overwritten
  }

  send(json) {
    this.websocket.send(json)
  }
}