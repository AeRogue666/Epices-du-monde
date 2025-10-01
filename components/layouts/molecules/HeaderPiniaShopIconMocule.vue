<script setup lang="ts">
import { capitalize, type Reactive } from 'vue';
import HeaderCartItem from './HeaderCartItem.vue';

interface Cart {
    id: string;
    title: string;
    description: string;
    image: Image;
    slug: string;
    poids_net: number;
    price: number;
    price_per_kg?: number;
    reduction_rate?: number;
    old_price?: number;
    stock: number;
    availability?: Availability;
    product_number: number;
}

interface Availability {
  name: string;
  value: string;
  color: string;
}

defineProps<{
    items: Reactive<Cart[]>,
    total: any,
    count: any,
    show: boolean,
}>();

defineEmits<{
    cartReset: [value: boolean],
    productId: [value: string],
}>();

/* {
        id: string;
        title: string;
        image: {
            id: string;
            description: string;
            width?: number;
            height?: number;
        };
        slug: string;
        poids_net: number;
        price: number;
        price_per_kg?: number;
        reduction_rate?: number;
        old_price?: number;
        stock: number;
        availability: {
            name: string;
            value: string;
            color: string;
        };
        product_number: number;
    }[] */
</script>

<template>
    <USlideover :title="capitalize($t('header.cart.title'))"
        :description="capitalize($t('header.cart.description', count))" side="right">
        <UChip :show="show" :text="count" color="info" size="3xl" position="top-right">
            <UButton icon="i-fa6-solid:cart-shopping" color="neutral" variant="ghost" size="xl" class="rounded-full" />
        </UChip> <!-- :show="show" -->

        <template #body>
            <div :show="!show">
                <UContainer>
                    <HeaderCartItem v-for="(product, i) of items" :product="product"
                        @product-id="$emit('productId', product.id)" :key="i" />
                </UContainer>
            </div>
            <span :show="show" class="text-sm">{{ capitalize($t('header.cart.no_product')) }}</span>
        </template>

        <template #footer>
            <UButton color="error" variant="ghost" size="xl" icon="i-fa6-solid:trash-can"
                @click.prevent="$emit('cartReset', true)" class="w-auto border-2 border-solid rounded-lg" :ui="{
                    base: 'w-full'
                }">{{ capitalize($t('header.cart.reset_cart_content')) }}</UButton>
            <UButton color="success" variant="solid" to="/cart" size="xl" icon="i-fa6-solid:cart-shopping"
                trailing-icon="i-fa6-solid:arrow-right" class="w-auto border-2 border-solid rounded-lg" :ui="{
                    base: 'w-full'
                }">{{ capitalize($t('header.cart.view_cart')) }}</UButton>
        </template>
    </USlideover>
</template>