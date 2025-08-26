<script setup lang="ts">
    import { UContainer } from '#components';
    import ProductDescriptionMarkdownMolecule from '../molecules/productDescriptionMarkdownMolecule.vue';

    defineProps<{
        productList: Array<{
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
        }>
    }>();

    const productNumber = defineModel({ default: 1 });

    const emit = defineEmits<{
        change: [nb: number]
    }>();

    const updateNumber = (nb: number) => {
        emit('change', nb)
    }
</script>

<template>
    <UContainer v-for="(product, i) of productList" class="flex flex-col items-center w-full h-full gap-2"
        :key="i + product.id">
        <h1 class="text-5xl font-semibold">{{ product.title }}</h1>
        <section class="flex flex-col items-center w-full h-auto gap-6">
            <NuxtPicture v-for="(img, i) of product.image" legacy-format="image"
                :src="`http://localhost:3000/directus/assets/${img.id}`"
                :img-attrs="{ id: img.id, class: 'rounded-xl' }" :alt="img.description" :key="i + img.id" />
            <ProductOrganismsProductInfosModalOrganism :product="product" v-model="productNumber" @change="updateNumber" />
            <ProductDescriptionMarkdownMolecule :source="product.description" />
        </section>
    </UContainer>
</template>