<template>
  <v-container>
    <v-row>
      <v-spacer />
      <v-col
        cols="12"
        md="6"
        sm="8"
        justify="center"
        align="center"
      >
        <v-banner
          single-line
          elevation="2"
          class="text-center"
        >
          {{ error.statusCode === 404 ? 'Page Not Found' : 'An error occurred' }}
        </v-banner>
        <div class="my-4">
          <NuxtLink to="/">
            Home Page
          </NuxtLink>
        </div>
        <v-skeleton-loader
          type="card-avatar, article, actions"
          elevation="4"
          aria-busy="false"
        />
      </v-col>
      <v-spacer />
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
