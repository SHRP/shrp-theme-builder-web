<template>
  <v-switch
    v-model="switchModel"
    inset
    :hide-details="shouldHideDetails"
    :class="classes"
    :label="
      customLabel
        ? customLabel
        : parent.charAt(0).toUpperCase() + parent.slice(1)
    "
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
    },
    customLabel: {
      type: String,
      default: null
    },
    shouldHideDetails: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    switchModel: {
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
