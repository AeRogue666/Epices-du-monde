<script setup lang="ts">
    import { UCard } from '#components';
    defineProps<{
        product: {
            id: number,
            title: string,
            image: string,
            image_description: string,
            slug: string,
            new_price: number,
            old_price: number,
            stock_status: {
                status: string,
                color: string,
            },
        },
    }>();
</script>

<template>
    <a :href="`/product/${product.id}/${product.slug}`" class="no-hunderline hover:text-blue-600" :key="product.id">
        <UCard class="flex flex-col items-center">
            <template #header>
                <div class="flex flex-row items-center w-full gap-4">
                    <UIcon name="fa6-solid:circle" :style="`color: ${product.stock_status.color}`" /> <!-- :class="`text-${product.stock_status.color}-600`" -->
                    <span class="text-base font-semibold">{{ product.stock_status.status }}</span>
                </div>
            </template>

            <div class="flex flex-col items-center w-full h-auto gap-4">
                <picture>
                    <img :src="product.image" class="rounded-lg" :alt="product.image_description">
                </picture>

                <h2 class="text-3xl font-semibold">{{ product.title }}</h2>

            </div>

            <template #footer>
                <div class="flex flex-row items-center gap-6">
                    <span class="text-lg font-semibold">{{ product.new_price }} €</span>
                    <span class="text-base line-through">{{ product.old_price }} €</span>
                </div>
            </template>
        </UCard>
    </a>
</template>