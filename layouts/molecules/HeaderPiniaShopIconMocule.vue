<script setup lang="ts">
import { capitalize } from 'vue';
import HeaderCartItem from './HeaderCartItem.vue';

const props = defineProps<{
    error?: string | null,
}>();

const cartStore = useCartStore(),
    { ensureProducts } = useEnsureCartProducts(),
    { mergedCart } = useMergeCart();

const isOpen = ref<boolean>(false),
    isLoading = ref<boolean>(false),
    isLoaded = ref<boolean>(false),
    data = shallowRef<any>(null);

const loadCartProducts = async () => {
    if (isLoading.value || isLoaded.value) return

    isLoading.value = true

    try {
        const ids = cartStore.cart.map(i => i.productId);
        if (!ids.length) {
            data.value = [];
            return
        }

        data.value = await useCartProducts().fetchProducts(ids);
        isLoaded.value = true
    } catch (error) {
        console.error('Cart loading failed', error);
    } finally {
        isLoading.value = false
    }
},
    removeProductFromCart = (id: string) => {
        cartStore.removeItem(id);
        useToast().add({
            title: 'Produit supprimé',
            description: 'Annuler ?',
            actions: [
                {
                    label: 'Annuler',
                    onClick: () => cartStore.undoRemove(),
                },
            ],
        })
    };

watch(cartStore, (newCart) => {
    console.log('Cart updated', newCart.cart);
}, { deep: true });

watch(() => cartStore.cart.map(i => i.productId), (ids) => {
    if (ids.length) ensureProducts(ids);
}, { immediate: true });
</script>

<template>
    <USlideover v-model:open="isOpen" :title="capitalize($t('header.cart.title'))"
        :description="capitalize($t('header.cart.description', cartStore.totalItems))" side="right">
        <UChip :show="cartStore.totalItems > 0" :text="cartStore.totalItems" color="info" size="3xl"
            position="top-right">
            <UButton icon="i-fa6-solid:cart-shopping" color="neutral" variant="ghost" size="xl" class="rounded-full"
                @click="loadCartProducts()" />
        </UChip>

        <template #body>
            <div :show="isLoaded">
                <UContainer v-if="data && data.length">
                    <HeaderCartItem v-for="item in mergedCart" :product="item.product" :quantity="item.quantity"
                        :unavailable="item.unavailable" @remove-product-from-cart="removeProductFromCart"
                        :key="item.productId" />
                </UContainer>
                <span v-else class="text-sm">{{ capitalize($t('header.cart.no_product')) }}</span>
                <UContainer v-if="error">
                    <span>{{ error }}</span>
                </UContainer>
            </div>
        </template>

        <template #footer>
            <UContainer class="flex flex-col xl:grid xl:grid-cols-1 items-center w-full gap-3">
                <UButton color="error" variant="ghost" size="xl" icon="i-fa6-solid:trash-can"
                    @click.prevent="cartStore.clearCart" class="w-auto border-2 border-solid rounded-lg" :ui="{
                        base: 'w-full'
                    }">{{ capitalize($t('header.cart.reset_cart_content')) }}</UButton>
                <UButton color="success" variant="solid" to="/cart" size="xl" icon="i-fa6-solid:cart-shopping"
                    trailing-icon="i-fa6-solid:arrow-right" class="w-auto border-2 border-solid rounded-lg" :ui="{
                        base: 'w-full'
                    }">{{ capitalize($t('header.cart.view_cart')) }}</UButton>
            </UContainer>
        </template>
    </USlideover>
</template>