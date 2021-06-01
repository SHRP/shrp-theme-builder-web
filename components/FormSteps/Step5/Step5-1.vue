<template>
  <v-col cols="12" md="6" class="pt-4">
    <FormSwitch
      :category="'splash'"
      :child="'custom'"
      :custom-label="'Custom Splash Logo'"
      :classes="'ma-0 pa-0'"
      :should-hide-details="true"
    />
  </v-col>
</template>

<script>
import FormSwitch from '~/components/FormComponents/FormSwitch'

export default {
  name: 'Step5p1',
  components: {
    FormSwitch
  }
}
</script>
