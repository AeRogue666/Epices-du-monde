<script setup lang="ts">
    import { UContainer } from '#components';

    const { id } = useRoute().params,
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
        if(product.value && img.value)
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

    onMounted(() => {
        product ? img : ''
        product && img ? productAssemble() : ''
    })
</script>

<template>
    <UContainer v-for="(product, i) of productList" class="flex flex-col items-center w-full h-full gap-2"
        :key="i + product.id">
        <h1 class="text-5xl font-semibold">{{ product.title }}</h1>
        <section class="flex flex-col items-center w-full h-auto gap-6">
            <nuxt-picture v-for="(img, i) of product.image" legacy-format="image"
                :src="`http://localhost:3000/directus/assets/${img.id}`"
                :img-attrs="{ id: img.id, class: 'rounded-xl' }" :alt="img.description" :key="i + img.id" />
            <product-components-product-infos-modal :product="product" />
            <ProductComponentsProductDescriptionModal :source="product.description" />
        </section>
    </UContainer>
</template>