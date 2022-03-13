class ProgressAction extends Action {

  onKeyDown (evt, data) {
    var canvas = document.createElement('CANVAS')

    context = canvas.getContext('2d')

    context.beginPath()
    context.rect(40, 40, 150, 100)
    context.fillStyle = 'blue'
    context.fill()

    console.log('Progress pressed', this)
    var data = canvas.toDataURL('image/png')
    this.setImage(evt.context, data)

    console.log(this.target)
  }

  setImage (context, imgData) {

    console.log('setImage', this)
    let json = {
      'event': 'setImage',
      'context': context,
      'payload': {
        'image': imgData,
        'target': this.target.HARDWARE_AND_SOFTWARE
      }
    }

    this.send(JSON.stringify(json))
  };

}