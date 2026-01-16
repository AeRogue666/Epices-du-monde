<script setup lang="ts">
import { capitalize } from 'vue';

const cartStore = useCartStore(),
    { ensureProducts } = useEnsureCartProducts(),
    { mergedCart } = useMergeCart(),
    toast = useToast();

const isOpen = ref<boolean>(true);

const removeProductFromCart = (id: string) => {
    cartStore.removeItem(id);
    toast.add({
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

watch(mergedCart, (newMerge) => {
    console.log('Merged cart updated: ', newMerge)
}, { deep: true })
</script>

<template>
    <UContainer class="flex flex-col justify-center items-center w-full gap-3">
        <h1 class="text-2xl font-semibold">{{ capitalize('shoppingCart') }}</h1>
        <div class="flex flex-col md:flex-row">
            <UContainer :show="mergedCart" class="flex flex-col justify-center items-center w-full h-full gap-4">
                <UCollapsible v-model:open="isOpen" class="flex flex-col items-baseline w-66 lg:w-228 mx-6 my-3 gap-2">
                    <UButton class="group" color="neutral" variant="ghost" trailing-icon="fa6-solid:chevron-down" :ui="{
                        trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
                    }" block>
                        <span class="text-base font-semibold">{{ capitalize('open') }}</span>
                    </UButton>
                    <template #content>
                        <CartMoleculesCartItem v-for="item of mergedCart" :product="item.product"
                            :quantity="item.quantity" :unavailable="item.unavailable"
                            @remove-product-from-cart="removeProductFromCart" :key="item.productId" />
                    </template>
                </UCollapsible>
                <UContainer v-if="cartStore.cartError">
                    <span>{{ cartStore.cartError }}</span>
                </UContainer>
            </UContainer>
            <div v-show="!mergedCart">
                <span class="text-sm">{{ capitalize($t('header.cart.no_product')) }}</span>
            </div>
            <UContainer class="w-auto">
                <UCard v-if="mergedCart" class="w-auto">
                    <p class="flex flex-col text-base font-bold my-6">
                        <span>{{ capitalize('panier') }}: {{ cartStore.totalItems }} {{ capitalize('produit') }}{{
                            cartStore.totalItems > 1 ? 's' : '' }}</span>
                        <span>{{ capitalize('total') }}: {{ cartStore.totalPrice }} €</span>
                    </p>
                    <p v-for="item of mergedCart"
                        class="flex flex-row justify-content items-center w-auto h-auto gap-3">
                        <span>{{ item.product.title }}</span>
                        <span>x {{ item.quantity }}</span>
                    </p>
                    <UButton color="success" variant="solid" to="/cart" size="xl" icon="fa7-solid:cart-shopping"
                        trailing-icon="fa7-solid:arrow-right" class="w-auto border-2 border-solid rounded-lg" :ui="{
                            base: 'w-full'
                        }">{{ capitalize('payer') }}</UButton>
                </UCard>
            </UContainer>
        </div>
    </UContainer>
</template>