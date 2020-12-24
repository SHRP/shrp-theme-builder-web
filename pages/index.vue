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
          <Form @submit="submit" />
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
    </v-col>
  </v-row>
</template>

<script>
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

import files from '~/assets/files.json'
import Form from '~/components/Form.vue'
import Logo from '~/components/Logo.vue'

import { gradientSlope, getCanvasBlob, getRandom, delay, generateFolderJson, countFiles, generateStProp, getThemeConfig, progressCalc, generateNavBarColor, getSubBg, aspectRatio } from '~/assets/helpers.js'

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
    genInfo: {},
    status: '',
    ready: false,
    sub: true,
    progress: 0,
    last: 0,
    headline: 'Welcome to the SHRP Theme Builder!',
    subline: 'Play with the setting below and click "Generate" when ready!'
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
        navbarColor: generateNavBarColor(fields.normal.accColor.input),
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

      const randomColors = [fields.normal.dIcoColor1.input]
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
      document.getElementById('toBeDisabled').style.display = enable ? 'none' : 'block'
      // document.getElementById('liveview').style.display = enable ? 'block' : 'none'
      document.getElementById('mainForm').style.display = enable ? 'none' : 'block'
      document.getElementById('finalMsgCard').style.display = enable ? 'block' : 'none'

      this.subline = enable ? 'Please wait until your theme gets built...' : 'Play with the setting below and click "Generate" when ready!'
    },
    onImgLoad () {
      this.isLoaded = true
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
    }
  }
}
</script>
