export const useEnsureCartProducts = () => {
  const cache = useProductCacheStore();
  const { fetchProducts } = useCartProducts();

  const ensureProducts = async (ids: string[]) => {
    // remove duplicates fetches
    const uniqueIds = [...new Set(ids)];

    // fetch only missing & not pending
    const toFetch = uniqueIds.filter(
      (id) => !cache.has(id) && !cache.isPending(id)
    );

    if (!toFetch.length) return;

    cache.markPending(toFetch);

    const products = await fetchProducts(toFetch);
    cache.setMany(products);
  };

  return { ensureProducts };
};
