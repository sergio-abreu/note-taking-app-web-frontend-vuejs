import { createGlobalState, useLocalStorage, useToggle } from "@vueuse/core";

export const useDrawer = createGlobalState(() => {
  const drawer = useLocalStorage("vueuse-drawer", false);
  const toggleDrawer = useToggle(drawer);

  return { drawer, toggleDrawer };
});