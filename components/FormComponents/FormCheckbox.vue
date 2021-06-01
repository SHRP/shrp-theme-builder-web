<template>
  <v-checkbox v-model="inputModel" :label="customLabel" :class="classes" />
</template>

<script>
export default {
  name: 'FormCheckbox',
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
