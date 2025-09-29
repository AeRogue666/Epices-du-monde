import { getStorage, saveStorage } from "~/assets/js/storageFunctions";

interface Cart {
  id: string;
  title: string;
  description: string;
  image: Image;
  slug: string;
  poids_net: number;
  price: number;
  price_per_kg?: number;
  reduction_rate?: number;
  old_price?: number;
  stock: number;
  availability?: Availability;
  product_number: number;
}

interface Image {
  id: string;
  description: string;
  width?: number;
  height?: number;
}

interface AvailabilityList {
  name: string;
  value: string;
  color: string;
}

interface Availability {
  name: string;
  value: string;
  color: string;
}

const availabilityList = reactive<AvailabilityList[]>([
  {
    name: "Available soon",
    value: "soon",
    color: "black",
  },
  {
    name: "In stock",
    value: "in_stock",
    color: "green",
  },
  {
    name: "Out of stock",
    value: "out_of_stock",
    color: "red",
  },
]);

export const usePiniaCartStore = defineStore("pinia-cart", {
  state: () => ({
    cart: reactive<Cart[]>([]),
    availibility: ref<Availability>(),
    code: 0,
    msg: "",
  }),
  getters: {
    loadCartFromLocalStorage() {
      this.cart = getStorage("cart");
      console.log(this.cart);
    },
    saveCartToLocalStorage() {
      saveStorage("cart", this.cart);
    },
    cartTotal(): Array<Cart> {
      return this.cart.reduce(
        (total: any, item: { price: number }) => total + item.price,
        0
      );
    },
    cartItemsCount(): number {
      return this.cart.length;
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
        if (product && img) {
          this.availibility = availabilityList.filter(
            (item) => item.value == product.availability
          )[0];
          this.cart.push({
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
            availability: this.availibility,
            image: img,
            product_number: number,
          }) && this.saveCartToLocalStorage;
        }
      };

      if (this.cart.length !== 0) {
        const isValueExist = this.cart.findIndex((item) => item.id == id);
        if (isValueExist > -1) {
          // return { code: 400, msg: "Product already in cart" };
          return (this.code = 400), (this.msg = "Product already in cart");
        } else {
          fetchProduct(id, nb);
          // return { code: 200, msg: "Product added to cart" };
          return (this.code = 200), (this.msg = "Product added to cart");
        }
      } else {
        fetchProduct(id, nb);
        // return { code: 200, msg: "Product added to cart" };
        return (this.code = 200), (this.msg = "Product added to cart");
      }
    },
    removeItem(id: string) {
      this.cart = this.cart.filter((item: { id: string }) => item.id !== id);
      this.saveCartToLocalStorage;
    },
    clearCart() {
      this.cart = this.cart.splice(0, this.cart.length);
      this.saveCartToLocalStorage;
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
