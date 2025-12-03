export const URLStore = defineStore("url", () => {
  const { query } = useRoute(),
    { currentRoute, push } = useRouter();
  const updateQueryState = (parameter: string, value: string | string[]) => {
    push({
      query: {
        ...currentRoute.value.query,
        [parameter]: value,
      },
    });
  };
  const resetQuery = () => {
    push({
      query: {},
    });
  };

  return { updateQueryState, resetQuery };
});
