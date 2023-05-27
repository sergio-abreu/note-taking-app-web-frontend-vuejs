<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";
import { useListView } from "@/stores/listView";
import { useDrawer } from "@/stores/drawer";
import { useTitle } from "@/stores/title";
import { useNotesStore } from "@/stores/notes";

const isDark = useDark();
const toggleDark = useToggle(isDark);
const { listView, toggleListView } = useListView();
const { toggleDrawer } = useDrawer();
const title = useTitle();
const { getNotes } = useNotesStore();

</script>

<template>
  <v-app-bar elevation="0" border>
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="toggleDrawer()"></v-app-bar-nav-icon>
    </template>

    <template v-slot:title>
      <span class="text-capitalize">{{ title }}</span>
    </template>

    <template v-slot:append>
      <v-btn icon @click="getNotes()">
        <v-icon>mdi-sync</v-icon>
        <v-tooltip offset="-5" activator="parent" location="bottom">Sync</v-tooltip>
      </v-btn>
      <v-btn icon @click="toggleListView()">
        <v-icon v-if="listView">mdi-view-grid-outline</v-icon>
        <v-icon v-else>mdi-view-agenda-outline</v-icon>
        <v-tooltip offset="-5" activator="parent" location="bottom">{{ listView ? 'Grid' : 'List' }} view</v-tooltip>
      </v-btn>
      <v-btn icon @click="toggleDark()">
        <v-icon v-if="isDark">mdi-weather-sunny</v-icon>
        <v-icon v-else>mdi-weather-night</v-icon>
        <v-tooltip offset="-5" activator="parent" location="bottom">{{ isDark ? 'Light' : 'Dark' }}</v-tooltip>
      </v-btn>
      <v-btn icon="mdi-dots-vertical"></v-btn>
    </template>
  </v-app-bar>
</template>
