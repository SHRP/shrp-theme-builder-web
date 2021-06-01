<template>
  <v-col
    cols="12"
    md="5"
  >
    <FormRadioGroup
      :category="'icons'"
      :child="'nIco'"
      :should-be-mandatory="true"
      :classes="'mt-0'"
      :custom-label="'Nav-Bar Icon Style'"
    >
      <v-radio
        v-for="(style, i) in formInfo.nIco"
        :key="style"
        :label="style"
        :value="i+1"
      />
    </FormRadioGroup>
    <div>
      <FormColorPicker
        :category="'dnIcoColors'"
        :parent="'nIcoColor'"
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
  name: 'Step2p2',
  components: {
    FormColorPicker,
    FormRadioGroup
  },
  data: () => ({
    formInfo
  })
}
</script>
