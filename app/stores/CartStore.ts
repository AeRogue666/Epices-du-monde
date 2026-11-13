import type { Product } from "~/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

// Cart store
export const useCartStore = defineStore("cart", () => {
  const items = ref<CartItem[]>([]);

  if (import.meta.client) {
    const saved = localStorage.getItem("edm_cart");
    if (saved) {
      try {
        items.value = JSON.parse(saved);
      } catch {
        items.value = [];
      }
    }
  }

  watch(
    items,
    (newItems) => {
      localStorage.setItem("edm_cart", JSON.stringify(newItems));
    },
    { deep: true },
  );

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0),
  );

  const subTotal = computed(() =>
    items.value.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    ),
  );
  const addItem = (product: Product, quantity = 1) => {
    const existing = items.value.find((i) => i.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      items.value.push({ product, quantity });
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    const existing = items.value.find((i) => i.product.id === productId);
    if (existing) existing.quantity = quantity;
  };

  const removeItem = (productId: string) => {
    items.value = items.value.filter((i) => i.product.id !== productId);
  };

  const clearCart = () => {
    items.value = [];
  };

  return {
    items,
    totalItems,
    subTotal,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  };
});
