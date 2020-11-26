<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <Logo />
      <v-card class="pa-2">
        <v-card-title class="headline pb-0">
          Welcome to the SHRP Theme Builder!
          <v-list-item-subtitle>Play with the setting below and click "Generate" when ready!</v-list-item-subtitle>
        </v-card-title>
        <div class="text-center">
          <Form @submit="submit" />
        </div>
      </v-card>
      <v-card v-show="ready" class="pa-2 mt-4">
        <v-progress-linear
          v-model="progress"
          color="#21CEF5"
          height="25"
          rounded
        />
        <v-card-title class="headline">
          {{ status }}
          <v-list-item-subtitle v-show="sub">
            Please wait
          </v-list-item-subtitle>
        </v-card-title>
        <div id="liveview" class="text-center">
          <img id="srcImage" @load="onImgLoad">
          <canvas id="c" />
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

import files from '~/assets/files.json'
import Form from '~/components/Form.vue'
import Logo from '~/components/Logo.vue'

const zip = new JSZip()
const res = zip.folder('res')

export default {
  components: {
    Form,
    Logo
  },
  data: () => ({
    isLoaded: false,
    genInfo: {},
    status: 'Downloading assets',
    ready: false,
    sub: true,
    progress: 0,
    last: 0
  }),
  methods: {
    async submit (fields) {
      document.getElementById('toBeDisabled').disabled = true
      document.getElementById('toBeDisabled').style.display = 'none'
      this.ready = true
      this.progress = 0
      this.last = 0
      document.getElementById('liveview').style.display = 'block'
      const totalFiles = this.countFiles()
      zip.file('st.prop', this.generateStProp(fields.normal, fields.extra.gradient.enabled, fields.extra.gradient.accent, fields.gradient.accColor2.input))

      const randomColors = [fields.normal.dIcoColor1.input]
      Object.values(fields.random).forEach((x) => {
        randomColors.push(x.input)
      })
      const folders = {
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
          color: this.genInfo.navBgColor
        },
        bgRes2: {
          name: 'bgRes2',
          files: files.bgRes2,
          color: this.genInfo.navBgColor
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

      const folderValues = Object.values(folders)
      const folderLength = folderValues.length
      for (let i = 0; i < folderLength; i++) {
        await this.preloadAssets(folderValues[i].name, folderValues[i].files)
        this.progressClac(i, folderLength, 25)
      }
      this.last = this.progress
      this.status = 'Done with downloading assets'
      await this.delay(1000)
      this.status = 'Editing assets'
      let z = 0
      for (let i = 0; i < Object.values(folders).length; i++) {
        const folder = Object.values(folders)[i]
        for (let j = 0; j < folder.files.length; j++) {
          const file = folder.files[j]
          const filePath = '/files/' + folder.name + '/' + file
          if (fields.extra.random.enabled && folder.random) {
            const colors = this.getRandom(randomColors, fields.extra.random.type, folder.randomSalt)
            await this.draw(colors[0], filePath, file, folder.gradient, fields.extra.gradient.type, colors[1])
          } else {
            await this.draw(folder.color, filePath, file, folder.gradient, fields.extra.gradient.type, folder.color2)
          }

          this.progressClac(z, totalFiles, 50)
          z++
        }
      }
      this.last = this.progress
      this.status = 'Done with editing assets'
      await this.delay(1000)
      this.status = 'Creating theme'
      zip.generateAsync({ type: 'blob' }).then(function (content) {
        // Replace spaces with underscores & change mime type
        saveAs(content.slice(0, content.size, 'application/stheme'), fields.normal.themeName.input.split(' ').join('_') + '.stheme')
      })
      this.progress = 100
      this.status = 'Thanks for using SHRP!'
      this.sub = false
      document.getElementById('liveview').style.display = 'none'
      document.getElementById('toBeDisabled').disabled = false
      document.getElementById('toBeDisabled').style.display = 'block'
    },
    progressClac (current, total, outOf) {
      this.progress = this.last + Math.trunc(((current + 1) / total) * outOf)
      return true
    },
    async preloadAssets (folder, imgs) {
      for (let i = 0; i < imgs.length; i++) {
        this.isLoaded = false
        const image = document.getElementById('srcImage')
        const file = imgs[i]
        const filePath = '/files/' + folder + '/' + file
        image.src = filePath
        while (!this.isLoaded) {
          await this.delay(100)
        }
      }
      return true
    },
    onImgLoad () {
      this.isLoaded = true
    },
    countFiles () {
      let i = 0;

      ['accRes', 'bgRes', 'bgRes2'].forEach((x) => {
        i += files[x].length
      });

      ['dIco', 'nIco'].forEach((x) => {
        i += files[x].files.length
      })

      return i
    },
    delay (timeout) {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, timeout)
      })
    },
    getCanvasBlob (canvas) {
      return new Promise(function (resolve, reject) {
        canvas.toBlob(function (blob) {
          resolve(blob)
        })
      })
    },
    gradientSlope (gradientType, imgWidth, imgHeight) {
      const slopeInf = {
        LR: [0, 0, imgWidth, 0],
        TB: [(imgWidth / 2), 0, (imgWidth / 2), imgHeight],
        TRBL: [imgWidth, 0, 0, imgHeight],
        TLBR: [0, 0, imgWidth, imgHeight]
      }
      return slopeInf[gradientType]
    },
    getRandomInt (limit) {
      return Math.floor(Math.random() * Math.floor(limit))
    },
    getRandom (randomColors, randomType = 3, dIco) {
      let colors = [randomColors[0], randomColors[1]]
      if (dIco === 1) {
        const salt = this.getRandomInt(randomType === 3 ? 2 : 3)
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
    },
    async draw (color, path, name, gradient = false, gradientType = 'LR', color2 = null) {
      this.isLoaded = false
      const img = document.getElementById('srcImage')
      img.src = path
      while (!this.isLoaded) {
        await this.delay(100)
      }
      const canvas = document.getElementById('c')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      ctx.globalCompositeOperation = 'source-in'
      let filling = color
      if (gradient) {
        const slope = this.gradientSlope(gradientType, img.width, img.height)
        const grd = ctx.createLinearGradient(slope[0], slope[1], slope[2], slope[3])
        grd.addColorStop(0, color)
        grd.addColorStop(1, color2)
        filling = grd
      }
      ctx.fillStyle = filling
      ctx.fillRect(0, 0, img.width, img.height)
      const blob = await this.getCanvasBlob(canvas)
      res.file(name, blob)
    },
    splitHex (color) {
      return [1, 3, 5].map(x => color.slice(x, x + 2))
    },
    hex2rgb (hexArr) {
      return hexArr.map(x => parseInt(x, 16))
    },
    rgb2hex (rgbArr) {
      return rgbArr.map(x => x.toString(16)).map(x => (x.length === 1 ? '0' : '') + x)
    },
    generateNavBarColor (accColor) {
      let hex = this.splitHex(accColor)
      const rgb = this.hex2rgb(hex)

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

      hex = this.rgb2hex(rgb)
      return '#' + hex.join('')
    },
    generateStProp (subFields, gradient, gradientAccentType, gradientSecondary) {
      const props = []
      for (const [key, value] of Object.entries(subFields)) {
        if (value.notAProp) { continue }
        let noSpace = value.input.split(' ').join('_')
        if (key === 'accColor' && gradient && gradientAccentType === 'secondary') {
          noSpace = gradientSecondary
        }
        this.genInfo[key] = noSpace
        props.push(`${key}=${noSpace}`)
      }
      const navColor = this.generateNavBarColor(subFields.bgColor.input)
      this.genInfo.navBgColor = navColor
      const navBar = 'navBgColor=' + navColor
      props.splice(2, 0, navBar)

      return props.join('\n')
    }
  }
}
</script>
