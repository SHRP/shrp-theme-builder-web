<template>
  <v-container>
    <v-row class="px-3 pt-0">
      <v-col v-for="(value, key) in fields.extra" :key="key" cols="6">
        <v-switch
          v-model="value.enabled"
          inset
          class="mt-0 pt-0"
          :label="key.charAt(0).toUpperCase() + key.slice(1)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import formInfo from "~/assets/formInfo.json";

export default {
  data: () => ({
    fields: {
      guun: "Guunachoda"
    }
  }),
};
</script>
