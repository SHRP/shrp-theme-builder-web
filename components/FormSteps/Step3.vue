<template>
  <v-row class="pa-3">
    <Step3p1 />
    <v-col
      cols="2"
      class="d-none d-md-flex"
      style="justify-content: center;"
    >
      <v-divider vertical class="my-0" />
    </v-col>
    <Step3p2 />
  </v-row>
</template>

<script>
import Step3p1 from '~/components/FormSteps/Step3/Step3-1'
import Step3p2 from '~/components/FormSteps/Step3/Step3-2'

export default {
  name: 'Step3',
  components: {
    Step3p1,
    Step3p2
  }
}
</script>
