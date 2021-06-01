<template>
  <v-file-input
    v-show="$store.getters.get('splash', 'custom')"
    v-model="inputModel"
    accept="image/png"
    :label="customLabel"
    show-size
    outlined
    dense
    :class="classes"
    :error="shouldError"
    :error-messages="inputErrors"
    @change="relative_url"
  />
</template>

<script>
export default {
  name: 'FormFileInput',
  props: {
    parent: {
      type: String,
      default: null
    },
    child: {
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
    customLabel: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      tempMenu: false,
      fullPath: this.category + (this.parent ? '.' + this.parent : ''),
      shouldError: false,
      inputErrors: []
    }
  },
  computed: {
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
  },
  methods: {
    relative_url (rert) {
      const image = this.$store.getters.get(
        'splash',
        'info'
      )
      if (!image || typeof rert === 'undefined') {
        this.$store.commit('updateState', {
          parent: 'splash',
          child: 'info',
          value: null
        })
        this.$store.commit('updateState', {
          parent: 'splash',
          child: 'blob',
          value: null
        })
        this.$store.commit('updateState', {
          parent: 'splash',
          child: 'custom',
          value: false
        })
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
      this.$store.commit('updateState', {
        parent: 'splash',
        child: 'blob',
        value: URL.createObjectURL(image)
      })
    }
  }
}
</script>
