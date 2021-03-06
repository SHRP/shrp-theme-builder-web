<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-container>
      <v-row class="px-3 pt-0">
        <v-col v-for="(value, key) in fields.extra" :key="key" cols="6">
          <v-switch
            v-model="value.enabled"
            inset
            class="mt-0 pt-0"
            :label="key.charAt(0).toUpperCase() + key.slice(1)"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="(value, key) in fields.normal"
          :key="key"
          cols="12"
          md="4"
        >
          <div v-if="value.type === 'color'">
            <v-text-field
              v-model="value.input"
              :value="value.input"
              :label="value.name"
              :rules="colorRules"
              outlined
              required
              readonly
            >
              <template #append>
                <v-menu v-model="value.menu" top nudge-bottom="100" nudge-left="16" :close-on-content-click="false">
                  <template #activator="{ on }">
                    <v-btn
                      small
                      icon
                      class="mt-0"
                      v-on="on"
                    >
                      <v-icon dark>
                        mdi-format-color-fill
                      </v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-text class="pa-0">
                      <v-color-picker
                        v-model="value.input"
                        dot-size="20"
                        hide-mode-switch
                        mode="hexa"
                        value="#FFFFFF"
                      />
                    </v-card-text>
                  </v-card>
                </v-menu>
              </template>
            </v-text-field>
          </div>
          <div v-else>
            <v-text-field
              v-model="value.input"
              :rules="nameRules"
              :label="value.name"
              :value="value.input"
              outlined
              required
            />
          </div>
        </v-col>
      </v-row>
      <v-divider v-show="fields.extra.random.enabled" class="mx-4" />
      <v-row v-show="fields.extra.random.enabled">
        <v-col cols="12">
          <v-radio-group
            v-model="fields.extra.random.type"
            mandatory
            label="Random Colors"
            class="mt-4"
            row
            hide-details
          >
            <v-radio
              v-for="type in formInfo.randomType"
              :key="type"
              :label="type.toString()"
              :value="type"
            />
          </v-radio-group>
        </v-col>
        <v-col
          v-for="(value, key, i) in fields.random"
          v-show="i + 1 >= 3 ? fields.extra.random.type === 6 : true"
          :key="key"
          cols="12"
          md="4"
          class="mb-0"
        >
          <v-text-field
            v-model="value.input"
            :value="value.input"
            :label="value.name"
            :rules="colorRules"
            outlined
            required
            hide-details
            readonly
            class="my-4"
          >
            <template #append>
              <v-menu v-model="value.menu" top nudge-bottom="100" nudge-left="16" :close-on-content-click="false">
                <template #activator="{ on }">
                  <v-btn
                    small
                    icon
                    class="mt-0"
                    v-on="on"
                  >
                    <v-icon dark>
                      mdi-format-color-fill
                    </v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-text class="pa-0">
                    <v-color-picker
                      v-model="value.input"
                      dot-size="20"
                      hide-mode-switch
                      mode="hexa"
                      value="#FFFFFF"
                    />
                  </v-card-text>
                </v-card>
              </v-menu>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-divider v-show="fields.extra.gradient.enabled" class="mx-4" />
      <v-row v-show="fields.extra.gradient.enabled">
        <v-col cols="12">
          <v-radio-group
            v-model="fields.extra.gradient.type"
            mandatory
            label="Gradient Type"
            class="mt-4"
            row
            hide-details
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
          </v-radio-group>
          <v-radio-group
            v-model="fields.extra.gradient.accent"
            mandatory
            label="Main Accent"
            class="mt-4"
            row
            hide-details
          >
            <v-radio
              v-for="type in formInfo.gradientAccent"
              :key="type"
              :label="type"
              :value="type.toLowerCase()"
            />
          </v-radio-group>
        </v-col>
        <v-col
          v-for="(value, i) in [fields.gradient.accColor2, fields.random.dIcoColor2]"
          :key="i"
          cols="12"
          md="4"
          class="mb-0"
        >
          <v-text-field
            v-model="value.input"
            :value="value.input"
            :label="value.name"
            :rules="colorRules"
            outlined
            required
            hide-details
            readonly
            class="my-4"
          >
            <template #append>
              <v-menu :v-model="i === 0 ? value.menu : tempMenu" top nudge-bottom="100" nudge-left="16" :close-on-content-click="false">
                <template #activator="{ on }">
                  <v-btn
                    small
                    icon
                    class="mt-0"
                    v-on="on"
                  >
                    <v-icon dark>
                      mdi-format-color-fill
                    </v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-text class="pa-0">
                    <v-color-picker
                      v-model="value.input"
                      dot-size="20"
                      hide-mode-switch
                      mode="hexa"
                      value="#FFFFFF"
                    />
                  </v-card-text>
                </v-card>
              </v-menu>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-divider class="mx-4" />
      <v-row class="pa-3">
        <v-col
          cols="12"
          md="5"
        >
          <v-radio-group
            v-model="fields.icons.dIco"
            mandatory
            label="Dashboard Icon Style"
            class="mt-0"
          >
            <v-radio
              v-for="(style, i) in formInfo.dIco"
              :key="style"
              :label="style"
              :value="i+1"
            />
          </v-radio-group>
          <div>
            <v-text-field
              v-model="fields.dnIcoColors.dIcoColor.input"
              :value="fields.dnIcoColors.dIcoColor.input"
              :label="fields.dnIcoColors.dIcoColor.name"
              :rules="colorRules"
              outlined
              required
              readonly
            >
              <template #append>
                <v-menu v-model="fields.dnIcoColors.dIcoColor.menu" top nudge-bottom="100" nudge-left="16" :close-on-content-click="false">
                  <template #activator="{ on }">
                    <v-btn
                      small
                      icon
                      class="mt-0"
                      v-on="on"
                    >
                      <v-icon dark>
                        mdi-format-color-fill
                      </v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-text class="pa-0">
                      <v-color-picker
                        v-model="fields.dnIcoColors.dIcoColor.input"
                        dot-size="20"
                        hide-mode-switch
                        mode="hexa"
                        value="#FFFFFF"
                      />
                    </v-card-text>
                  </v-card>
                </v-menu>
              </template>
            </v-text-field>
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
          <v-radio-group
            v-model="fields.icons.nIco"
            mandatory
            label="Nav-Bar Icon Style"
            class="mt-0"
          >
            <v-radio
              v-for="(style, i) in formInfo.nIco"
              :key="style"
              :label="style"
              :value="i+1"
            />
          </v-radio-group>
          <div>
            <v-text-field
              v-model="fields.dnIcoColors.nIcoColor.input"
              :value="fields.dnIcoColors.nIcoColor.input"
              :label="fields.dnIcoColors.nIcoColor.name"
              :rules="colorRules"
              outlined
              required
              readonly
            >
              <template #append>
                <v-menu v-model="fields.dnIcoColors.nIcoColor.menu" top nudge-bottom="100" nudge-left="16" :close-on-content-click="false">
                  <template #activator="{ on }">
                    <v-btn
                      small
                      icon
                      class="mt-0"
                      v-on="on"
                    >
                      <v-icon dark>
                        mdi-format-color-fill
                      </v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-text class="pa-0">
                      <v-color-picker
                        v-model="fields.dnIcoColors.nIcoColor.input"
                        dot-size="20"
                        hide-mode-switch
                        mode="hexa"
                        value="#FFFFFF"
                      />
                    </v-card-text>
                  </v-card>
                </v-menu>
              </template>
            </v-text-field>
          </div>
        </v-col>
      </v-row>

      <v-divider class="mx-4" />
      <v-row class="pa-3">
        <v-col
          cols="12"
          md="5"
        >
          <v-checkbox v-model="fields.settings.dashboardTextColorEnabled" label="Custom Dashboard Text Color" />
          <div v-if="fields.settings.dashboardTextColorEnabled">
            <v-text-field
              v-model="fields.dashboardText.input"
              :value="fields.dashboardText.input"
              :label="fields.dashboardText.name"
              :rules="colorRules"
              outlined
              required
              readonly
            >
              <template #append>
                <v-menu v-model="fields.dashboardText.menu" top nudge-bottom="100" nudge-left="16" :close-on-content-click="false">
                  <template #activator="{ on }">
                    <v-btn
                      small
                      icon
                      class="mt-0"
                      v-on="on"
                    >
                      <v-icon dark>
                        mdi-format-color-fill
                      </v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-text class="pa-0">
                      <v-color-picker
                        v-model="fields.dashboardText.input"
                        dot-size="20"
                        hide-mode-switch
                        mode="hexa"
                        value="#FFFFFF"
                      />
                    </v-card-text>
                  </v-card>
                </v-menu>
              </template>
            </v-text-field>
          </div>
          <v-checkbox v-model="fields.settings.dashboardSubTintEnabled" label="Dashboard Icon Background" />
          <div v-if="fields.settings.dashboardSubTintEnabled">
            <v-text-field
              v-model="fields.dashboardIcoBg.input"
              :value="fields.dashboardIcoBg.input"
              :label="fields.dashboardIcoBg.name"
              :rules="colorRules"
              outlined
              required
              readonly
            >
              <template #append>
                <v-menu v-model="fields.dashboardIcoBg.menu" top nudge-bottom="100" nudge-left="16" :close-on-content-click="false">
                  <template #activator="{ on }">
                    <v-btn
                      small
                      icon
                      class="mt-0"
                      v-on="on"
                    >
                      <v-icon dark>
                        mdi-format-color-fill
                      </v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-text class="pa-0">
                      <v-color-picker
                        v-model="fields.dashboardIcoBg.input"
                        dot-size="20"
                        hide-mode-switch
                        mode="hexa"
                        value="#FFFFFF"
                      />
                    </v-card-text>
                  </v-card>
                </v-menu>
              </template>
            </v-text-field>
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
          <v-radio-group
            v-if="fields.settings.dashboardSubTintEnabled"
            v-model="fields.icons.dBgType"
            mandatory
            label="Dashboard icon background style"
            class="mt-0"
          >
            <v-radio
              v-for="(style, i) in formInfo.dBgType"
              :key="style"
              :label="style"
              :value="i+1"
            />
          </v-radio-group>
        </v-col>
      </v-row>
      <v-divider class="mx-4" />
      <v-row class="pa-3">
        <v-col md="5">
          <v-checkbox v-model="fields.settings.statusBarEnabled" label="Status Bar" />
          <v-checkbox v-show="fields.settings.statusBarEnabled" v-model="fields.settings.batteryIconEnabled" label="Show Bettery Icon" />
          <v-radio-group
            v-if="fields.settings.batteryIconEnabled"
            v-model="fields.icons.batteryIco"
            mandatory
            label="Battery Icon Style"
            class="mt-0"
          >
            <v-radio
              v-for="(style, i) in formInfo.batteryIco"
              :key="style"
              :label="style"
              :value="i+1"
            />
          </v-radio-group>
          <v-checkbox v-show="fields.settings.statusBarEnabled" v-model="fields.settings.batteryPercentageEnabled" label="Show Battery Percentage" />
          <v-checkbox v-show="fields.settings.statusBarEnabled" v-model="fields.settings.clockEnabled" label="Show Clock" />
          <v-checkbox v-show="fields.settings.statusBarEnabled && fields.settings.clockEnabled" v-model="fields.settings.centeredClockEnabled" label="Centered Clock" />
          <v-checkbox v-show="fields.settings.statusBarEnabled" v-model="fields.settings.cpuTempEnabled" label="Show CPU Temp" />
        </v-col>
        <v-col
          cols="2"
          class="d-none d-md-flex"
          style="justify-content: center;"
        >
          <v-divider vertical class="my-0" />
        </v-col>
        <v-col md="5">
          <v-checkbox v-model="fields.settings.batteryBarEnabled" label="Show Battery Bar" />
          <v-checkbox v-model="fields.settings.roundedCornerEnabled" label="Rounded Corners" />
          <v-checkbox v-model="fields.settings.navbarBackgroundEnabled" label="Nav-Bar Background" />
          <v-checkbox v-model="fields.settings.dashboardTextColorEnabled" label="Dashboard Text Color" />
          <v-checkbox v-show="fields.settings.dashboardTextColorEnabled" v-model="fields.settings.dashboardSubTintEnabled" label="Dashboard Icon BG" />
        </v-col>
      </v-row>
      <v-divider class="mx-4" />
      <v-row class="pa-3" justify="center">
        <v-col cols="12" md="6" class="pt-4">
          <v-switch
            v-model="fields.splash.custom"
            inset
            hide-details
            class="ma-0 pa-0"
            label="Custom Splash Logo"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-file-input
            v-show="fields.splash.custom"
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

export default {
  data: () => ({
    formInfo,
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
