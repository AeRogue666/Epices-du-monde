interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export const useProductsStore = defineStore("Product", {
  state: (): ProductsState => ({
    products: [],
    loading: false,
    error: null,
  }),

  getters: {
    allProducts: (state) => state.products,
    getProductById: (state) => (id: string) => {
      return state.products.find((item) => item.id === id);
    },
    getProductBySlug: (state) => (slug: string) => {
      return state.products.find((item) => item.slug === slug);
    },
    getProductsByCategory: (state) => (categoryId: number) => {
      return state.products.filter((product) => {
        if (Array.isArray(product.Product_Categorie)) {
          return product.Product_Categorie.some((ctg) => {
            return typeof ctg === "number"
              ? ctg === categoryId
              : ctg.id === categoryId;
          });
        }
        return false;
      });
    },
    productsOnSale: (state) => {
      return state.products.filter(
        (item) => item.reduction_rate && item.reduction_rate > 0
      );
    },
    productsInStock: (state) => {
      return state.products.filter(
        (item) => item.stock > 0 && item.availability === "available"
      );
    },
    totalProducts: (state) => state.products.length,
  },

  actions: {
    setProducts(products: Product[]) {
      this.products = products;
      this.loading = false;
      this.error = null;
    },
    addProduct(product: Product) {
      this.products.push(product);
    },
    updateProduct(id: string, updates: Partial<Product>) {
      const index = this.products.findIndex((item) => item.id === id);
      if (index !== -1) {
        this.products[index] = { ...this.products[index], ...updates };
      }
    },
    removeProduct(id: string) {
      this.products = this.products.filter((item) => item.id !== id);
    },
    setLoading(loading: boolean) {
      this.loading = loading;
    },
    setError(error: string | null) {
      (this.error = error), (this.loading = false);
    },
    reset() {
      this.products = [];
      this.loading = false;
      this.error = null;
    },
  },
});
