<template>
  <div>
    <Step1p1 />
    <v-divider
      v-show="$store.getters.get('extra.random', 'enabled')"
      class="mx-4"
    />
    <Step1p2 />
    <v-divider
      v-show="$store.getters.get('extra.gradient', 'enabled')"
      class="mx-4"
    />
    <Step1p3 />
  </div>
</template>

<script>
import Step1p1 from '~/components/FormSteps/Step1/Step1-1'
import Step1p2 from '~/components/FormSteps/Step1/Step1-2'
import Step1p3 from '~/components/FormSteps/Step1/Step1-3'

export default {
  name: 'Step1',
  components: {
    Step1p1,
    Step1p2,
    Step1p3
  }
}
</script>
