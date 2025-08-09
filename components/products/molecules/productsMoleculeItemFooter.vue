<script setup lang="ts">
    defineProps<{
        product: {
            id: number,
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
                name: string,
                value: string,
                color: string,
            },
        }
    }>();
</script>

<template>
    <div class="flex flex-row items-center gap-6">
        <span class="text-lg font-semibold">{{ product.price }} €</span>
        <span v-if="product.reduction_rate"
            class="absolute top-[96%] left-[11.3%] text-lg text-(--secondary-color-3) font-semibold">-{{
                product.reduction_rate }}%</span>
        <span class="text-base line-through">{{ product.old_price }} €</span>
    </div>
</template>