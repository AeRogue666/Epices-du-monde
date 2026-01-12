// Cache + deduplication

export const useProductCacheStore = defineStore("product-cache", () => {
  const products = ref<Record<string, any>>({}),
    pending = ref<Set<string>>(new Set());

  const has = (id: string) => !!products.value[id],
    get = (id: string) => products.value[id];

  const setMany = (items: any[]) => {
    for (const item of items) {
      products.value[item.id] = item;
      pending.value.delete(item.id);
    }
  };

  const markPending = (ids: string[]) => {
    ids.forEach((id) => pending.value.add(id));
  };

  const isPending = (id: string) => pending.value.has(id);

  return {
    products,
    has,
    get,
    setMany,
    markPending,
    isPending,
  };
});
