<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <Logo />
      <v-card class="pa-2">
        <v-card-title class="headline pb-0">
          {{ headline }}
          <v-list-item-subtitle>{{ subline }}</v-list-item-subtitle>
        </v-card-title>
        <div id="mainForm" class="text-center">
          <Form @submit="submit" @fields-changed="renderPreview" @reconstruct="reconstruct" />
        </div>
      </v-card>
      <v-card v-show="ready" id="finalMsgCard" class="pa-2 mt-4">
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
        <div id="liveview" class="text-center" style="display:none">
          <img id="srcImage" @load="onImgLoad">
          <canvas id="c" />
        </div>
      </v-card>
      <v-card id="previewCard" class="pa-2 mt-4" style="display: none;">
        <v-card-title class="headline">
          Preview
          <v-list-item-subtitle>
            This is a DEMO. Recovery and theme might look different.
          </v-list-item-subtitle>
        </v-card-title>
        <div id="preview" class="text-center">
          <canvas id="d" height="1000" width="500" style="display: block;width: 50%; height: 100%;margin-left: auto;margin-right: auto;" />
          <img id="tmpLoader" style="display: none" @load="onTmpImgLoad">
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

import { gradientSlope, getCanvasBlob, getRandom, delay, generateFolderJson, countFiles, generateStProp, getThemeConfig, progressCalc, getSubBg, aspectRatio, isDark } from '~/assets/helpers.js'

const zip = new JSZip()
const res = zip.folder('res')
const dynamic = zip.folder('dynamic')

export default {
  components: {
    Form,
    Logo
  },
  data: () => ({
    isLoaded: false,
    isTmpLoaded: false,
    genInfo: {},
    status: '',
    ready: false,
    sub: true,
    progress: 0,
    last: 0,
    headline: 'Welcome to the SHRP Theme Builder!',
    subline: 'Play with the setting below and click "Generate" when ready!',
    lastPreview: ''
  }),
  methods: {
    async submit (fields) {
      this.status = 'Getting ready'
      this.sub = true
      zip.remove('res')
      zip.remove('dynamic')
      this.toggleViews()

      this.ready = true
      this.progress = 0
      this.last = 0
      this.genInfo = generateStProp(fields.normal, fields.extra.gradient.enabled, fields.extra.gradient.accent, fields.gradient.accColor2.input)
      const accClr = fields.normal.accColor.input
      const acc2Clr = fields.gradient.accColor2.input
      const totalFiles = countFiles(files)
      const themeData = getThemeConfig({
        primaryColor: fields.normal.textColor.input,
        secondaryColor: fields.normal.sTextColor.input,
        accentColor: (fields.extra.gradient.enabled && fields.extra.gradient.accent === 'Primary') ? accClr : acc2Clr,
        backgroundColor: fields.normal.bgColor.input,
        subBackgroundColor: getSubBg(fields.normal.bgColor.input),
        navbarColor: fields.dnIcoColors.nIcoColor.input,
        dashboardTextColor: fields.settings.dashboardTextColorEnabled ? fields.dashboardText.input : fields.normal.accColor.input,

        batteryBarEnabled: fields.settings.batteryBarEnabled ? 1 : 0,
        statusBarEnabled: fields.settings.statusBarEnabled ? 1 : 0,
        batteryIconEnabled: fields.settings.batteryIconEnabled ? 1 : 0,
        batteryPercentageEnabled: fields.settings.batteryPercentageEnabled ? 1 : 0,
        clockEnabled: fields.settings.clockEnabled ? 1 : 0,
        centeredClockEnabled: fields.settings.centeredClockEnabled ? 1 : 0,
        cpuTempEnabled: fields.settings.cpuTempEnabled ? 1 : 0,
        roundedCornerEnabled: fields.settings.roundedCornerEnabled ? 1 : 0,
        navbarBackgroundEnabled: fields.settings.navbarBackgroundEnabled ? 1 : 0,
        dashboardSubTintEnabled: fields.settings.dashboardSubTintEnabled ? 1 : 0,
        dashboardTextColorEnabled: fields.settings.dashboardTextColorEnabled ? 1 : 0
      })
      dynamic.file('themeData.xml', themeData)

      const randomColors = [fields.dnIcoColors.dIcoColor.input]
      Object.values(fields.random).forEach((x) => {
        randomColors.push(x.input)
      })
      const folders = generateFolderJson(files, fields, this.genInfo)
      this.status = 'Editing assets'

      // Go through all assets and draw on them
      let z = 0
      for (let i = 0; i < Object.values(folders).length; i++) {
        const folder = Object.values(folders)[i]
        for (let j = 0; j < folder.files.length; j++) {
          const file = folder.files[j]
          const filePath = '/files/' + folder.name + '/' + file
          let blob
          if (fields.extra.random.enabled && folder.random) {
            const colors = getRandom(randomColors, fields.extra.random.type, folder.randomSalt)
            blob = await this.draw(colors[0], filePath, folder.gradient, fields.extra.gradient.type, colors[1])
          } else {
            blob = await this.draw(folder.color, filePath, folder.gradient, fields.extra.gradient.type, folder.color2)
          }
          res.file(file, blob)
          this.progress = progressCalc(z, totalFiles, 75, this.last)
          z++
        }
      }
      this.last = this.progress
      this.status = 'Done with editing assets'
      await delay(1000)
      if (fields.splash.custom && fields.splash.info) {
        this.status = 'Editing splash'
        const resizedSplash = await this.drawSplash(fields.splash.blob)
        res.file('c_logo.png', resizedSplash)
        this.progress = 90
        await delay(1000)
      }
      this.status = 'Creating theme'
      zip.generateAsync({ type: 'blob' }).then(function (content) {
        // Replace spaces with underscores & change mime type
        saveAs(content.slice(0, content.size, 'application/stheme'), fields.normal.themeName.input.split(' ').join('_') + '.stheme')
      })
      this.progress = 100
      this.status = 'Thanks for using SHRP!'
      this.sub = false
      await delay(5000)
      this.toggleViews(false)
    },
    toggleViews (enable = true) {
      document.getElementById('toBeDisabled').disabled = enable
      // document.getElementById('toBeDisabled').style.display = enable ? 'none' : 'block'
      // document.getElementById('liveview').style.display = enable ? 'block' : 'none'
      document.getElementById('mainForm').style.display = enable ? 'none' : 'block'
      document.getElementById('finalMsgCard').style.display = enable ? 'block' : 'none'
      document.getElementById('previewCard').style.display = enable ? 'none' : 'block'

      this.subline = enable ? 'Please wait until your theme gets built...' : 'Play with the setting below and click "Generate" when ready!'
    },
    onImgLoad () {
      this.isLoaded = true
    },
    onTmpImgLoad () {
      this.isTmpLoaded = true
    },
    async draw (color, path, gradient = false, gradientType = 'LR', color2 = null) {
      this.isLoaded = false
      const img = document.getElementById('srcImage')
      img.src = path
      while (!this.isLoaded) {
        await delay(100)
      }
      const canvas = document.getElementById('c')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      ctx.globalCompositeOperation = 'source-in'
      let filling = color
      if (gradient && color !== 'transparent') {
        const slope = gradientSlope(gradientType, img.width, img.height)
        const grd = ctx.createLinearGradient(slope[0], slope[1], slope[2], slope[3])
        grd.addColorStop(0, color)
        grd.addColorStop(1, color2)
        filling = grd
      }
      if (color !== 'transparent') {
        ctx.fillStyle = filling
        ctx.fillRect(0, 0, img.width, img.height)
      }
      return await getCanvasBlob(canvas)
    },
    async drawSplash (blob, newWidth, newHeight) {
      this.isLoaded = false
      const img = document.getElementById('srcImage')
      img.src = blob
      while (!this.isLoaded) {
        await delay(100)
      }
      const newSizes = aspectRatio(img.width, img.height, 817, 817)
      const canvas = document.getElementById('c')
      canvas.width = newSizes[0]
      canvas.height = newSizes[1]
      const ctx = canvas.getContext('2d')

      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height)

      return await getCanvasBlob(canvas)
    },
    // Removes and recreates the main canvas
    reconstruct (fields) {
      const precanvas = document.getElementById('d')
      if (precanvas) {
        document.getElementById('previewCard').style.display = 'block'
        precanvas.remove()
        const canvas = document.createElement('canvas')
        canvas.setAttribute('id', 'd')
        canvas.width = 500
        canvas.height = 1000
        canvas.style = 'display: block;width: 50%; height: 100%;margin-left: auto;margin-right: auto;'
        document.getElementById('preview').appendChild(canvas)
        this.renderPreview(fields)
      }
    },
    // The main render function
    async renderPreview (fields) {
      // Cache last form to avoid way too many creations

      // if (JSON.stringify(fields) === this.lastPreview) {
      //   return
      // } else {
      //   this.lastPreview = JSON.stringify(fields)
      // }
      this.isTmpLoaded = false
      const img = document.getElementById('tmpLoader')
      img.src = ''
      // 9 CANVASES
      const canvas0 = document.getElementById('d')
      const ctx0 = canvas0.getContext('2d')
      const canvas = document.createElement('canvas')
      canvas.width = 500
      canvas.height = 1000
      canvas.style = 'display: block;width: 50%; height: 100%;margin-left: auto;margin-right: auto;'
      const ctx = canvas.getContext('2d')
      const canvas2 = document.createElement('canvas')
      canvas2.width = 500
      canvas2.height = 1000
      canvas2.style = 'display: block;width: 50%; height: 100%;margin-left: auto;margin-right: auto;'
      const ctx2 = canvas2.getContext('2d')
      const canvas3 = document.createElement('canvas')
      canvas3.width = 500
      canvas3.height = 1000
      canvas3.style = 'display: block;width: 50%; height: 100%;margin-left: auto;margin-right: auto;'
      const ctx3 = canvas3.getContext('2d')
      const canvas4 = document.createElement('canvas')
      canvas4.width = 500
      canvas4.height = 1000
      canvas4.style = 'display: block;width: 50%; height: 100%;margin-left: auto;margin-right: auto;'
      const ctx4 = canvas4.getContext('2d')
      const canvas5 = document.createElement('canvas')
      canvas5.width = 500
      canvas5.height = 1000
      canvas5.style = 'display: block;width: 50%; height: 100%;margin-left: auto;margin-right: auto;'
      const ctx5 = canvas5.getContext('2d')
      const canvas6 = document.createElement('canvas')
      canvas6.width = 500
      canvas6.height = 1000
      canvas6.style = 'display: block;width: 50%; height: 100%;margin-left: auto;margin-right: auto;'
      const ctx6 = canvas6.getContext('2d')
      const canvas7 = document.createElement('canvas')
      const ctx7 = canvas7.getContext('2d')
      const canvas8 = document.createElement('canvas')
      const ctx8 = canvas8.getContext('2d')
      const canvas9 = document.createElement('canvas')
      const ctx9 = canvas9.getContext('2d')

      ctx.globalCompositeOperation = 'source-over'
      ctx0.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = fields.normal.bgColor.input
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      // Rounded corners done with CSS
      if (fields.settings.roundedCornerEnabled) {
        canvas0.style.borderRadius = '20px'
      } else {
        canvas0.style.borderRadius = '0px'
      }
      // Battery bar
      if (fields.settings.batteryBarEnabled) {
        img.src = 'preview/c_battery_bar.png'
        while (!this.isTmpLoaded) {
          await delay(100)
        }
        ctx.drawImage(img, 0, 0, canvas.width + 5, 5)
      }
      // Logo + essential
      this.isTmpLoaded = false
      ctx2.fillStyle = fields.normal.accColor.input
      ctx2.fillRect(0, 0, canvas2.width, canvas2.height)
      ctx2.globalCompositeOperation = 'destination-in'
      img.src = 'preview/logo.png'
      while (!this.isTmpLoaded) {
        await delay(100)
      }
      ctx2.drawImage(img, 25, 60, canvas.width - 50, 110)
      ctx.drawImage(canvas2, 0, 0)
      this.isTmpLoaded = false
      // Navbar
      ctx3.fillStyle = fields.dnIcoColors.nIcoColor.input
      ctx3.fillRect(0, 0, canvas3.width, canvas3.height)
      ctx3.globalCompositeOperation = 'destination-in'
      img.src = `preview/n${fields.icons.nIco}.png`
      while (!this.isTmpLoaded) {
        await delay(100)
      }
      // Navbar background
      if (fields.settings.navbarBackgroundEnabled) {
        canvas8.width = img.width
        canvas8.height = img.height
        ctx8.fillStyle = getSubBg(fields.normal.bgColor.input)
        ctx8.fillRect(0, 0, img.width, img.height)
        ctx.drawImage(canvas8, 0, canvas.height - 80, canvas.width, 80)
      }

      ctx3.drawImage(img, 0, canvas.height - 80, canvas.width, 80)
      ctx.drawImage(canvas3, 0, 0)

      this.isTmpLoaded = false
      // Status bar
      ctx4.globalCompositeOperation = 'lighten'
      let drew = 0
      const topPad = 40
      if (fields.settings.statusBarEnabled) {
        // Battery icon
        if (fields.settings.batteryIconEnabled) {
          drew++
          img.src = `preview/bat_icon${fields.icons.batteryIco}.png`
          while (!this.isTmpLoaded) {
            await delay(100)
          }
          this.isTmpLoaded = false
          // Battery icon doesn't actually get colored
          // So we draw it before the rest
          ctx.drawImage(img, 0, 0, canvas4.width, topPad)
        }
        // Battery percentage
        if (fields.settings.batteryPercentageEnabled) {
          drew++
          img.src = 'preview/bat_percent.png'
          while (!this.isTmpLoaded) {
            await delay(100)
          }
          this.isTmpLoaded = false
          ctx4.drawImage(img, 0, 0, canvas4.width, topPad)
        }
        // Clock shenanigans
        if (fields.settings.clockEnabled) {
          drew++
          if (fields.settings.centeredClockEnabled) {
            img.src = 'preview/center_time.png'
          } else {
            img.src = 'preview/left_time.png'
          }
          while (!this.isTmpLoaded) {
            await delay(100)
          }
          this.isTmpLoaded = false
          ctx4.drawImage(img, 0, 0, canvas4.width, topPad)
        }
        // CPU temp
        if (fields.settings.cpuTempEnabled) {
          drew++
          if (fields.settings.clockEnabled && !fields.settings.centeredClockEnabled) {
            img.src = 'preview/center_temp.png'
          } else {
            img.src = 'preview/left_temp.png'
          }

          while (!this.isTmpLoaded) {
            await delay(100)
          }
          this.isTmpLoaded = false
          ctx4.drawImage(img, 0, 0, canvas4.width, topPad)
        }
      }
      // If we drew anything
      if (drew > 0) {
        ctx5.fillStyle = fields.normal.sTextColor.input
        ctx5.fillRect(0, 0, canvas4.width, canvas4.height)
        ctx5.globalCompositeOperation = 'destination-in'
        ctx5.drawImage(canvas4, 0, 0)
        ctx.drawImage(canvas5, 0, 0)
      }
      // Dashboard sub text color
      // If not custom and background light use black else the opossite
      if (fields.settings.dashboardTextColorEnabled) {
        ctx6.fillStyle = fields.dashboardText.input
      } else if (isDark(fields.normal.bgColor.input) === 1) {
        ctx6.fillStyle = '#ffffff'
      } else {
        ctx6.fillStyle = '#000000'
      }
      ctx6.fillRect(0, 0, canvas2.width, canvas2.height)
      ctx6.globalCompositeOperation = 'destination-in'
      img.src = 'preview/dash_text.png'
      while (!this.isTmpLoaded) {
        await delay(100)
      }
      ctx6.drawImage(img, 0, 30, canvas.width, canvas.height)
      ctx.drawImage(canvas6, 0, 0)
      this.isTmpLoaded = false
      // Icon background if enabled
      if (fields.settings.dashboardSubTintEnabled) {
        img.src = `preview/db${fields.icons.dBgType}.png`
        while (!this.isTmpLoaded) {
          await delay(100)
        }
        canvas9.width = img.width
        canvas9.height = img.height
        ctx9.fillStyle = fields.dashboardIcoBg.input
        ctx9.fillRect(0, 0, img.width, img.height)
        ctx9.globalCompositeOperation = 'destination-in'
        ctx9.drawImage(img, 0, 0, img.width, img.height)
        ctx.drawImage(canvas9, 40, 210, 80, 80)
        this.isTmpLoaded = false
      }
      // Dashboard icon, just flash
      img.src = `preview/c_dashboard_flash${fields.icons.dIco}.png`
      while (!this.isTmpLoaded) {
        await delay(100)
      }
      canvas7.width = img.width
      canvas7.height = img.height
      ctx7.drawImage(img, 0, 0)
      ctx7.globalCompositeOperation = 'source-in'
      let filling = fields.dnIcoColors.dIcoColor.input
      if (fields.extra.gradient.enabled && filling !== 'transparent') {
        const slope = gradientSlope(fields.extra.gradient.type, img.width, img.height)
        const grd = ctx7.createLinearGradient(slope[0], slope[1], slope[2], slope[3])
        grd.addColorStop(0, fields.dnIcoColors.dIcoColor.input)
        grd.addColorStop(1, fields.random.dIcoColor2.input)
        filling = grd
      }
      if (fields.dnIcoColors.dIcoColor.input !== 'transparent') {
        ctx7.fillStyle = filling
        ctx7.fillRect(0, 0, img.width, img.height)
      }
      this.isTmpLoaded = false
      ctx.drawImage(canvas7, 40, 210, 80, 80)
      ctx0.drawImage(canvas, 0, 0)
      // Try to clean and delete everything
      // To avoid memory leaks and overwrites
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx2.clearRect(0, 0, canvas2.width, canvas2.height)
      ctx3.clearRect(0, 0, canvas3.width, canvas3.height)
      ctx4.clearRect(0, 0, canvas4.width, canvas4.height)
      ctx5.clearRect(0, 0, canvas5.width, canvas5.height)
      ctx6.clearRect(0, 0, canvas6.width, canvas6.height)
      ctx7.clearRect(0, 0, canvas7.width, canvas7.height)
      ctx8.clearRect(0, 0, canvas8.width, canvas8.height)
      ctx9.clearRect(0, 0, canvas9.width, canvas9.height)
      canvas.remove()
      canvas2.remove()
      canvas3.remove()
      canvas4.remove()
      canvas5.remove()
      canvas6.remove()
      canvas7.remove()
      canvas8.remove()
      canvas9.remove()
    }
  }
}
</script>
<style lang="css" scoped>
/* Disable canvas anti-alias */
/* #d {
    image-rendering: optimizeSpeed;
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: -o-crisp-edges;
    image-rendering: optimize-contrast;
    -ms-interpolation-mode: nearest-neighbor;
} */
</style>
