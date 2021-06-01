<template>
  <v-text-field
    v-model="inputModel"
    :rules="nameRules"
    :label="$store.getters.get(fullPath, 'name')"
    :value="$store.getters.get(fullPath, 'input')"
    :classes="classes"
    outlined
    required
  />
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
    category: {
      type: String,
      required: true
    },
    classes: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      nameRules: [v => !!v || 'Name is required'],
      fullPath: this.category + (this.parent ? '.' + this.parent : '')
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
  }
}
</script>
