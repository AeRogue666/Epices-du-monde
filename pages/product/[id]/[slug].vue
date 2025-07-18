<script setup lang="ts">
    import { UContainer } from '#components';

    const route = useRoute();
    
    const product = reactive<{
        id: number,
        title: string,
        description: string,
        ingredients: string,
        slug: string,
        origine: string,
        marque: string,
        poids_net: string,
        price: number,
        price_per_kg: number,
        reduction_rate: number,
        old_price: number,
        stock: {
            availability: string, //(in_stock, no_stock, soon)
            number: number,
            color: string,
        },
        image: Array<{
            id: number,
            image: string,
            description: string,
            type: string,
            format: string,
            width: number,
            height: number,
        }>,
        tags?: [],
        allergies?: [],
        nutritionnals_values?: [],
        labels?: [],
    }[]>([
        {
            id: 1,
            title: 'Product Title',
            description: '',
            slug: 'product-title',
            origine: '',
            marque: '',
            poids_net: '1 kg',
            ingredients: '',
            price: 1.11,
            price_per_kg: 1.11,
            reduction_rate: 0,
            old_price: 1.11,
            stock: {
                availability: 'In stock',
                number: 2,
                color: 'green',
            },
            image: [{
                id: 1,
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Real_Monasterio_de_San_Juan_de_la_Pe%C3%B1a%2C_Huesca%2C_Espa%C3%B1a%2C_2023-01-05%2C_DD_48-50_HDR.jpg/330px-Real_Monasterio_de_San_Juan_de_la_Pe%C3%B1a%2C_Huesca%2C_Espa%C3%B1a%2C_2023-01-05%2C_DD_48-50_HDR.jpg',
                description: 'Une image du Monastère de San Juan de la Pena Huesca en Espagne',
                type: 'image',
                format: 'image/jpeg',
                width: 330,
                height: 174,
            }],
        }
    ]);
</script>

<template>
    <UContainer v-for="(product, i) of product" class="flex flex-col items-center w-full h-full gap-2"
        :key="i + product.id">
        <h1 class="text-5xl font-semibold">{{ product.title }}</h1>
        <section class="flex flex-col items-center w-full h-auto gap-6">
            <nuxt-picture v-for="(img, i) of product.image" :legacy-format="img.format" :src="img.image"
                :alt="img.description" :width="img.width" :height="img.height" :key="i + img.id" />
            <product-components-product-infos-modal :origine="product.origine" :marque="product.marque"
                :poids_net="product.poids_net" :price="product.price" :price_per_kg="product.price_per_kg"
                :reduction_rate="product.reduction_rate" :old_price="product.old_price" :stock="product.stock" />
        </section>
    </UContainer>
</template>