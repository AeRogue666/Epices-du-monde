export const useWindowResize = () => {
  const width = ref(window.innerWidth),
    height = ref(window.innerHeight);

  const handler = () => {
    (width.value = window.innerWidth), (height.value = window.innerHeight);
  };

  onMounted(() => window.addEventListener("resize", handler));
  onUnmounted(() => window.removeEventListener("resize", handler));

  return { width, height };
};
