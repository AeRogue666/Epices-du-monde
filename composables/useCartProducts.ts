type FetchProductsOptions = {
  limit?: number;
  offset?: number;
};

export const useCartProducts = () => {
  const config = useRuntimeConfig(),
    apiPublicEndpoint = config.public.apiBase;

  const fetchProducts = async (
    productIds: string | string[],
    options: FetchProductsOptions = {}
  ) => {
    const ids = Array.isArray(productIds) ? productIds : [productIds];
    if (!ids.length) return [];

    const { limit, offset } = options;

    const products = await $fetch(`${apiPublicEndpoint}/items/Product`, {
      params: {
        filter: {
          id: { _in: ids },
        },
        ...(limit !== undefined && { limit }),
        ...(offset !== undefined && { offset }),
      },
    }).then((res: any) => res.data);

    return products ?? [];
  };

  return { fetchProducts };
};
