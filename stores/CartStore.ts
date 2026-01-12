interface CartItem {
  productId: string;
  quantity: number;
}

// Cart store
export const useCartStore = defineStore("cart", () => {
  const cartCookie = useCookie<CartItem[]>("cart", {
      default: () => [],
      sameSite: "lax",
    }),
    cart = ref<CartItem[]>(cartCookie.value),
    cartError = ref<string | null>(null),
    isLoaded = ref(false);

  // Persistence
  /* const loadCart = () => {
    if (isLoaded.value) return;

    try {
      const stored = getStorage("cart");
      cart.value = stored ? JSON.parse(stored) : [];
    } catch (error) {
      cart.value = [];
      cartError.value = "Cart loading failed";
    } finally {
      isLoaded.value = true;
    }
  }; */ // Not needed anymore with useCookie()

  watch(
    cart,
    (value) => {
      cartCookie.value = value; // saveStorage("cart", JSON.stringify(value));
    },
    { deep: true }
  );

  // Getters
  const totalItems = computed(() =>
    cart.value.reduce((sum, item) => sum + item.quantity, 0)
  );

  const isInCart = (productId: string): ComputedRef<boolean> => {
    return computed(() => cart.value.some((i) => i.productId === productId));
  };

  const getItem = (productId: string): ComputedRef<CartItem | null> => {
    return computed(
      () => cart.value.find((i) => i.productId === productId) || null
    );
  };

  const isQuantityAvailable = (
    productId: string,
    stock: number
  ): ComputedRef<boolean> => {
    return computed(() => {
      const item = cart.value.find((i) => i.productId === productId);
      return !item || item.quantity < stock;
    });
  };

  // Actions
  const lastAction = ref<"add" | "remove" | null>(null),
    lastRemoved = ref<CartItem | null>(null);

  const addItem = (productId: string, quantity = 1, stock: number) => {
      const item = cart.value.find((i) => i.productId === productId);

      if (item) {
        item.quantity = Math.min(item.quantity + quantity, stock);
      } else {
        cart.value.push({
          productId,
          quantity: Math.min(quantity, stock),
        });
      }

      lastAction.value = "add";
    },
    removeItem = (productId: string) => {
      const index = cart.value.findIndex((i) => i.productId === productId);
      if (index !== -1) {
        lastRemoved.value = cart.value[index];
        cart.value.splice(index, 1);
      }
      // cart.value = cart.value.filter((i) => i.productId !== productId);
    },
    undoRemove = () => {
      if (lastRemoved.value) {
        cart.value.push(lastRemoved.value);
        lastRemoved.value = null;
      }
    },
    clearCart = () => {
      cart.value = [];
    };

  return {
    cart,
    cartError,
    totalItems,
    lastAction,
    lastRemoved,
    isInCart,
    getItem,
    isQuantityAvailable,
    addItem,
    removeItem,
    undoRemove,
    clearCart,
  };
});
