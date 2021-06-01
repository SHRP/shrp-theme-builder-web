<template>
  <v-col cols="12" md="5">
    <FormCheckbox
      :category="'settings'"
      :child="'dashboardTextColorEnabled'"
      :custom-label="'Custom Dashboard Text Color'"
    />
    <div v-if="defaultState.settings.dashboardTextColorEnabled">
      <FormColorPicker
        :category="'dashboardText'"
        :child="'input'"
        :text-child="'menu'"
      />
    </div>
    <FormCheckbox
      :category="'settings'"
      :child="'dashboardSubTintEnabled'"
      :custom-label="'Dashboard Icon Background'"
    />
    <div v-if="defaultState.settings.dashboardSubTintEnabled">
      <FormColorPicker
        :category="'dashboardIcoBg'"
        :child="'input'"
        :text-child="'menu'"
      />
    </div>
  </v-col>
</template>

<script>
import defaultState from '~/assets/defaultState.json'

import FormColorPicker from '~/components/FormComponents/FormColorPicker'
import FormCheckbox from '~/components/FormComponents/FormCheckbox'

export default {
  name: 'Step3p1',
  components: {
    FormColorPicker,
    FormCheckbox
  },
  data: () => ({
    defaultState
  })
}
</script>
