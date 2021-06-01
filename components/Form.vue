<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <Step1 />
      <v-divider class="mx-4" />
      <Step2 />
      <v-divider class="mx-4" />
      <Step3 />
      <v-divider class="mx-4" />
      <Step4 />
      <v-divider class="mx-4" />
      <Step5 />
      <v-row justify="center" align="center">
        <v-col cols="12">
          <v-btn
            color="#21CEF5"
            style="color: #000"
            @click="$emit('reconstruct')"
          >
            Refresh Preview
          </v-btn>
          <v-btn
            id="toBeDisabled"
            :disabled="!valid"
            color="#21CEF5"
            style="color: #000"
            @click="$emit('submit')"
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

import Step1 from '~/components/FormSteps/Step1'
import Step2 from '~/components/FormSteps/Step2'
import Step3 from '~/components/FormSteps/Step3'
import Step4 from '~/components/FormSteps/Step4'
import Step5 from '~/components/FormSteps/Step5'

export default {
  components: {
    Step1,
    Step2,
    Step3,
    Step4,
    Step5
  },
  data: () => ({
    formInfo,
    defaultState,
    valid: false
  }),
  created () {
    // To be fired when form gets created
    // interval was used for when it as auto updating

    // this.interval = setInterval(() => this.$emit('fields-changed', this.fields), 1000)
    this.$emit('reconstruct')
  }
  // Watch was used for real time auto updating
  // Disabled becasue canvas-machine b r 0 k e on some devices
  // watch: {
  //   fields: {
  //     handler (newFields) {
  //       this.$emit('fields-changed', newFields)
  //     },
  //     deep: true
  //   }
  // },
}
</script>
