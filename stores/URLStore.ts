export const URLStore = defineStore("url", () => {
  const { query } = useRoute(),
    { currentRoute, push } = useRouter();

  const updateQueryState = async (
    parameter: string,
    value: string | string[]
  ) => {
    if (!value) {
      if (currentRoute.value.fullPath.includes(parameter) && !value) {
        const index = currentRoute.value.fullPath.indexOf(parameter);
        if (index !== -1) {
          currentRoute.value.fullPath = currentRoute.value.fullPath.slice(0, index);
        }
        await navigateTo({
          path: currentRoute.value.fullPath
        })
      }
    } else {
      await navigateTo({
        query: {
          ...currentRoute.value.query,
          [parameter]: value,
        },
      });
      /* push({
        query: {
          ...currentRoute.value.query,
          [parameter]: value,
        },
      }); */
    }
  };
  const resetQuery = async () => {
    await navigateTo({
      query: {},
    });
    /* push({
      query: {},
    }); */
  };

  return { updateQueryState, resetQuery };
});
