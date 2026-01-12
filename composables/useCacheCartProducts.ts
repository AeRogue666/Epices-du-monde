export const useCachedCartProducts = (ids: string[]) => {
  const sortedIds = [...ids].sort();
  const key = `cart-products-${sortedIds.join(",")}`;

  return useAsyncData(
    key,
    async () => {
      if (!sortedIds.length) return [];

      const { fetchProducts } = useCartProducts();
      return fetchProducts(sortedIds);
    },
    {
      dedupe: "defer", // important
      server: true,
      lazy: true,
    }
  );
};
