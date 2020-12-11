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

import { gradientSlope, getCanvasBlob, getRandom, delay, generateFolderJson, countFiles, generateStProp, progressCalc } from '~/assets/helpers.js'

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
    status: '',
    ready: false,
    sub: true,
    progress: 0,
    last: 0
  }),
  methods: {
    async submit (fields) {
      this.status = 'Getting ready'
      zip.remove('res')
      zip.remove('st.prop')
      this.toggleViews()

      this.ready = true
      this.progress = 0
      this.last = 0

      const totalFiles = countFiles(files)
      const stProp = generateStProp(fields.normal, fields.extra.gradient.enabled, fields.extra.gradient.accent, fields.gradient.accColor2.input)
      this.genInfo = stProp[1]
      zip.file('st.prop', stProp[0])

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
      this.status = 'Creating theme'
      zip.generateAsync({ type: 'blob' }).then(function (content) {
        // Replace spaces with underscores & change mime type
        saveAs(content.slice(0, content.size, 'application/stheme'), fields.normal.themeName.input.split(' ').join('_') + '.stheme')
      })
      this.progress = 100
      this.status = 'Thanks for using SHRP!'
      this.sub = false
      this.toggleViews(false)
    },
    toggleViews (enable = true) {
      document.getElementById('toBeDisabled').disabled = enable
      document.getElementById('toBeDisabled').style.display = enable ? 'none' : 'block'
      document.getElementById('liveview').style.display = enable ? 'block' : 'none'
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
      if (gradient) {
        const slope = gradientSlope(gradientType, img.width, img.height)
        const grd = ctx.createLinearGradient(slope[0], slope[1], slope[2], slope[3])
        grd.addColorStop(0, color)
        grd.addColorStop(1, color2)
        filling = grd
      }
      ctx.fillStyle = filling
      ctx.fillRect(0, 0, img.width, img.height)
      return await getCanvasBlob(canvas)
    }
  }
}
</script>
