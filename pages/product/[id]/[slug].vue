<script setup lang="ts">
import { getStorage } from '~/assets/js/storageFunctions';
import ProductContainerOrganism from '~/components/product/organisms/productContainerOrganism.vue';

const { id } = useRoute().params,
    toast = useToast(),
    piniaCart = usePiniaCartStore(),
    { items, code, msg } = storeToRefs(piniaCart),
    { $directus, $readItem, $readFile } = useNuxtApp(),
    config = useRuntimeConfig(),
    apiPublicEndpoint = config.public.apiBase;

const cartNumber = computed(() => items.value ? items.value.findIndex((item) => item.id == id) : -1);
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
        id: string,
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
        },
        tags?: [],
        allergies?: [],
        nutrition?: [],
        labels?: [],
    }[]>([]);

const { data: product } = await useAsyncData('Product', () => {
    return $directus.request($readItem('Product', id.toString()))
}),
    { data: img } = await useAsyncData('Image', () =>
        $fetch(`${apiPublicEndpoint}/files?filter[id][_eq]=${product.value?.image_id}&fields=id,description,width,height`)
    );

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
        })
};

const addToCart = (nb: number) => {
    // const { code, msg } = useCartStore().addToShoppingCart(id.toLocaleString(), nb);
    // showToast(code, msg)
    piniaCart.addItem(id, nb);
    showToast(code.value, msg.value);
},
    showToast = (code: number, msg: string) => {
        if (code === 200) {
            toast.add({
                title: msg,
                description: '',
                actions: [{
                    icon: '',
                    label: '',
                    color: 'success',
                    variant: 'outline',
                    onClick(event) {
                        event.stopPropagation()
                    },
                }]
            })
        } else if (code === 400) {
            toast.add({
                title: msg,
                description: 'Too bad!',
                actions: [{
                    icon: 'i-lucide-refresh-cw',
                    label: 'Retry',
                    color: 'error',
                    variant: 'outline',
                    onClick(event) {
                        event.stopPropagation()
                    },
                }]
            })
        }
    };

onMounted(() => {
    product ? img : ''
    product && img ? productAssemble() : ''
})

if (import.meta.client) {
    usePiniaCartStore().loadCartFromLocalStorage
}
</script>

<template>
    <ProductUiProductSkeleton v-if="productsList.length == 0" />
    <ProductContainerOrganism v-else :products-list="productsList" :cart-number="cartNumber" v-model="productNumber"
        @change-products-number="addToCart" />
</template>