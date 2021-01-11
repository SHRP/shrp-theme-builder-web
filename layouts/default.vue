<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn-toggle rounded>
        <v-btn v-for="button in buttons" :key="button.url" :href="button.url">
          {{ button.title }}
        </v-btn>
      </v-btn-toggle>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer absolute app>
      <span>&copy; {{ new Date().getFullYear() }} <a :href="me" style="text-decoration: none;" color="#21CEF5">GeopJr</a> with <v-icon color="#21CEF5" medium>mdi-heart</v-icon></span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: 'SHRP Theme Builder',
      me: 'https://geopjr.xyz/',
      buttons: [
        {
          title: 'SHRP',
          url: 'https://shrp.team/'
        },
        {
          title: 'Guide',
          url: 'https://shrp.github.io/'
        }
      ]
    }
  }
}
</script>

<style>
  html, body {
    background-color: "#121212"
  }
</style>
