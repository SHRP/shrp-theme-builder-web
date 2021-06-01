<template>
  <v-row class="pa-3">
    <Step2p1 />
    <v-col
      cols="2"
      class="d-none d-md-flex"
      style="justify-content: center;"
    >
      <v-divider vertical class="my-0" />
    </v-col>
    <Step2p2 />
  </v-row>
</template>

<script>
import Step2p1 from '~/components/FormSteps/Step2/Step2-1'
import Step2p2 from '~/components/FormSteps/Step2/Step2-2'

export default {
  name: 'Step2',
  components: {
    Step2p1,
    Step2p2
  }
}
</script>
