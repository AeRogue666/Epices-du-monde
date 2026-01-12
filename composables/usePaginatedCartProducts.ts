export const usePaginatedCartProducts = (
  ids: string[],
  page = ref(1),
  pageSize = 5
) => {
  const sortedIds = [...ids].sort();
  const key = computed(
    () => `cart-products-${sortedIds.join(",")}-page-${page.value}`
  );

  const { data, pending, refresh } = useAsyncData(
    key.value,
    async () => {
      if (!sortedIds.length) return [];

      const { fetchProducts } = useCartProducts();

      return fetchProducts(sortedIds, {
        limit: pageSize,
        offset: (page.value - 1) * pageSize,
      });
    },
    {
      dedupe: "defer",
      lazy: true,
    }
  );

  return {
    products: data,
    pending,
    refresh,
    nextPage: () => page.value++,
  };
};
