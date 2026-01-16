export const useMergeCart = () => {
  const cartStore = useCartStore(),
    { ensureProducts } = useEnsureCartProducts(),
    productCache = useProductCacheStore();

  const productIds = computed(() => cartStore.cart.map((i) => i.productId)); // const { data: products } = useCachedCartProducts(productIds.value);

  watch(
    productIds,
    (ids) => {
      if (ids.length) ensureProducts(ids);
    },
    { immediate: true }
  );

  const mergedCart = computed(() => {
    return cartStore.cart.map((item) => {
      const product = productCache.get(item.productId);

      return {
        productId: item.productId,
        quantity: item.quantity,
        product: product ?? null,
        unavailable: !product,
        linePrice: product ? product.price * item.quantity : 0,
      };
    });
  });

  // TOTAL PRICE (single place)
  
  watchEffect(() => {
    cartStore.totalPrice = mergedCart.value.reduce(
      (sum, i) => sum + i.linePrice,
      0
    );
  });

  return { mergedCart };
};
