<template>
  <v-row class="pa-3">
    <Step4p1 />
    <v-col
      cols="2"
      class="d-none d-md-flex"
      style="justify-content: center;"
    >
      <v-divider vertical class="my-0" />
    </v-col>
    <Step4p2 />
  </v-row>
</template>

<script>
import Step4p1 from '~/components/FormSteps/Step4/Step4-1'
import Step4p2 from '~/components/FormSteps/Step4/Step4-2'

export default {
  name: 'Step4',
  components: {
    Step4p1,
    Step4p2
  }
}
</script>
