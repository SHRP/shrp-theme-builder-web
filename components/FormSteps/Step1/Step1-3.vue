<template>
  <v-row v-show="$store.getters.get('extra.gradient', 'enabled')">
    <v-col cols="12">
      <FormRadioGroup
        :category="'extra'"
        :parent="'gradient'"
        :child="'type'"
        :should-be-row="true"
        :should-be-mandatory="true"
        :should-hide-details="true"
        :classes="'mt-4'"
        :custom-label="'Gradient Type'"
      >
        <v-tooltip
          v-for="(type, key) in formInfo.gradientType"
          :key="key"
          bottom
        >
          <template #activator="{ on, attrs }">
            <v-radio :label="key" :value="key" v-bind="attrs" v-on="on" />
          </template>
          <span>{{ type }}</span>
        </v-tooltip>
      </FormRadioGroup>
      <FormRadioGroup
        :category="'extra'"
        :parent="'gradient'"
        :child="'accent'"
        :should-be-row="true"
        :should-be-mandatory="true"
        :should-hide-details="true"
        :classes="'mt-4'"
        :custom-label="'Main Accent'"
      >
        <v-radio
          v-for="type in formInfo.gradientAccent"
          :key="type"
          :label="type"
          :value="type.toLowerCase()"
        />
      </FormRadioGroup>
    </v-col>
    <v-col
      v-for="(value, i) in [
        defaultState.gradient.accColor2,
        defaultState.random.dIcoColor2,
      ]"
      :key="i"
      cols="12"
      md="4"
      class="mb-0"
    >
      <FormColorPicker
        :classes="'my-4'"
        :category="i === 0 ? 'gradient' : 'random'"
        :parent="i === 0 ? 'accColor2' : 'dIcoColor2'"
        :child="'input'"
        :text-child="'menu'"
        :pseudo="i === 0 ? false : true"
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
