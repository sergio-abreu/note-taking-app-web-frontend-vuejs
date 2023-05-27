import { createGlobalState, useLocalStorage, useToggle } from "@vueuse/core";

export const useListView = createGlobalState(() => {
  const listView = useLocalStorage("vueuse-list-view", false);
  const toggleListView = useToggle(listView);

  return { listView, toggleListView };
});