import {
  clearStorage,
  getStorage,
  saveStorage,
} from "~/assets/js/storageFunctions";

/* export const useCartStore = defineStore("cart", {
  state: () => ({
    shoppingCart: reactive<
      {
        id: string,
        title: string,
        image: {
            id: string,
            description: string,
            width?: number,
            height?: number,
        },
        slug: string,
        poids_net: number,
        price: number,
        price_per_kg?: number,
        reduction_rate?: number,
        old_price?: number,
        stock: number,
        availability: string,
        product_number: number,
      }[]
    >([]),
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
          }) && saveStorage("cart", final)
        : "";
    },
    async addToShoppingCart(productId: string, productNumber: number) {
      let shoppingCart = getStorage("cart");

      const cart = computed(() => shoppingCart !== null);
      console.log(cart.value);

      if (cart.value !== false) {
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
      this.shoppingCart?.find((i: { id: string }) => i.id == value);

      return this.shoppingCart;
    },
  },
}); */

let shoppingCart = reactive<
  {
    id: string;
    title: string;
    image: {
      id: string;
      description: string;
      width?: number;
      height?: number;
    };
    slug: string;
    poids_net: number;
    price: number;
    price_per_kg?: number;
    reduction_rate?: number;
    old_price?: number;
    stock: number;
    availability: string;
    product_number: number;
  }[]
>([]);

const fetchProduct = async (id: string, number: number, final: any) => {
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
        }) && saveStorage("cart", final)
      : "";
    console.log(
      "product: ",
      product,
      " img: ",
      img,
      " final: ",
      final,
      " id: ",
      id,
      " number: ",
      number
    );
    return final;
  },
  getShoppingCart = () => {
    watch(
      usePinia().state,
      (state) => {
        getStorage("cart", state.cart?.cart).map((item) =>
          shoppingCart.push({
            id: item.id,
            title: item.title,
            image: item.image,
            slug: item.slug,
            poids_net: item.poids_net,
            price: item.price,
            price_per_kg: item.price_per_kg,
            reduction_rate: item.reduction_rate,
            old_price: item.old_price,
            stock: item.stock,
            availability: item.availability,
            product_number: item.product_number,
          })
        );
      },
      { deep: true }
    );
    return { shoppingCart };
  },
  addToShoppingCart = async (productId: string, productNumber: number) => {
    const cart = computed(() => getShoppingCart !== null);
    console.log(cart.value);
    if (cart.value == true) {
      // Si shoppingCart n'est pas vide
      const productExist = shoppingCart.findIndex(
        (obj: { id: string }) => obj.id === productId
      );
      console.log("Already exist product: ", productExist);

      if (productExist >= 0) {
        // Si le produit est déjà dans le panier
        return { code: 400, msg: "Product already in cart" };
      } else {
        await fetchProduct(productId, productNumber, shoppingCart);
        return { code: 200, msg: "Product added to cart" };
      }
    } else {
      // Si shoppingCart est vide
      await fetchProduct(productId, productNumber, shoppingCart);

      return { code: 200, msg: "Product added to cart" };
    }
  },
  removeFromShoppingCart = (productId: string) => {
    const item = shoppingCart.findIndex(
      (obj: { id: string }) => obj.id === productId
    );
    console.log(productId, item);
    if (item !== -1) shoppingCart.splice(item, 1);
  },
  resetShoppingCart = () => {
    shoppingCart = shoppingCart.splice(0, shoppingCart.length);
    console.log(shoppingCart);
    saveStorage('cart', shoppingCart);
  };

export const useCartStore = defineStore("cart", () => {
  computed({
    get() {
      getShoppingCart;
    },
    set() {
      addToShoppingCart;
      removeFromShoppingCart;
      resetShoppingCart;
      shoppingCart;
    },
  });
  return {
    addToShoppingCart,
    removeFromShoppingCart,
    resetShoppingCart,
    shoppingCart,
  };
});
