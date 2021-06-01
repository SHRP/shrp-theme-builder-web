<template>
  <v-text-field
    v-model="inputModel"
    :value="$store.getters.get(fullPath, 'input')"
    :label="$store.getters.get(fullPath, 'name')"
    :rules="colorRules"
    outlined
    required
    readonly
    :hide-details="shouldHideDetails"
    :classes="classes"
  >
    <template #append>
      <v-menu
        :v-model="pseudo ? tempMenu : textModel"
        top
        nudge-bottom="100"
        nudge-left="16"
        :close-on-content-click="false"
      >
        <template #activator="{ on }">
          <v-btn small icon class="mt-0" v-on="on">
            <v-icon dark>
              mdi-format-color-fill
            </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-text class="pa-0">
            <v-color-picker
              v-model="inputModel"
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
</template>

<script>
export default {
  name: 'FormSwitch',
  props: {
    parent: {
      type: String,
      default: null
    },
    child: {
      type: String,
      required: true
    },
    textChild: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    classes: {
      type: String,
      default: ''
    },
    shouldHideDetails: {
      type: Boolean,
      default: false
    },
    pseudo: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tempMenu: false,
      fullPath: this.category + (this.parent ? '.' + this.parent : ''),
      colorRules: [
        v => !!v || 'Color is required',
        v => v.length !== 8 || 'Color must be 7 or 9 characters',
        v => /^#[0-9a-fA-F]{6,8}$/.test(v) || 'Color must be in a hex format'
      ]
    }
  },
  computed: {
    textModel: {
      get () {
        return this.$store.getters.get(
          this.category + (this.parent ? '.' + this.parent : ''),
          this.textChild
        )
      },
      set (value) {
        this.$store.commit('updateState', {
          parent: this.category + (this.parent ? '.' + this.parent : ''),
          child: this.textChild,
          value
        })
      }
    },
    inputModel: {
      get () {
        return this.$store.getters.get(
          this.category + (this.parent ? '.' + this.parent : ''),
          this.child
        )
      },
      set (value) {
        this.$store.commit('updateState', {
          parent: this.category + (this.parent ? '.' + this.parent : ''),
          child: this.child,
          value
        })
      }
    }
  }
}
</script>
