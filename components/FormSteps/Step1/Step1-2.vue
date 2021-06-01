<template>
  <v-row v-show="$store.getters.get('extra.random', 'enabled')">
    <v-col cols="12">
      <FormRadioGroup
        :category="'extra'"
        :parent="'random'"
        :child="'type'"
        :should-be-row="true"
        :should-be-mandatory="true"
        :should-hide-details="true"
        :classes="'mt-4'"
        :custom-label="'Random Colors'"
      >
        <v-radio
          v-for="type in formInfo.randomType"
          :key="type"
          :label="type.toString()"
          :value="type"
        />
      </FormRadioGroup>
    </v-col>
    <v-col
      v-for="(value, key, i) in defaultState.random"
      v-show="i + 1 >= 3 ? defaultState.extra.random.type === 6 : true"
      :key="key"
      cols="12"
      md="4"
      class="mb-0"
    >
      <FormColorPicker
        :category="'random'"
        :parent="key"
        :child="'input'"
        :text-child="'menu'"
        :classes="'my-4'"
      />
    </v-col>
  </v-row>
</template>

<script>
import formInfo from '~/assets/formInfo.json'
import defaultState from '~/assets/defaultState.json'

import FormColorPicker from '~/components/FormComponents/FormColorPicker'
import FormRadioGroup from '~/components/FormComponents/FormRadioGroup'

export default {
  name: 'Step1p1',
  components: {
    FormColorPicker,
    FormRadioGroup
  },
  data: () => ({
    formInfo,
    defaultState
  })
}
</script>
