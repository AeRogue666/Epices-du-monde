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

interface Error {
  code: number;
  msg: string;
  color: "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral" | undefined;
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
    error: ref<Error>({ code: 0, msg: "", color: undefined }),
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
      const toast = useToast(),
        fetchProduct = async (id: string, number: number) => {
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

            if (product.stock > 0 && this.availibility?.value === "in_stock") {
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
              }),
                this.saveCartToLocalStorage;
              (this.error.code = 200), (this.error.msg = "Product added to cart"), this.error.color = 'success';
              // toaster(this.error.code, this.error.msg, 'success');
            } else {
              this.error.code = 500, this.error.msg = `Product ${product.title} can not be added to cart`, this.error.color = 'error';
              // toaster(this.error.code, this.error.msg, 'error');
            }
          }
        },
        toaster = (code: number, msg: string, color: "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral" | undefined) => {
          toast.add({
          title: msg,
          description: `Code: ${code}`,
          color: color,
        })
        };
      if (this.cart.length !== 0) {
        const isValueExist = this.cart.findIndex((item) => item.id == id);
        if (isValueExist > -1) {
          this.error.code = 400, this.error.msg = "Product already in cart", this.error.color = 'warning';
          // toaster(this.error.code, this.error.msg, 'warning');
        } else {
          fetchProduct(id, nb);
        }
      } else {
        fetchProduct(id, nb);
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

/* interface Image {
  id: string;
  description: string;
  width?: number;
  height?: number;
} */

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
