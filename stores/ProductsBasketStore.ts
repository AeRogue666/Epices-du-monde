import { getStorage, saveStorage } from "~/assets/js/storageFunctions";

export const useCartStore = defineStore("product-cart", {
  state: () => ({
    shoppingCart: [],
  }),

  actions: {
    async fetchProduct(id: string, number: number, final: any) {
      const product = await fetch(
          `http://localhost:3000/directus/items/Product?filter[id][_eq]=${id}&filter[status][_eq]=published&sort=date_created`
        )
          .then((res) => res.json())
          .then((res) => res.data)
          .then((res) => res.reduce((acc: any, value: any) => acc + value)),
        img = await fetch(
          `http://localhost:3000/directus/files?filter[id][_eq]=${product?.image_id}&fields=id,description,width,height`
        )
          .then((res) => res.json())
          .then((res) => res.data)
          .then((res) => res.reduce((acc: any, value: any) => acc + value));

      product ? img : "";
      product && img
        ? final.push({
            id: product.id,
            title: product.title,
            description: product.description,
            slug: product.slug,
            poids_net: product.poids_net,
            price: product.price,
            price_per_kg: product.price_per_kg,
            reduction_rate: product.reduction_rate,
            old_price: product.old_price,
            stock: product.stock,
            availability: product.availability,
            image: img,
            product_number: number,
          }) && saveStorage("shopping-cart", final)
        : "";
    },
    async addToShoppingCart(productId: string, productNumber: number) {
      let shoppingCart = getStorage("shopping-cart");

      const cart = computed(() => shoppingCart !== null);

      if (cart) {
        // if cart isn't null, find if productId exist inside the cart*
        const productExist = shoppingCart.find(
          (obj: { id: string }) => obj.id === productId
        );
        if (productExist) {
          return { code: 400, msg: "Product already in cart" };
        } else {
          await this.fetchProduct(productId, productNumber, shoppingCart);
          return { code: 200, msg: "Product added to cart" };
        }
      } else {
        // if cart is null, fetch product
        await this.fetchProduct(productId, productNumber, shoppingCart);
        return { code: 200, msg: "Product added to cart" };
      }
    },
    resetShoppingCart() {
      this.shoppingCart = [];
    },
    deleteShoppingCartProduct(value: string) {
      this.shoppingCart?.find((i: { id: string; }) => i.id == value)
      
      return this.shoppingCart
    }
  },
});

/* const fetchProduct = async (id: string, number: number, final: any) => {
    const product = await fetch(
        `http://localhost:3000/directus/items/Product?filter[id][_eq]=${id}&filter[status][_eq]=published&sort=date_created`
      )
        .then((res) => res.json())
        .then((res) => res.data)
        .then((res) => res.reduce((acc: any, value: any) => acc + value)),
      img = await fetch(
        `http://localhost:3000/directus/files?filter[id][_eq]=${product?.image_id}&fields=id,description,width,height`
      )
        .then((res) => res.json())
        .then((res) => res.data)
        .then((res) => res.reduce((acc: any, value: any) => acc + value));
        
    product ? img : "";
    product && img
      ? final.push({
          id: product.id,
          title: product.title,
          description: product.description,
          slug: product.slug,
          origine: product.origine,
          marque: product.marque,
          poids_net: product.poids_net,
          ingredients: product.ingredients,
          price: product.price,
          price_per_kg: product.price_per_kg,
          reduction_rate: product.reduction_rate,
          old_price: product.old_price,
          stock: product.stock,
          availability: product.availability,
          product_allergie: product.product_allergie,
          product_category: product.product_category,
          product_label: product.product_label,
          nutrition_id: product.nutrition_id,
          image: img,
          sort: product.sort,
          status: product.status,
          date_created: product.date_created,
          date_updated: product.date_updated,
          product_number: number,
        }) && saveStorage("shopping-cart", final)
      : "";

    console.log(product, img, final, id, number);
    return final;
  },
  aAddToShoppingCart = async (productId: string, productNumber: number) => {
    let shoppingCart = getStorage("shopping-cart");

    if (shoppingCart) {
      const productExist = shoppingCart.find(
        (obj: { id: string }) => obj.id === productId
      );
      if (productExist) {
        return { code: 400, msg: "Product already in cart" };
      } else {
        await fetchProduct(productId, productNumber, shoppingCart);
        return { code: 200, msg: "Product added to cart" };
      }
    } else {
      shoppingCart = [];
      await fetchProduct(productId, productNumber, shoppingCart);

      // shoppingCart.push({ id: productId, number: productNumber });
      // saveStorage("shopping-cart", shoppingCart);

      return { code: 200, msg: "Product added to cart" };
    }
  },
  aResetShoppingCart = (reset: boolean) => {
    let shoppingCart = getStorage("shopping-cart");
    if (reset) {
      shoppingCart = [];
      // return { code: 500, msg: "Cart have been eset" };
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
  return { aAddToShoppingCart, aResetShoppingCart };
});
 */
