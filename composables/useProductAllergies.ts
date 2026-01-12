export const useProductAllergies = () => {
  const config = useRuntimeConfig(),
    apiPublicEndpoint = config.public.apiBase;

  const fetchAllergies = async (productId: number | string) => {

    // Get pivot records
    
    const pivot = await $fetch(`${apiPublicEndpoint}/items/Product_Allergie`, {
      params: {
        filter: {
          Product_id: { _eq: productId },
        },
        fields: ["Allergie_id"],
      },
    }).then((res: any) => res.data);

    const allergieIds: number[] = pivot.map((p: any) => p.Allergie_id) ?? [];

    if (!allergieIds.length) return [];

    // Fetch allergie entities

    const allergies = await $fetch(`${apiPublicEndpoint}/items/Allergie`, {
      params: {
        filter: {
          id: { _in: allergieIds },
        },
        fields: ["id", "name"],
      },
    }).then((res: any) => res.data);

    return allergies ?? [];
  };

  return { fetchAllergies };
};
