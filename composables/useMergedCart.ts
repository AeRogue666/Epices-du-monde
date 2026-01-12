export const useMergeCart = () => {
  const cartStore = useCartStore();
  const productIds = computed(() => cartStore.cart.map((i) => i.productId));

  const { data: products } = useCachedCartProducts(productIds.value);

  const mergedCart = computed(() => {
    return cartStore.cart.map((item) => {
      const product = products.value?.find((p: { id: string; }) => p.id === item.productId);

      return {
        ...item,
        product: product ?? null,
        unavailable: !product,
      };
    });
  });

  return { mergedCart };
};
