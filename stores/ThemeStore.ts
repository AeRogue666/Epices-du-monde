const updateUserTheme = (value: string) => {
  document.documentElement.setAttribute("data-theme", value);
  if (document.documentElement.classList.value)
    document.documentElement.classList.remove(
      document.documentElement.classList.value
    );
  document.documentElement.classList.add(value);
};

export const useThemeStore = defineStore("user-theme", () => {
  computed({
    get() {
      updateUserTheme;
    },
    set() {
      updateUserTheme;
    },
  });
  return { updateUserTheme };
});
