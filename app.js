/**
 * @author       Johnny Mast <mastjohnny@gmail.com>
 * @copyright    2020 Printdeck.
 * @license      {@link https://github.com/johnnymast/printdeck/LICENSE.md|MIT License}
 */

var cache = [];

function connectElgatoStreamDeckSocket (inPort, inPluginUUID, inApplicationInfo, inActionInfo) {

  let options = {
    uuid: inPluginUUID,
    info: inApplicationInfo,
    port: inPort,
  }

  cache[inPluginUUID] = new ProgressAction(options);
}

/**
 * We use a contextArray to push our context. You can use a cache to keep some
 * data private to the plugin or to update a key regularily without waiting
 * for an event.
 * This will also work with multi-actions stored in different contexts
 */

var action = {

  willAppear: function (jsn) {
    console.log('**** action.WILLAPPEAR', jsn.context)
    if (!contextArray.includes(jsn.context)) {
      contextArray.push(jsn.context)
    }

    action['keyDown' + jsn.context] = function (jsn) {
      console.log('**** action.KEYDOWN', jsn.context)
    }

    action['keyUp' + jsn.context] = function (jsn) {
      console.log('**** action.KEYUP', jsn.context)
    }

    action['sendToPlugin' + jsn.context] = function (jsn) {
      console.log('**** action.SENDTOPLUGIN', jsn.context, jsn)
      if (jsn.hasOwnProperty('payload')) {
        const pl = jsn.payload

        if (pl.hasOwnProperty('property_inspector')) {
          const pi = pl.property_inspector
          console.log('%c%s', 'font-style: bold; color: white; background: blue; font-size: 15px;', `PI-event for ${jsn.context}:${pi}`)
          switch (pl.property_inspector) {
            case 'propertyInspectorWillDisappear':
              loadAndSetImage(jsn.context, `images/piterminated.png`)
              setTimeout(() => {
                loadAndSetImage(jsn.context, `images/default.png`)
              }, 500)
              setContext(0) // set a flag, that our PI was removed
              break
            case 'propertyInspectorConnected':
              setContext(jsn.context)
              sendToPropertyInspector(jsn.context, { runningApps })
              break
          }

        } else {
          if (pl.hasOwnProperty('sdpi_collection')) {
            console.log('%c%s', 'color: white; background: blue; font-size: 12px;', `PI SENDTOPLUGIN for ${jsn.context}`)
            console.log(pl.sdpi_collection)
            if (pl.sdpi_collection['key'] === 'your_canvas') {
              setImage(jsn.context, pl.sdpi_collection['value'])

            } else if (pl.sdpi_collection['key'] === 'elgfilepicker') {  //+++alex, this should work and works in ImageLibrary but not here...
              const path = pl.sdpi_collection.value
              console.log('filepicker', pl.sdpi_collection)
              readFile(path, { responseType: 'blob' }).then((b64) => {
                console.log(jsn.context, path, b64)
                setImage(jsn.context, b64)
              })

            } else {
              setTitle(jsn.context, pl.sdpi_collection['value'])
            }
          } else if (pl.hasOwnProperty('DOM')) {

          } else {
            console.log('%c%s', 'color: white; background: green; font-size: 12px;', `PI SENDTOPLUGIN for ${jsn.context}`)
          }
        }
      }
    }

    action['willDisappear' + jsn.context] = function (jsn) {
      console.log('**** action.WILLDISAPPEAR', jsn.context, contextArray)
      contextArray = contextArray.filter(item => item !== jsn.context)
      console.log(contextArray)
    }

  }
}