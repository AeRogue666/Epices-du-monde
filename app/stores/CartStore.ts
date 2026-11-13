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
    cartError = ref<string | null>(null);

  watch(
    cart,
    (value) => {
      cartCookie.value = value;
    },
    { deep: true }
  );

  /* GETTERS */
  const totalItems = computed(() =>
    cart.value.reduce((sum, item) => sum + item.quantity, 0)
  );

  // totalPrice will be computed using mergedCart
  const totalPrice = ref(0);

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

  /* ACTIONS */
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
    },
    undoRemove = () => {
      if (lastRemoved.value) {
        cart.value.push(lastRemoved.value);
        lastRemoved.value = null;
      }
    },
    updateQuantity = (productId: string, quantity: number, stock: number) => {
      const item = cart.value.find((i) => i.productId === productId);
      if (!item) return;
      item.quantity = Math.max(1, Math.min(quantity, stock));
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
    totalPrice,
    isInCart,
    getItem,
    isQuantityAvailable,
    addItem,
    removeItem,
    undoRemove,
    updateQuantity,
    clearCart,
  };
});
