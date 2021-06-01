<template>
  <v-col cols="12" md="5">
    <FormRadioGroup
      v-if="$store.getters.get('settings', 'dashboardSubTintEnabled')"
      :category="'icons'"
      :child="'dBgType'"
      :should-be-mandatory="true"
      :classes="'mt-0'"
      :custom-label="'Dashboard icon background style'"
    >
      <v-radio
        v-for="(style, i) in formInfo.dBgType"
        :key="style"
        :label="style"
        :value="i + 1"
      />
    </FormRadioGroup>
  </v-col>
</template>

<script>
import formInfo from '~/assets/formInfo.json'

import FormRadioGroup from '~/components/FormComponents/FormRadioGroup'

export default {
  name: 'Step3p2',
  components: {
    FormRadioGroup
  },
  data: () => ({
    formInfo
  })
}
</script>
