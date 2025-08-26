import { getStorage, saveStorage } from "~/assets/js/storageFunctions";

const aAddToShoppingCart = (productId: string, productNumber: number) => {
  let shoppingCart = getStorage("shopping-cart");

  if (shoppingCart) {
    const productExist = shoppingCart.find(
      (obj: { id: string }) => obj.id === productId
    );
    if (productExist) {
      return { code: 400, msg: "Product already in cart" };
    } else {
      shoppingCart.push({ id: productId, number: productNumber });
      saveStorage("shopping-cart", shoppingCart);
      return { code: 200, msg: "Product added to cart" };
    }
  } else {
    shoppingCart = [];
    shoppingCart.push({ id: productId, number: productNumber });
    saveStorage("shopping-cart", shoppingCart);
    return { code: 200, msg: "Product added to cart" };
  }
};

export const useCartStore = defineStore("product-cart", () => {
  computed({
    get() {
      aAddToShoppingCart;
    },
    set() {
      aAddToShoppingCart;
    },
  });
  return { aAddToShoppingCart };
});
