<script setup lang="ts">
interface Navigation {
    title: string
    icon: string
    to: string
}

const props = defineProps({
    drawer: {type: Boolean, required: true},
    items: Array<Navigation>,
})
</script>

<template>
    <v-navigation-drawer permanent expand-on-hover :rail="drawer">
        <v-list density="compact" nav>
            <v-list-item v-for="item in props.items"
                         :key="item.title"
                         :prepend-icon="item.icon"
                         :title="item.title"
                         :value="item.title"
                         :to="item.to"/>
        </v-list>
    </v-navigation-drawer>
</template>
