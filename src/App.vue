<script setup lang="ts">
import { RouterView } from "vue-router";
import AppBar from "@/components/AppBar.vue";
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import { useDark } from "@vueuse/core";

const isDark = useDark();

</script>

<template>
  <v-app :theme="isDark ? 'dark' : 'light'">
    <AppBar/>
    <NavigationDrawer/>
    <v-main>
      <v-container fluid>
        <RouterView/>
      </v-container>
    </v-main>
  </v-app>
</template>
