export const useProductCategories = () => {
  const config = useRuntimeConfig(),
    apiPublicEndpoint = config.public.apiBase;

  const fetchProductCategories = async (productId: number | string) => {

    // Get pivot records
    
    const pivot = await $fetch(`${apiPublicEndpoint}/items/Product_Categorie`, {
      params: {
        filter: {
          Product_id: { _eq: productId },
        },
        fields: ["Categorie_id"],
      },
    }).then((res: any) => res.data);

    const categorieIds: number[] = pivot.map((p: any) => p.Categorie_id) ?? [];

    if (!categorieIds.length) return [];

    // Fetch category entities

    const categorieInfos = await $fetch(`${apiPublicEndpoint}/items/Categorie`, {
      params: {
        filter: {
          id: { _in: categorieIds },
        },
        fields: ["id", "name", 'value', 'icon', 'color'],
      },
    }).then((res: any) => res.data);

    return categorieInfos ?? [];
  };

  return { fetchProductCategories };
};