export const useProductLabels = () => {
  const config = useRuntimeConfig(),
    apiPublicEndpoint = config.public.apiBase;

  const fetchProductLabels = async (productId: number | string) => {

    // Get pivot records
    
    const pivot = await $fetch(`${apiPublicEndpoint}/items/Product_Label`, {
      params: {
        filter: {
          Product_id: { _eq: productId },
        },
        fields: ["Label_id"],
      },
    }).then((res: any) => res.data);

    const labelIds: number[] = pivot.map((p: any) => p.Label_id) ?? [];

    if (!labelIds.length) return [];

    // Fetch label entities

    const labelInfos = await $fetch(`${apiPublicEndpoint}/items/Label`, {
      params: {
        filter: {
          id: { _in: labelIds },
        },
        fields: ["id", "name", 'description', 'image_id'],
      },
    }).then((res: any) => res.data);

    return labelInfos ?? [];
  };

  return { fetchProductLabels };
};