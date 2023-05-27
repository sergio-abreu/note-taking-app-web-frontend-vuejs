import { createGlobalState } from "@vueuse/core";
import { ref, watch } from "vue";
import router from "@/router";

export const useTitle = createGlobalState(() => {
  const title = ref("");
  watch(router.currentRoute, (r) => {
    title.value = r.name;
  });
  return title;
});