<template>
  <v-radio-group
    v-model="radioModel"
    :mandatory="shouldBeMandatory"
    :label="customLabel"
    :class="classes"
    :row="shouldBeRow"
    :hide-details="shouldHideDetails"
  >
    <slot />
  </v-radio-group>
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
      required: true
    },
    shouldHideDetails: {
      type: Boolean,
      default: false
    },
    shouldBeRow: {
      type: Boolean,
      default: false
    },
    shouldBeMandatory: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    radioModel: {
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
