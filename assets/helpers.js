// Splits hex into its #RRGGBBAA values
// takes color string
// returns an array of strings
function splitHex (color) {
  return [1, 3, 5].map(x => color.slice(x, x + 2))
}

// Transforms a hex array into a rgb set
// takes a hex color array generated with splitHex()
// returns an array of rgb values Int eg. [255, 255, 255]
function hex2rgb (hexArr) {
  return hexArr.map(x => parseInt(x, 16))
}

// Transforms a rgb array into a hex set
// takes a rgb color array generated with hex2rgb()
// returns an array of hex values String
function rgb2hex (rgbArr) {
  return rgbArr.map(x => x.toString(16)).map(x => (x.length === 1 ? '0' : '') + x)
}

// Generates the color of the generateNavBarColor, which is diff
// used in drawImage()
// takes the accent color string
// returns the new hex color string
function generateNavBarColor (accColor) {
  let hex = splitHex(accColor)
  const rgb = hex2rgb(hex)

  const incDec = [1, 0]
  if (rgb[0] < 60 && rgb[1] < 60 && rgb[2] < 60) {
    incDec[0] = 1
    incDec[1] = 255
  } else if (rgb[0] > 190 && rgb[1] > 190 && rgb[2] > 190) {
    incDec[0] = -1
    incDec[1] = 0
  } else if (rgb[0] < 128 || rgb[1] < 128 || rgb[2] < 128) {
    incDec[0] = -1
    incDec[1] = 0
  } else if (rgb[0] >= 128 || rgb[1] >= 128 || rgb[2] >= 128) {
    incDec[0] = 1
    incDec[1] = 255
  }

  for (let j = 0; j < rgb.length; j++) {
    let i = 0
    while (incDec[0] * rgb[j] < incDec[1] && i < 20) {
      rgb[j] += incDec[0]
      i++
    }
  }

  hex = rgb2hex(rgb)
  return '#' + hex.join('')
}

//   Generates the canvas gradient
//   used with drawImage() in the case of gradient
//   takes a string gradienttype, the img width and height
//   returns an array with the generated gradient values [startX, startY, endX, endY]
function gradientSlope (gradientType, imgWidth, imgHeight) {
  const slopeInf = {
    LR: [0, 0, imgWidth, 0],
    TB: [(imgWidth / 2), 0, (imgWidth / 2), imgHeight],
    TRBL: [imgWidth, 0, 0, imgHeight],
    TLBR: [0, 0, imgWidth, imgHeight]
  }
  return slopeInf[gradientType]
}

//   Picks a random number based on limit
//   used with the getRandom() function
//   takes an Int limit
//   returns and Int
//   @private
function getRandomInt (limit) {
  return Math.floor(Math.random() * Math.floor(limit))
}

//   Transforms canvas into a blob
//   used with JSZip
//   takes canvas
//   returns blob
function getCanvasBlob (canvas) {
  return new Promise(function (resolve, reject) {
    canvas.toBlob(function (blob) {
      resolve(blob)
    })
  })
}

//   Picks 3 or 6 random colors based on the input
//   used on the "Random" option
//   takes an array of colors, the amount selected and the dashboard icon style
//   returns an array of 2 random colors
function getRandom (randomColors, randomType = 3, dIco) {
  let colors = [randomColors[0], randomColors[1]]
  if (dIco === 1) {
    const salt = getRandomInt(randomType === 3 ? 2 : 3)
    if (salt === 2) {
      colors = [randomColors[4], randomColors[5]]
    } else if (salt === 1) {
      colors = [randomColors[2], randomColors[3]]
    }
  } else {
    const rand1 = Math.floor(Math.random() * randomColors.length)
    const rand2 = Math.floor(Math.random() * randomColors.length)
    colors = [randomColors[rand1], randomColors[rand2]]
  }
  return colors
}

//   A promisified delay
//   used to make the client wait till asset has been downloaded
//   takes an Int amount of ms
//   returns a promise
function delay (timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, timeout)
  })
}

//   Generates a folder structure
//   used to manage the assets to be drawn
//   takes an array of strings path of files, JSON fields submitted and JSON genInfo
//   returns a json
function generateFolderJson (files, fields, genInfo) {
  return {
    accRes: {
      name: 'accRes',
      files: files.accRes,
      color: fields.normal.accColor.input,
      gradient: fields.extra.gradient.enabled,
      color2: fields.gradient.accColor2.input
    },
    bgRes: {
      name: 'bgRes',
      files: files.bgRes,
      color: genInfo.navBgColor
    },
    bgRes2: {
      name: 'bgRes2',
      files: files.bgRes2,
      color: genInfo.navBgColor
    },
    dIco: {
      name: `dIco/dt${fields.icons.dIco}`,
      files: files.dIco.files,
      color: fields.normal.dIcoColor1.input,
      gradient: fields.extra.gradient.enabled,
      color2: fields.random.dIcoColor2.input,
      random: true,
      randomSalt: fields.icons.dIco
    },
    nIco: {
      name: `nIco/nt${fields.icons.nIco}`,
      files: files.nIco.files,
      color: fields.normal.accColor.input,
      gradient: fields.extra.gradient.enabled,
      color2: fields.gradient.accColor2.input
    }
  }
}

//   Counts all available files
//   used to calculate the progress bar
//   takes an array of string paths of files
//   returns an Int
function countFiles (files) {
  let i = 0;

  ['accRes', 'bgRes', 'bgRes2'].forEach((x) => {
    i += files[x].length
  });

  ['dIco', 'nIco'].forEach((x) => {
    i += files[x].files.length
  })

  return i
}

//   Generates the stprop file
//   used pre-draw
//   takes json subfields, bool gradient, string gradientaccenttype, string gradientsecondary hex
//   returns an array of [String, JSON]
function generateStProp (subFields, gradient, gradientAccentType, gradientSecondary) {
  const props = []
  const genInfo = {}
  for (const [key, value] of Object.entries(subFields)) {
    if (value.notAProp) { continue }
    let noSpace = value.input.split(' ').join('_')
    if (key === 'accColor' && gradient && gradientAccentType === 'secondary') {
      noSpace = gradientSecondary
    }
    genInfo[key] = noSpace
    props.push(`${key}=${noSpace}`)
  }
  const navColor = generateNavBarColor(subFields.bgColor.input)
  genInfo.navBgColor = navColor
  const navBar = 'navBgColor=' + navColor
  props.splice(2, 0, navBar)

  return [props.join('\n'), genInfo]
}

//   Calculates the current progressbar value
//   used in draw
//   takes string current value, int total files, int amount of max progress, int last progress values
//   returns an Int
function progressCalc (current, total, outOf, last) {
  return last + Math.trunc(((current + 1) / total) * outOf)
}

export { splitHex, hex2rgb, rgb2hex, generateNavBarColor, gradientSlope, getCanvasBlob, getRandom, delay, generateFolderJson, countFiles, generateStProp, progressCalc }
