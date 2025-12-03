<script setup lang="ts">
import ProductsItem from '~/components/products/organisms/productsItem.vue';
import ProductsFilterModal from '~/components/products/organisms/productsFilterModal.vue';
import ProductsTagsList from '~/components/products/molecules/productsMoleculesTagsList.vue';
import { capitalize } from 'vue';
import { readItems } from '@directus/sdk';

const { query } = useRoute(),
    { $directus, $readItem, $readItems } = useNuxtApp(),
    config = useRuntimeConfig(),
    apiPublicEndpoint = config.public.apiBase;

const image = reactive<{
    id: string,
    description: string,
    width?: number,
    height?: number,
}[]>([]),
    availabilityTypeList = reactive<{
        name: string,
        value: string,
        color: string,
    }[]>([
        {
            name: 'Available soon',
            value: 'soon',
            color: 'black',
        },
        {
            name: 'In stock',
            value: 'in_stock',
            color: 'green',
        },
        {
            name: 'Out of stock',
            value: 'out_of_stock',
            color: 'red',
        },
    ]),
    categoriesToMakeList = reactive<{
        id: number,
        label: string,
        children: Array<number>
    }[]>([
        {
            id: 1, label: 'Tous les drapeaux', children: [1, 2, 3, 4, 5, 6]
        },
        {
            id: 2, label: 'Epices et Sauces', children: [7, 8, 9, 10, 11, 12, 13, 14, 15]
        },
        {
            id: 3, label: 'Assaisonnements', children: [16]
        },
        {
            id: 4, label: 'Boissons alcoolisées', children: [17, 18]
        },
        {
            id: 5, label: 'Boissons sucrées & Soda', children: [19, 20, 21]
        },
        {
            id: 6, label: 'The, Tisane & Boissons chaudes', children: [22, 23, 24]
        },
        {
            id: 7, label: 'Aperitifs & Collations', children: [25, 26, 27, 28]
        },
        {
            id: 8, label: 'Sucre & Miel', children: [29]
        },
        {
            id: 9, label: 'Feculents, Sauces, & Preparations', children: [30, 31, 32, 33, 34]
        },
        {
            id: 10, label: 'Fruits & Legumes', children: [35, 36, 37, 38, 39]
        },
        {
            id: 11, label: 'Produits de la mer', children: [40, 41, 42, 43]
        },
        {
            id: 12, label: 'Insectes comestibles', children: [44]
        },
        {
            id: 13, label: 'Cosmétiques', children: [45, 46]
        },
        {
            id: 14, label: 'Ustensiles de cuisine', children: [47]
        },
        {
            id: 15, label: 'Encens, Baguettes & Decorations', children: [48, 49, 50]
        },
    ]),
    tagsList = reactive<{
        id: number,
        label: string,
    }[]>([]),
    categoriesList = reactive<{
        id: number,
        label: string,
        children: Array<{
            id: number,
            label: string,
            value: string,
            checked?: boolean,
        }>
    }[]>([]),
    productsList = reactive<{
        id: string,
        title: string,
        description: string,
        image: {
            id: string,
            description: string,
            width?: number,
            height?: number,
        },
        slug: string,
        price: number,
        reduction_rate?: number,
        old_price?: number,
        availability: {
            name?: string,
            value?: string,
            color?: string,
        },
    }[]>([]);

const productSkeletonLength = ref<number>(6),
    itemsPerPage = ref<number>(18),
    pages = ref<number>(1 | productsList.length / itemsPerPage.value),
    productLimit = ref<number>(15),
    filterQuery = reactive(['[status][_eq]=published']),
    productsLength = ref<number>(0);

// Functions for without and with queries
const updateTagsList = (v: number) => {
    const find = tagsList.findIndex((obj) => obj.id === v);
    // console.log(v, tagsList, find), updateCheckedStateToCategories(tagsList[find].label)
    tagsList.splice(find, 1);
},
    productsAssemble = (product: any[], image: any[]) => {
        product.map((obj, i) => {
            const type = availabilityTypeList.filter((type) => type.value === obj.availability)[0];
            const img = image.filter((item) => item.id === obj.image_id)[i];
            return productsList.unshift({
                id: obj.id,
                title: obj.title,
                description: obj.description,
                image: img,
                slug: obj.slug,
                price: obj.price,
                reduction_rate: obj.reduction_rate,
                old_price: obj.old_price,
                availability: {
                    name: type?.name,
                    value: type?.value,
                    color: type?.color,
                },
            })
        })
    };

// Without queries

/* const { data: productData, status: productStatus, error: productError } = await useAsyncData('Product', async () => {
    // return $fetch(`${apiPublicEndpoint}/items/Product?filter[status][_eq]=published&sort=date_created&page=1`).then((res: any) => res.data)
    return $directus.request(readItems('Product', {
        page: pages.value,
        limit: productLimit.value,
        fields: ['id', 'status', 'title', 'description', 'slug', 'price', 'price_per_kg', 'old_price', 'availability', 'image_id', 'Product_Categorie', 'Product_Label']
    }))
}, {
    getCachedData(key, nuxtApp) {
        return nuxtApp.payload.data[key] || nuxtApp.static.data[key] || null;
    }
}); */

/* const products = await $directus.request(readItems('Product', {
    page: pages.value,
    limit: productLimit.value,
    fields: ['id','status','title','description','slug','price','price_per_kg','old_price','availability','image_id','Product_Categorie','Product_Label']
}))
.then(async (res: any[]) => {
    // map and get image_id
    return res.map(async (item: any) => {
        return {
            ...item,
            image_id: await $fetch(`${apiPublicEndpoint}/files?filter[id][_eq]=${item.image_id}&fields=id,description,width,height`).then((res: any) => res.data)
        }
    })
 
    return await Promise.all(
        res.map(async (item: any) => {
            return await $fetch(`${apiPublicEndpoint}/files?filter[id][_eq]=${item.image_id}&fields=id,description,width,height`).then((res: any) => res.data)
        })
    )
 
    return res.map((item: any) => {
        return {
            ...item,
            image_id: {
                default: `${apiPublicEndpoint}/assets/${item.image_id}`
            },
        }
    })
}); */
/* const { data: imageData, status: imageStatus, error: imageError }= await useAsyncData('Image', async () => {
    await Promise.all(
        productsDataList.map(async (item) => {
            return await $fetch(`${apiPublicEndpoint}/files?filter[id][_eq]=${item.image_id}&fields=id,description,width,height`).then((res: any) => res.data)
        })
    )
}); */

const readAllProducts = async () => {
    const products = await fetch(`${apiPublicEndpoint}/items/Product?filter[status][_eq]=published&sort=date_created`)
        .then(res => res.json())
        .then(res => res.data),
        readImage = await Promise.all(
            products.map(async (item: { image_id: string; }) => {
                await fetch(`${apiPublicEndpoint}/files?filter[id][_eq]=${item.image_id}&fields=id,description,width,height`)
                    .then(res => res.json())
                    .then(res => res.data)
                    .then(res => image.push(res.reduce((acc: any, value: any) => acc + value)))
            })
        );

    products ? readImage : ''
    products && image ? productsAssemble(products, image) : ''
},
    readAllCategories = async () => {
        const categories = await fetch(`${apiPublicEndpoint}/items/Categorie`)
            .then(res => res.json())
            .then(res => res.data),
            categoriesAssemble = () => {
                return categoriesToMakeList.map((obj, i) => {
                    categoriesList.push({ id: obj.id, label: obj.label, children: [] });
                    obj.children.map((value) => {
                        categories.filter((content: { id: number; }) => content.id == value).map((res: { id: number; name: string; value: string; }) => {
                            return categoriesList[i]?.children.push({ id: res.id, label: res.name, value: res.value, checked: false })
                        })
                    })
                })
            };
        categories ? categoriesAssemble() : ''
    };

// With queries
const readCategoriesByQueries = async () => {
    const categories = await fetch(`${apiPublicEndpoint}/items/Categorie?filter[value][_eq]=${query.categories}`).then(res => res.json()).then(res => res.data),
        products = await Promise.all(
            categories.map((obj: { product_id: number[]; }) => obj.product_id.map(async (value: number) => {
                return await fetch(`${apiPublicEndpoint}/items/Product?filter[id][_eq]=${value}&filter[status][_eq]=published&sort=date_created`).then(res => res.json()).then(res => res.data)
            })).reduce((acc: any, value: any) => acc + value)
        ),
        readImage = await Promise.all(
            products.map(async (item: { image_id: string; }) => {
                await fetch(`${apiPublicEndpoint}/files?filter[id][_eq]=${item.image_id}&fields=id,description,width,height`)
                    .then(res => res.json())
                    .then(res => res.data)
                    .then(res => image.push(res)) // .reduce((acc: any, value: any) => acc + value)
            })
        );

    categories ? products : ''
    products.length !== 0 ? readImage : ''
    products && image ? productsAssemble(products, image) : ''
},
 { data: productData, error: productError, execute, refresh, clear } = await useFetch(`${apiPublicEndpoint}/items/Product?filter[status][_eq]=published&sort=date_created`);

onMounted(() => {
    if (query.categories) {
        query.categories ? readCategoriesByQueries() : ''
        query.search ? '' : ''
        query.categories && query.search ? '' : ''
    } else {
        readAllProducts();
        readAllCategories();
        // productData.value ? productsDataList.push(productData.value) : ''
        // productData.value && image ? productsAssemble(productData.value, image) : ''
        // products ? productsLength.value = products.length : ''
        // console.log(products)
        productsList ? productsLength.value = productsList.length : ''
        console.log(productsList)

        console.log(productData.value, productError.value)
    }
});

watch(useRoute(), (newRoute) => {
    console.log(newRoute.query)
    if (newRoute.query.categories || newRoute.query.search) {
        productsList.splice(productsList.length, 1);
        readAllProducts();
        readAllCategories();
        // products ? productsLength.value = products.length : ''
        // console.log('Updated content: ', products)
        productsList ? productsLength.value = productsList.length : ''
        console.log(productsList)
    }
});
</script>

<template>
    <div class="flex flex-col items-center w-full h-full gap-2">
        <h1 class="text-5xl font-semibold">Products</h1>
        <section class="flex flex-col items-center w-full h-auto gap-6">
            <div class="flex flex-col items-center mt-6 gap-4">
                <div class="flex flex-row items-center w-full h-full gap-6">
                    <ProductsFilterModal :tags-list="categoriesList" />
                    <div class="flex flex-col items-start gap-4 xl:flex-row xl:items-center">
                        <span class="text-base">Products:
                            <span class="font-semibold">{{ productsLength }}</span>
                        </span>
                    </div>
                </div>
                <ProductsTagsList :tags-list="tagsList" @id="updateTagsList" />
            </div>
            <div>
                <ul v-if="productsList.length !== 0"
                    class="flex flex-col gap-8 lg:gap-y-16 sm:grid sm:grid-cols-2 lg:grid-cols-3">
                    <li v-for="(product, i) of productsList" :key="i">
                        <ProductsItem :product="product" />
                    </li>
                </ul> <!-- max-w-60 min-w-52 max-h-48 min-h-44 2xl:grid-cols-5 -->

                <!-- <ul v-if="productsList.length !== 0"
                    class="grid grid-cols-1 items-center w-full h-auto gap-28 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    <li v-for="(item, i) of productsList" :key="i">
                        <ProductsItem :product="item" />
                    </li>
                </ul> -->
                <!-- <UEmpty v-else-if="!productsList && productStatus == 'success'"
                    :title="capitalize('aucun produit trouvé')"
                    :description="capitalize(`il semble qu'aucun projet n'a été trouvé.`)" icon="fa6-solid-file" /> -->

                <ul v-else
                    class="grid grid-cols-1 items-center w-full h-auto gap-28 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    <li v-for="(item, i) of productSkeletonLength" :key="i">
                        <ProductsUiProductsItemSkeleton :key="item" />
                    </li>
                </ul>
            </div>
            <span>{{ productData }}</span>
            <button @click.prevent="() => refresh()">Refresh data</button>
            <button @click.prevent="() => clear()">Clear data</button>
            <UPagination v-model:page="pages" :items-per-page="itemsPerPage" :sibling-count="1" show-edges show-controls
                active-color="neutral" active-variant="solid" variant="ghost" :total="productsList.length" />
        </section>
    </div>
</template>