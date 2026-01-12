export const useProductNutritions = () => {
  const config = useRuntimeConfig(),
    apiPublicEndpoint = config.public.apiBase;

  const fetchNutritions = async (nutritionId: object[]) => {

    // Fetch nutrition entities

    const nutritions = await $fetch(`${apiPublicEndpoint}/items/Nutrition`, {
      params: {
        filter: {
          id: { _in: nutritionId },
        },
        fields: ['*'],
      },
    }).then((res: any) => res.data);

    return nutritions ?? [];
  };

  return { fetchNutritions };
};

/* // Get pivot records
    
    const pivot = await $fetch(`${apiPublicEndpoint}/items/Nutrition`, {
      params: {
        filter: {
          id: { _eq: nutritionId },
        },
        fields: ["*"],
      },
    }).then((res: any) => res.data);

    const nutritionsIds: number[] = pivot.map((p: any) => p.Allergie_id) ?? [];

    if (!nutritionsIds.length) return []; */