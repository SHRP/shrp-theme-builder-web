<template>
  <div>
    <v-row class="px-3 pt-0">
      <v-col v-for="(value, key) in defaultState.extra" :key="key" cols="6">
        <FormSwitch
          :category="'extra'"
          :parent="key"
          :child="'enabled'"
          :classes="'mt-0 pt-0'"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(value, key) in defaultState.normal"
        :key="key"
        cols="12"
        md="4"
      >
        <div v-if="value.type === 'color'">
          <FormColorPicker
            :category="'normal'"
            :parent="key"
            :child="'input'"
            :text-child="'menu'"
          />
        </div>
        <div v-else>
          <FormTextField :category="'normal'" :parent="key" :child="'input'" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import formInfo from '~/assets/formInfo.json'
import defaultState from '~/assets/defaultState.json'

import FormSwitch from '~/components/FormComponents/FormSwitch'
import FormColorPicker from '~/components/FormComponents/FormColorPicker'
import FormTextField from '~/components/FormComponents/FormTextField'

export default {
  name: 'Step1p1',
  components: {
    FormSwitch,
    FormColorPicker,
    FormTextField
  },
  data: () => ({
    formInfo,
    defaultState
  })
}
</script>
