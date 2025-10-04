<script setup lang="ts">
import { capitalize, type Reactive } from 'vue';
import HeaderCartItem from './HeaderCartItem.vue';

const props = defineProps<{
    newCart: Reactive<{
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
        availability: string;
        product_number: number;
    }[]>,
    show: boolean,
    shoppingCart: Reactive<{
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
        availability: string;
        product_number: number;
    }[]>,
}>();
defineEmits<{
    cartProductId: [value: string],
    cartReset: [value: boolean],
}>();
const cartLength = ref<number | undefined>();
computed(() => props.newCart !== undefined ? cartLength.value = props.newCart.length : cartLength.value = undefined);
// onMounted(() => cart.value)
</script>

<template>
    <USlideover :title="capitalize($t('header.cart.title'))"
        :description="capitalize($t('header.cart.description', shoppingCart.length))" side="right">
        <UChip :show="show" :text="cartLength" color="info" size="3xl" position="top-right">
            <UButton icon="i-fa6-solid:cart-shopping" color="neutral" variant="ghost" size="xl" class="rounded-full" />
        </UChip> <!-- :show="show" -->

        <template #body>
            <div :show="!show">
                <UContainer>
                    <HeaderCartItem v-for="(product, i) of props.newCart" :product="product" @product-id="$emit('cartProductId', product.id)" :key="i" />
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