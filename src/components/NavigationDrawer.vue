<script setup lang="ts">
import { useDrawer } from "@/stores/drawer";

const items = [{
  title: "Notes",
  icon: "mdi-lightbulb-outline",
  to: "/notes"
}, {
  title: "Archive",
  icon: "mdi-archive-arrow-down-outline",
  to: "/archive"
}];

const { drawer } = useDrawer();

</script>

<template>
  <v-navigation-drawer permanent expand-on-hover :rail="drawer">
    <v-list density="compact" nav>
      <v-list-item v-for="item in items"
                   :key="item.title"
                   :prepend-icon="item.icon"
                   :title="item.title"
                   :value="item.title"
                   :to="item.to" />
    </v-list>
  </v-navigation-drawer>
</template>
