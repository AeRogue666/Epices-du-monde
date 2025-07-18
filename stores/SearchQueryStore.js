import { defineStore } from "pinia";

export const useSearchQueryStore = defineStore("search", () => {
  const { query } = useRoute(),
    { currentRoute, push } = useRouter();
  const search = computed({
    get: () => query.q,
    set(value) {
      if (value.length !== 0) {
        push({
          query: {
            ...currentRoute.value.query,
            'q': value,
          },
        });
      } else {
        push({
          query: {
            ...currentRoute.value.query,
            'q': "",
          },
        });
      }
    },
  });

  return { search, query };
});
