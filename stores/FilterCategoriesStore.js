import { defineStore } from "pinia";

export const useCategoriesStore = defineStore("categories", () => {
  const { query } = useRoute(),
  { push } = useRouter();
  
  const category = computed({
    get: () => query,
    set(category) {
      push({
        query: { category },
      });
    },
  });

  return { category };
});
