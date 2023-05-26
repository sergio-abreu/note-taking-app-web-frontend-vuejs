<script setup lang="ts">
import { RouterView } from "vue-router";
import { ref, watch } from "vue";
import AppBar from "@/components/AppBar.vue";
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import router from "@/router";

const drawer = ref<boolean>(true);
const items = ref([{
  title: "Notes",
  icon: "mdi-lightbulb-outline",
  to: "/notes"
}, {
  title: "Archive",
  icon: "mdi-archive-arrow-down-outline",
  to: "/archive"
}]);
const darkTheme = ref<boolean>(false);
const listView = ref<boolean>(false);
const pageTitle = ref<string>("");

watch(router.currentRoute, (r) => {
  pageTitle.value = r.name;
});

</script>

<template>
  <v-app :theme="darkTheme ? 'dark' : 'light'">
    <AppBar
      @theme-changer="darkTheme = !darkTheme"
      @drawer="drawer = !drawer"
      :darkTheme="darkTheme"
      :listView="listView"
      @list-view-changer="listView = !listView"
      :title="pageTitle"
    />
    <NavigationDrawer :drawer="drawer" :items="items" />
    <v-main>
      <v-container fluid>
        <RouterView :listView="listView" />
      </v-container>
    </v-main>
  </v-app>
</template>
