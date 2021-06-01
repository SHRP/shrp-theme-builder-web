<template>
  <v-col
    cols="12"
    md="5"
  >
    <FormRadioGroup
      :category="'icons'"
      :child="'dIco'"
      :should-be-mandatory="true"
      :classes="'mt-0'"
      :custom-label="'Dashboard Icon Style'"
    >
      <v-radio
        v-for="(style, i) in formInfo.dIco"
        :key="style"
        :label="style"
        :value="i+1"
      />
    </FormRadioGroup>
    <div>
      <FormColorPicker
        :category="'dnIcoColors'"
        :parent="'dIcoColor'"
        :child="'input'"
        :text-child="'menu'"
      />
    </div>
  </v-col>
</template>

<script>
import formInfo from '~/assets/formInfo.json'

import FormColorPicker from '~/components/FormComponents/FormColorPicker'
import FormRadioGroup from '~/components/FormComponents/FormRadioGroup'

export default {
  name: 'Step2p1',
  components: {
    FormColorPicker,
    FormRadioGroup
  },
  data: () => ({
    formInfo
  })
}
</script>
