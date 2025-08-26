<script setup lang="ts">
    import ProductContainerOrganism from '~/components/product/organisms/productContainerOrganism.vue';

    const { id } = useRoute().params,
        toast = useToast(),
        { $directus, $readItem, $readFile } = useNuxtApp();

    const { data: product } = await useAsyncData('Product', () => {
        return $directus.request($readItem('Product', id.toString()))
    }),
        { data: img } = await useAsyncData('Image', () =>
            $fetch(`http://localhost:3000/directus/files?filter[id][_eq]=${product.value?.image_id}&fields=id,description,width,height`)
        );

    const availabilityTypeList = reactive<{
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
    ]);

    const productList = reactive<{
        id: number,
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
        availability: object,
        image: object,
        tags?: [],
        allergies?: [],
        nutrition?: [],
        labels?: [],
    }[]>([]);


    const productAssemble = () => {
        const type = availabilityTypeList.filter((type) => type.value === product.value?.availability)[0];
        if (product.value && img.value)
            productList.push({
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

    const productNumber = ref<number>(1);

    const addToCart = (nb: number) => {
        const { code, msg } = useCartStore().aAddToShoppingCart(id.toLocaleString(), nb);
        showToast(code, msg)
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
</script>

<template>
    <ProductContainerOrganism :product-list="productList" v-model="productNumber" @change="addToCart" />
</template>