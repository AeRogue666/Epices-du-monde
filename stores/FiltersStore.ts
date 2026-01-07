// Single source of truth : URL <-> Store <-> Components
export const useFilterStore = defineStore("filters", () => {
  const route = useRoute(),
    router = useRouter();

  const categories = ref<string[]>([]),
    search = ref<string>(""),
    page = ref<number>(1);

  // Debounce (URL updates only)
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;
  const DEBOUNCE_DELAY = 400; // in ms

  // Route -> Store (SSR-Navigation safe)
  const syncFromRoute = () => {
    const q = route.query;

    categories.value = q.categories
      ? Array.isArray(q.categories)
        ? q.categories
        : q.categories.split(",")
      : [];

    search.value = typeof q.search === "string" ? q.search : "";

    page.value = q.page ? Number(q.page) || 1 : 1
  };

  // Store -> Route (debounced, client-only)
  const syncToRouteDebounced = () => {
    if(import.meta.server) return // SSR only

    if (debounceTimer) clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      router.replace({
        query: {
          ...route.query,
          categories: categories.value.length
            ? categories.value.join(",")
            : undefined,
          search: search.value || undefined,
          page: page.value > 1 ? page.value : undefined
        }
      })
    }, DEBOUNCE_DELAY)
  };

  // Actions
  const setCategories = (values: string[]) => {
    categories.value = values
    syncToRouteDebounced()
  };

  const toggleCategory = (ctg: string) => {
    page.value = 1 // reset pagination
    if (categories.value.includes(ctg)) {
      categories.value = categories.value.filter((c) => c !== ctg);
    } else {
      categories.value.push(ctg);
    }
    syncToRouteDebounced()
  };

  const clearCategories = () => {
    categories.value = []
    syncToRouteDebounced()
  }

  const setSearch = (value: string) => {
    page.value = 1
    search.value = value;
    syncToRouteDebounced()
  };

  const setPage = (p: number) => {
    page.value = p
    syncToRouteDebounced()
  }

  // Watch route changes (back/forward, SSR hydration)
  watch(() => route.query, syncFromRoute, { immediate: true });

  return {
    categories,
    search,
    page,
    toggleCategory,
    setSearch,
    setPage,
    setCategories,
    clearCategories
  };
});