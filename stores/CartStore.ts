import {
  clearStorage,
  getStorage,
  saveStorage,
} from "~/assets/js/storageFunctions";

export const usePiniaCartStore = defineStore("pinia-cart", {
  state: () => ({
    items: reactive<
      {
        id: string;
        title: string;
        description: string;
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
    >([]),
    code: 0,
    msg: '',
  }),
  getters: {
    loadCartFromLocalStorage() {
      this.items = getStorage("cart");
      console.log(this.items);
    },
    saveCartToLocalStorage() {
      saveStorage("cart", this.items);
    },
    cartTotal() {
      return this.items.reduce(
        (total: any, item: { price: number }) => total + item.price,
        0
      );
    },
    cartItemsCount() {
      return this.items.length;
    },
  },
  actions: {
    async addItem(id: string, nb: number) {
      const fetchProduct = async (id: string, number: number) => {
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

        if (product) img;
        if (product && img)
          this.items.push({
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
          }) && this.saveCartToLocalStorage;
      };

      if (this.items.length !== 0) {
        const isValueExist = this.items.findIndex((item) => item.id == id);
        if (isValueExist > -1) {
          // return { code: 400, msg: "Product already in cart" };
          return this.code = 400, this.msg = "Product already in cart"
        } else {
          fetchProduct(id, nb);
          // return { code: 200, msg: "Product added to cart" };
          return this.code = 200, this.msg = "Product added to cart"
        }
      } else {
        fetchProduct(id, nb);
        // return { code: 200, msg: "Product added to cart" };
        return this.code = 200, this.msg = "Product added to cart"
      }
    },
    removeItem(id: string) {
      this.items = this.items.filter((item: { id: string }) => item.id !== id);
      this.saveCartToLocalStorage
    },
    clearCart() {
      this.items = [];
      this.saveCartToLocalStorage
    },
  },
});

/* export const usePiniaCartStore = defineStore("pinia-cart", {
  state: () => ({
    items: reactive<
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
    >([]),
  }),
  getters: {
    cartTotal() {
      return this.items.reduce(
        (total: any, item: { price: number }) => total + item.price,
        0
      );
    },
    cartItemsCount() {
      return this.items.length;
    },
  },
  actions: {
    addItem(item: any) {
      this.items.push(item);
    },
    removeItem(id: string) {
      this.items = this.items.filter((item: { id: string }) => item.id !== id);
    },
    clearCart() {
      this.items = [];
    },
  },
});
 */
