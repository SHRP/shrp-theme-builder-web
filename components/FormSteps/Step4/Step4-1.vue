<template>
  <v-col md="5">
    <FormCheckbox
      :category="'settings'"
      :child="'statusBarEnabled'"
      :custom-label="'Status Bar'"
    />
    <FormCheckbox
      v-show="$store.getters.get('settings', 'statusBarEnabled')"
      :category="'settings'"
      :child="'batteryIconEnabled'"
      :custom-label="'Show Bettery Icon'"
    />
    <FormRadioGroup
      v-if="$store.getters.get('settings', 'batteryIconEnabled')"
      :category="'icons'"
      :child="'batteryIco'"
      :should-be-mandatory="true"
      :classes="'mt-0'"
      :custom-label="'Battery Icon Style'"
    >
      <v-radio
        v-for="(style, i) in formInfo.batteryIco"
        :key="style"
        :label="style"
        :value="i + 1"
      />
    </FormRadioGroup>
    <FormCheckbox
      v-show="$store.getters.get('settings', 'statusBarEnabled')"
      :category="'settings'"
      :child="'batteryPercentageEnabled'"
      :custom-label="'Show Battery Percentage'"
    />
    <FormCheckbox
      v-show="$store.getters.get('settings', 'statusBarEnabled')"
      :category="'settings'"
      :child="'clockEnabled'"
      :custom-label="'Show Clock'"
    />
    <FormCheckbox
      v-show="
        $store.getters.get('settings', 'statusBarEnabled') &&
          $store.getters.get('settings', 'clockEnabled')
      "
      :category="'settings'"
      :child="'centeredClockEnabled'"
      :custom-label="'Centered Clock'"
    />
    <FormCheckbox
      v-show="$store.getters.get('settings', 'statusBarEnabled')"
      :category="'settings'"
      :child="'cpuTempEnabled'"
      :custom-label="'Show CPU Temp'"
    />
  </v-col>
</template>

<script>
import formInfo from '~/assets/formInfo.json'

import FormRadioGroup from '~/components/FormComponents/FormRadioGroup'
import FormCheckbox from '~/components/FormComponents/FormCheckbox'

export default {
  name: 'Step4p1',
  components: {
    FormRadioGroup,
    FormCheckbox
  },
  data: () => ({
    formInfo
  })
}
</script>
