<script setup lang="ts">
import ProductContainerOrganism from '~/components/product/organisms/productContainerOrganism.vue';
import Toaster from '~/layouts/atoms/Toaster.vue';

const { id } = useRoute().params,
    piniaCart = usePiniaCartStore(),
    { cart, cartError } = storeToRefs(piniaCart),
    { $directus, $readItem } = useNuxtApp(),
    config = useRuntimeConfig(),
    apiPublicEndpoint = config.public.apiBase;

const cartNumber = computed(() => cart.value ? cart.value.findIndex((item) => item.id == id) : -1);

const productNumber = ref<number>(1),
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
    productsList = reactive<{
        id: string | number,
        title: string,
        description: string,
        ingredients: string,
        slug: string,
        origine: string,
        marque: string,
        poids_net?: number,
        price: number,
        price_per_kg: number,
        reduction_rate?: number,
        old_price?: number,
        stock: number,
        availability?: {
            name: string,
            value: string,
            color: string,
        },
        image: {
            id: string,
            description: string,
            width?: number,
            height?: number,
        },
        tags?: [],
        allergies?: [],
        nutrition?: [],
        labels?: Label[],
    }[]>([]);

const { data: product } = await useAsyncData(`Product:${id}`, () => {
    return $directus.request($readItem('Product', `${id}`))
}),
    { data: img } = await useAsyncData('Image', () =>
        $fetch(`${apiPublicEndpoint}/files?filter[id][_eq]=${product.value?.image_id}&fields=id,description,width,height`)
    ),
    productLabel = await fetch(`${apiPublicEndpoint}/items/Product_Label?filter[Product_id][_eq]=${id}`).then(res => res.json()).then(res => res.data),
    { data: label, status, error } = await useAsyncData('Label', async () => {
        return await Promise.all(
            productLabel.map((item: { Label_id: number; }) => $fetch(`${apiPublicEndpoint}/items/Label?filter[id][_eq]=${item.Label_id}`)
                .then((res: any) => res.data)
            )
        )
    });

const productAssemble = () => {
    const type = availabilityTypeList.filter((type) => type.value === product.value?.availability)[0];
    if (product.value && img.value)
        productsList.push({
            id: product.value.id,
            title: product.value.title,
            description: product.value.description,
            ingredients: product.value.ingredients,
            slug: product.value.slug,
            origine: product.value.origine,
            marque: product.value.marque,
            poids_net: product.value.poids_net,
            price: product.value.price,
            price_per_kg: product.value.price_per_kg,
            reduction_rate: product.value.reduction_rate,
            old_price: product.value.old_price,
            stock: product.value.stock,
            availability: type,
            image: img.value.data,
            labels: label.value?.flat(1),
        })
};

const addToCart = (nb: number) => {
    piniaCart.addItem(JSON.stringify(id), nb);
    console.log(cart.value)
};

onMounted(() => {
    product ? img : ''
    productLabel ? label : ''
    product && img && label ? productAssemble() : ''
    console.log('Product: ', product.value, ' ProductsList: ', productsList)
    console.log('productLabel: ', productLabel.value, ' Label: ', label.value?.flat(1), ' Status: ', status.value, ' Error: ', error.value);
})

if (import.meta.client) {
    usePiniaCartStore().loadCartFromLocalStorage
}
</script>

<template>
    <ProductUiProductSkeleton v-if="productsList.length == 0" />
    <ProductOrganismsProductPageContent v-else :products-list="productsList" :cart-number="cartNumber"
        v-model="productNumber" @change-products-number="addToCart" />
    <Toaster v-if="error" :event="cartError" />

    <!-- <ProductContainerOrganism v-else :products-list="productsList" :cart-number="cartNumber" v-model="productNumber"
        @change-products-number="addToCart" /> -->
</template>