const { data: categorie } = await useAsyncData("Categorie", () => {
  return $directus.request(
    $readItems("Categorie", {
      fields: ["id", "name", "value", "icon", "product_id"],
      filter: {
        value: {
          _eq: "promotion",
        },
      },
    })
  );
});

const somePosts = await $directus.request(
  $readItems("Product_Categorie", {
    filter: { id: { _eq: 7 } },
    fields: ["id", "product_id"],
  })
);

// productCategorie
export const product_categorie = async (
  array: globalThis.Ref<unknown, unknown>,
  final: Array<object>
) => {
  array.value?.map((obj: { product_id: any[] }) => {
    return obj.product_id.map(
      async (item: any) =>
        await fetch(
          `http://localhost:3000/directus/items/Product_Categorie?filter[id][_eq]=${item}`
        )
          .then((res) => res.json())
          .then((res) => res.data)
          .then((res) =>
            final.unshift(res.reduce((acc: any, value: any) => acc + value))
          )
    );
  });
};
// productCategorie, product
export const getAllProductsInPromotion = async (
  array: Array<object>,
  final: Array<object>
) => {
  array.map(async (obj) => {
    return await fetch(
      `http://localhost:3000/directus/items/Product?filter[id][_eq]=${obj.Product_id}`
    )
      .then((res) => res.json())
      .then((res) => res.data)
      .then((res) => final.push(res));
  });
};

const carousel = reactive<
  {
    title: string;
    link: string;
    img: {
      link: string;
      label: string;
    };
  }[]
>([
  {
    title: "Un titre d'un element",
    link: "/categories/all-flags",
    img: { label: "Image of a random element", link: "./img/logo.png" },
  },
]);

/* return $directus.request($readItems('Product_Categorie', {
            fields: ['id', 'product_id', 'categorie_id'],
            filter: {
                id: {
                    _eq: categorie.value?.map((obj) => obj.product_id.map((item) => item)).reduce((acc, value) => acc + value)
                },
            },
            limit: 6,
        })); */

/* const { data: product } = await useAsyncData('Product', () => {
        return $directus.request($readItems('Product', {
            fields: ['id', 'title', 'image_id', 'date_created', 'date_updated', 'slug'],
            filter: {
                id: {
                    _eq: productCategorie.map((obj) => obj.Product_id)
                },
            },
            limit: 6,
        }));
    }); */

/* const { data: image } = await useAsyncData('Image', () => {
        return $directus.request($readFiles({
            filter: {
                product_id: {
                    _eq: `${product.value?.map(obj => obj.id)}`
                },
            },
            limit: 6,
        }));
    }); */

/* categorie.value?.map((obj: {product_id: string[]}) => {
        return obj.product_id.map((item: string) => images.push(item))
    }
    ) */
/* 
    const { data: image, error: error, pending: pending } = await useAsyncData('Image', () => {
        return $directus.request($readFiles({
            filter: {
                product_id: {
                    _eq: `${product.value?.map(obj => obj.id)}`
                },
            },
            limit: 6,
        }));
    }); */
