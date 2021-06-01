<template>
  <v-col md="5">
    <FormCheckbox
      :category="'settings'"
      :child="'batteryBarEnabled'"
      :custom-label="'Show Battery Bar'"
    />
    <FormCheckbox
      :category="'settings'"
      :child="'roundedCornerEnabled'"
      :custom-label="'Rounded Corners'"
    />
    <FormCheckbox
      :category="'settings'"
      :child="'navbarBackgroundEnabled'"
      :custom-label="'Nav-Bar Background'"
    />
    <FormCheckbox
      :category="'settings'"
      :child="'dashboardTextColorEnabled'"
      :custom-label="'Dashboard Text Color'"
    />
    <FormCheckbox
      v-show="$store.getters.get('settings', 'dashboardTextColorEnabled')"
      :category="'settings'"
      :child="'dashboardSubTintEnabled'"
      :custom-label="'Dashboard Icon BG'"
    />
  </v-col>
</template>

<script>
import FormCheckbox from '~/components/FormComponents/FormCheckbox'

export default {
  name: 'Step4p2',
  components: {
    FormCheckbox
  }
}
</script>
