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
              :rules="nameRules"
              :label="value.name"
              :v-model="value.input"
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
              v-for="type in randomType"
              :key="type"
              :label="type.toString()"
              :value="type"
            />
          </v-radio-group>
        </v-col>
        <v-col
          v-for="(value, key, i) in fields.random"
          :key="key"
          cols="12"
          md="4"
          class="mb-0"
        >
          <v-text-field
            v-show="i + 1 >= 3 ? fields.extra.random.type === 6 : true"
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
            <v-tooltip v-for="(type, key) in gradientType" :key="key" bottom>
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
              v-for="type in gradientAccent"
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
              v-for="(style, i) in dIco"
              :key="style"
              :label="style"
              :value="i+1"
            />
          </v-radio-group>
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
              v-for="(style, i) in nIco"
              :key="style"
              :label="style"
              :value="i+1"
            />
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
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

export default {
  data: () => ({
    tempMenu: false,
    dIco: ['Default', 'Material', 'Plain', 'Plain Large'],
    nIco: ['Pie', 'Nxt-Bit', 'Samsung', 'Custom'],
    gradientType: {
      LR: 'Left to Right',
      TB: 'Top to Bottom',
      TRBL: 'Top-Right to Bottom-Left',
      TLBR: 'Top-Left to Bottom-Right'
    },
    randomType: [3, 6],
    gradientAccent: ['Primary', 'Secondary'],
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
      extra: {
        gradient: {
          enabled: false,
          type: 'LR',
          accent: 'primary'
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
        nIco: 1
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
          input: '#FFFFFF',
          menu: false
        },
        accColor: {
          type: 'color',
          name: 'Accent Color',
          input: '#FFFFFF',
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
          input: '#FFFFFF',
          menu: false
        },
        dIcoColor1: {
          type: 'color',
          name: 'Dashboard Icon Color',
          input: '#FFFFFF',
          menu: false,
          notAProp: true
        }
      }
    }
  })
}
</script>
