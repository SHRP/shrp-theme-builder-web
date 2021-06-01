<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-container>
      <v-row class="px-3 pt-0">
        <v-col v-for="(value, key) in defaultState.extra" :key="key" cols="6">
          <FormSwitch :category="'extra'" :parent="key" :child="'enabled'" :classes="'mt-0 pt-0'" />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="(value, key) in defaultState.normal"
          :key="key"
          cols="12"
          md="4"
        >
          <div v-if="value.type === 'color'">
            <FormColorPicker :category="'normal'" :parent="key" :child="'input'" :text-child="'menu'" />
          </div>
          <div v-else>
            <FormTextField :category="'normal'" :parent="key" :child="'input'" />
          </div>
        </v-col>
      </v-row>
      <v-divider v-show="$store.getters.get('extra.random', 'enabled')" class="mx-4" />
      <v-row v-show="$store.getters.get('extra.random', 'enabled')">
        <v-col cols="12">
          <FormRadioGroup
            :category="'extra'"
            :parent="'random'"
            :child="'type'"
            :should-be-row="true"
            :should-be-mandatory="true"
            :should-hide-details="true"
            :classes="'mt-4'"
            :custom-label="'Random Colors'"
          >
            <v-radio
              v-for="type in formInfo.randomType"
              :key="type"
              :label="type.toString()"
              :value="type"
            />
          </FormRadioGroup>
        </v-col>
        <v-col
          v-for="(value, key, i) in defaultState.random"
          v-show="i + 1 >= 3 ? defaultState.extra.random.type === 6 : true"
          :key="key"
          cols="12"
          md="4"
          class="mb-0"
        >
          <FormColorPicker
            :category="'random'"
            :parent="key"
            :child="'input'"
            :text-child="'menu'"
            :classes="'my-4'"
          />
        </v-col>
      </v-row>
      <v-divider v-show="$store.getters.get('extra.gradient', 'enabled')" class="mx-4" />
      <v-row v-show="$store.getters.get('extra.gradient', 'enabled')">
        <v-col cols="12">
          <FormRadioGroup
            :category="'extra'"
            :parent="'gradient'"
            :child="'type'"
            :should-be-row="true"
            :should-be-mandatory="true"
            :should-hide-details="true"
            :classes="'mt-4'"
            :custom-label="'Gradient Type'"
          >
            <v-tooltip v-for="(type, key) in formInfo.gradientType" :key="key" bottom>
              <template #activator="{ on, attrs }">
                <v-radio
                  :label="key"
                  :value="key"
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <span>{{ type }}</span>
            </v-tooltip>
          </FormRadioGroup>
          <FormRadioGroup
            :category="'extra'"
            :parent="'gradient'"
            :child="'accent'"
            :should-be-row="true"
            :should-be-mandatory="true"
            :should-hide-details="true"
            :classes="'mt-4'"
            :custom-label="'Main Accent'"
          >
            <v-radio
              v-for="type in formInfo.gradientAccent"
              :key="type"
              :label="type"
              :value="type.toLowerCase()"
            />
          </FormRadioGroup>
        </v-col>
        <v-col
          v-for="(value, i) in [defaultState.gradient.accColor2, defaultState.random.dIcoColor2]"
          :key="i"
          cols="12"
          md="4"
          class="mb-0"
        >
          <FormColorPicker
            :classes="'my-4'"
            :category="i === 0 ? 'gradient' : 'random'"
            :parent="i === 0 ? 'accColor2' : 'dIcoColor2'"
            :child="'input'"
            :text-child="'menu'"
            :pseudo="i === 0 ? false : true"
          />
        </v-col>
      </v-row>
      <v-divider class="mx-4" />
      <v-row class="pa-3">
        <v-col
          cols="12"
          md="5"
        >
          <FormRadioGroup
            :category="'icons'"
            :child="'dIco'"
            :should-be-mandatory="true"
            :classes="'mt-0'"
            :custom-label="'Dashboard Icon Style'"
          >
            <v-radio
              v-for="(style, i) in formInfo.dIco"
              :key="style"
              :label="style"
              :value="i+1"
            />
          </FormRadioGroup>
          <div>
            <FormColorPicker
              :category="'dnIcoColors'"
              :parent="'dIcoColor'"
              :child="'input'"
              :text-child="'menu'"
            />
          </div>
        </v-col>
        <v-col
          cols="2"
          class="d-none d-md-flex"
          style="justify-content: center;"
        >
          <v-divider vertical class="my-0" />
        </v-col>
        <v-col
          cols="12"
          md="5"
        >
          <FormRadioGroup
            :category="'icons'"
            :child="'nIco'"
            :should-be-mandatory="true"
            :classes="'mt-0'"
            :custom-label="'Nav-Bar Icon Style'"
          >
            <v-radio
              v-for="(style, i) in formInfo.nIco"
              :key="style"
              :label="style"
              :value="i+1"
            />
          </FormRadioGroup>
          <div>
            <FormColorPicker
              :category="'dnIcoColors'"
              :parent="'nIcoColor'"
              :child="'input'"
              :text-child="'menu'"
            />
          </div>
        </v-col>
      </v-row>

      <v-divider class="mx-4" />
      <v-row class="pa-3">
        <v-col
          cols="12"
          md="5"
        >
          <FormCheckbox :category="'settings'" :child="'dashboardTextColorEnabled'" :custom-label="'Custom Dashboard Text Color'" />
          <div v-if="defaultState.settings.dashboardTextColorEnabled">
            <FormColorPicker
              :category="'dashboardText'"
              :child="'input'"
              :text-child="'menu'"
            />
          </div>
          <FormCheckbox :category="'settings'" :child="'dashboardSubTintEnabled'" :custom-label="'Dashboard Icon Background'" />
          <div v-if="defaultState.settings.dashboardSubTintEnabled">
            <FormColorPicker
              :category="'dashboardIcoBg'"
              :child="'input'"
              :text-child="'menu'"
            />
          </div>
        </v-col>
        <v-col
          cols="2"
          class="d-none d-md-flex"
          style="justify-content: center;"
        >
          <v-divider vertical class="my-0" />
        </v-col>

        <v-col
          cols="12"
          md="5"
        >
          <FormRadioGroup
            v-if="$store.getters.get('settings', 'dashboardSubTintEnabled')"
            :category="'icons'"
            :child="'dBgType'"
            :should-be-mandatory="true"
            :classes="'mt-0'"
            :custom-label="'Dashboard icon background style'"
          >
            <v-radio
              v-for="(style, i) in formInfo.dBgType"
              :key="style"
              :label="style"
              :value="i+1"
            />
          </FormRadioGroup>
        </v-col>
      </v-row>
      <v-divider class="mx-4" />
      <v-row class="pa-3">
        <v-col md="5">
          <FormCheckbox :category="'settings'" :child="'statusBarEnabled'" :custom-label="'Status Bar'" />
          <FormCheckbox v-show="$store.getters.get('settings', 'statusBarEnabled')" :category="'settings'" :child="'batteryIconEnabled'" :custom-label="'Show Bettery Icon'" />
          <FormRadioGroup
            v-if="$store.getters.get('settings', 'batteryIconEnabled')"
            :category="'icons'"
            :child="'batteryIco'"
            :should-be-mandatory="true"
            :classes="'mt-0'"
            :custom-label="'Battery Icon Style'"
          >
            <v-radio
              v-for="(style, i) in formInfo.batteryIco"
              :key="style"
              :label="style"
              :value="i+1"
            />
          </FormRadioGroup>
          <FormCheckbox v-show="$store.getters.get('settings', 'statusBarEnabled')" :category="'settings'" :child="'batteryPercentageEnabled'" :custom-label="'Show Battery Percentage'" />
          <FormCheckbox v-show="$store.getters.get('settings', 'statusBarEnabled')" :category="'settings'" :child="'clockEnabled'" :custom-label="'Show Clock'" />
          <FormCheckbox v-show="$store.getters.get('settings', 'statusBarEnabled') && $store.getters.get('settings', 'clockEnabled')" :category="'settings'" :child="'centeredClockEnabled'" :custom-label="'Centered Clock'" />
          <FormCheckbox v-show="$store.getters.get('settings', 'statusBarEnabled')" :category="'settings'" :child="'cpuTempEnabled'" :custom-label="'Show CPU Temp'" />
        </v-col>
        <v-col
          cols="2"
          class="d-none d-md-flex"
          style="justify-content: center;"
        >
          <v-divider vertical class="my-0" />
        </v-col>
        <v-col md="5">
          <FormCheckbox :category="'settings'" :child="'batteryBarEnabled'" :custom-label="'Show Battery Bar'" />
          <FormCheckbox :category="'settings'" :child="'roundedCornerEnabled'" :custom-label="'Rounded Corners'" />
          <FormCheckbox :category="'settings'" :child="'navbarBackgroundEnabled'" :custom-label="'Nav-Bar Background'" />
          <FormCheckbox :category="'settings'" :child="'dashboardTextColorEnabled'" :custom-label="'Dashboard Text Color'" />
          <FormCheckbox v-show="$store.getters.get('settings', 'dashboardTextColorEnabled')" :category="'settings'" :child="'dashboardSubTintEnabled'" :custom-label="'Dashboard Icon BG'" />
        </v-col>
      </v-row>
      <v-divider class="mx-4" />
      <v-row class="pa-3" justify="center">
        <v-col cols="12" md="6" class="pt-4">
          <FormSwitch :category="'splash'" :child="'custom'" :custom-label="'Custom Splash Logo'" :classes="'ma-0 pa-0'" :should-hide-details="true" />
        </v-col>
        <v-col cols="12" md="6">
          <v-file-input
            v-show="$store.getters.get('splash', 'custom')"
            v-model="fields.splash.info"
            accept="image/png"
            label="Splash Logo"
            show-size
            outlined
            dense
            :error="shouldError"
            :error-messages="inputErrors"
            @change="relative_url"
          />
        </v-col>
      </v-row>
      <v-row justify="center" align="center">
        <v-col
          cols="12"
        >
          <v-btn
            color="#21CEF5"
            style="color: #000"
            @click="$emit('reconstruct', fields)"
          >
            Refresh Preview
          </v-btn>
          <v-btn
            id="toBeDisabled"
            :disabled="!valid"
            color="#21CEF5"
            style="color: #000"
            @click="$emit('submit', fields)"
          >
            Generate
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import formInfo from '~/assets/formInfo.json'
import defaultState from '~/assets/defaultState.json'

import FormSwitch from '~/components/FormComponents/FormSwitch'
import FormColorPicker from '~/components/FormComponents/FormColorPicker'
import FormTextField from '~/components/FormComponents/FormTextField'
import FormRadioGroup from '~/components/FormComponents/FormRadioGroup'
import FormCheckbox from '~/components/FormComponents/FormCheckbox'

export default {
  components: {
    FormSwitch,
    FormColorPicker,
    FormTextField,
    FormRadioGroup,
    FormCheckbox
  },
  data: () => ({
    formInfo,
    defaultState,
    shouldError: false,
    inputErrors: [],
    tempMenu: false,
    valid: false,
    nameRules: [
      v => !!v || 'Name is required'
    ],
    colorRules: [
      v => !!v || 'Color is required',
      v => v.length !== 8 || 'Color must be 7 or 9 characters',
      v => /^#[0-9a-fA-F]{6,8}$/.test(v) || 'Color must be in a hex format'
    ],
    fields: {
      splash: {
        blob: null,
        info: null,
        custom: false
      },
      extra: {
        gradient: {
          enabled: false,
          type: 'LR',
          accent: 'Primary'
        },
        random: {
          enabled: false,
          type: 3
        }
      },
      gradient: {
        accColor2: {
          type: 'color',
          name: 'Secondary Accent Color',
          input: '#FFFFFF',
          menu: false
        }
      },
      random: {
        dIcoColor2: {
          type: 'color',
          name: '#2 Dashboard Icon Color',
          input: '#FFFFFF',
          menu: false
        },
        dIcoColor3: {
          type: 'color',
          name: '#3 Dashboard Icon Color',
          input: '#FFFFFF',
          menu: false
        },
        dIcoColor4: {
          type: 'color',
          name: '#4 Dashboard Icon Color',
          input: '#FFFFFF',
          menu: false
        },
        dIcoColor5: {
          type: 'color',
          name: '#5 Dashboard Icon Color',
          input: '#FFFFFF',
          menu: false
        },
        dIcoColor6: {
          type: 'color',
          name: '#6 Dashboard Icon Color',
          input: '#FFFFFF',
          menu: false
        }
      },
      icons: {
        dIco: 1,
        dBgType: 1,
        nIco: 1,
        batteryIco: 1
      },
      dnIcoColors: {
        dIcoColor: {
          type: 'color',
          name: 'Dashboard Icon Color',
          input: '#FF8100',
          menu: false,
          notAProp: true
        },
        nIcoColor: {
          type: 'color',
          name: 'Navbar Icon Color',
          input: '#FF00AC',
          menu: false,
          notAProp: true
        }
      },
      normal: {
        themeName: {
          type: 'text',
          name: 'Theme Name',
          input: 'My Theme'
        },
        bgColor: {
          type: 'color',
          name: 'Background Color',
          input: '#22004B',
          menu: false
        },
        accColor: {
          type: 'color',
          name: 'Accent Color',
          input: '#00FF70',
          menu: false
        },
        textColor: {
          type: 'color',
          name: 'Text Color',
          input: '#FFFFFF',
          menu: false
        },
        sTextColor: {
          type: 'color',
          name: 'Secondary Text Color',
          input: '#FFEC00',
          menu: false
        }
      },
      dashboardText: {
        type: 'color',
        name: 'Dashboard Text Color',
        input: '#FFFA00',
        menu: false
      },
      dashboardIcoBg: {
        type: 'color',
        name: 'Dashboard Icon Background Color',
        input: '#FFFFFF',
        menu: false
      },
      settings: {
        batteryBarEnabled: false,
        statusBarEnabled: false,
        batteryIconEnabled: false,
        batteryPercentageEnabled: false,
        clockEnabled: false,
        centeredClockEnabled: false,
        cpuTempEnabled: false,
        roundedCornerEnabled: false,
        navbarBackgroundEnabled: false,
        dashboardSubTintEnabled: false,
        dashboardTextColorEnabled: false
      }
    }
  }),
  created () {
    // To be fired when form gets created
    // interval was used for when it as auto updating

    // this.interval = setInterval(() => this.$emit('fields-changed', this.fields), 1000)
    this.$emit('reconstruct', this.fields)
  },
  // Watch was used for real time auto updating
  // watch: {
  //   fields: {
  //     handler (newFields) {
  //       this.$emit('fields-changed', newFields)
  //     },
  //     deep: true
  //   }
  // },
  methods: {
    relative_url (rert) {
      const image = this.fields.splash.info
      if (!image || typeof rert === 'undefined') {
        this.fields.splash.info = null
        this.fields.splash.blob = null
        this.fields.splash.custom = false
        this.shouldError = false
        this.inputErrors = []
        return
      } else if (rert.type !== 'image/png') {
        this.shouldError = true
        this.inputErrors.push('Only PNG allowed')
        return
      }
      this.inputErrors = []
      this.shouldError = false
      this.fields.splash.blob = URL.createObjectURL(image)
    }
  }
}
</script>
