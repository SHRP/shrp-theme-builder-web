<template>
  <v-col cols="12" md="6">
    <FormFileInput
      :category="'splash'"
      :child="'info'"
      :custom-label="'Splash Logo'"
    />
  </v-col>
</template>

<script>
import FormFileInput from '~/components/FormComponents/FormFileInput'

export default {
  name: 'Step5p2',
  components: {
    FormFileInput
  }
}
</script>
