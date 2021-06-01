<template>
  <v-row class="pa-3" justify="center">
    <Step5p1 />
    <Step5p2 />
  </v-row>
</template>

<script>
import Step5p1 from '~/components/FormSteps/Step5/Step5-1'
import Step5p2 from '~/components/FormSteps/Step5/Step5-2'

export default {
  name: 'Step5',
  components: {
    Step5p1,
    Step5p2
  }
}
</script>
