<template>
  <v-app dark>
    <v-app-bar fixed app class="rounded-b-xl">
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
    <v-footer absolute app class="rounded-t-xl">
      <span>&copy; {{ new Date().getFullYear() }} <span v-for="(person, index) in people" :key="person.name"><a :href="person.link" style="text-decoration: none;" color="#21CEF5">{{ person.name }}</a><span v-if="index+1 < people.length">{{ index === people.length - 2 ? " & " : ", " }}</span></span> with <v-icon color="#21CEF5" medium>mdi-heart</v-icon></span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: 'SHRP Theme Builder',
      people: [
        {
          name: 'GeopJr',
          link: 'https://geopjr.dev/'
        },
        {
          name: 'epicX',
          link: 'https://epicx67.github.io/'
        }
      ],
      buttons: [
        {
          title: 'SHRP',
          url: 'https://github.com/SHRP'
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
