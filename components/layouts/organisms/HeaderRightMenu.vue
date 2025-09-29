<script setup lang="ts">
import { getStorage } from '~/assets/js/storageFunctions';
import HeaderAvatarMenu from './HeaderAvatarMenu.vue';

const { search } = useSearchQueryStore(),
    // cartStore = useCartStore(),
    // shoppingCart = cartStore.shoppingCart,
    piniaCart = usePiniaCartStore(),
    { cart, cartTotal, cartItemsCount } = storeToRefs(piniaCart),
    { isDesktop, isDesktopOrTablet, isTablet, isMobileOrTablet, isMobile } = useDevice();

const isAvatarMenuOpen = ref<boolean>(false),
    newCart = reactive<{
        id: string,
        title: string,
        image: {
            id: string,
            description: string,
            width?: number,
            height?: number,
        },
        slug: string,
        poids_net: number,
        price: number,
        price_per_kg?: number,
        reduction_rate?: number,
        old_price?: number,
        stock: number,
        availability: string,
        product_number: number,
    }[]>([]);
/* newCart = ref(Array<{
    id: string,
    title: string,
    image: {
        id: string,
        description: string,
        width?: number,
        height?: number,
    },
    slug: string,
    poids_net: number,
    price: number,
    price_per_kg?: number,
    reduction_rate?: number,
    old_price?: number,
    stock: number,
    availability: string,
    product_number: number,
}[]>), */
// show = computed(() => newCart.length !== undefined); // { shoppingCart } = storeToRefs(cartStore);
const show = computed(() => cart.value.length !== 0);

const updateAvatarMenu = () => {
    isAvatarMenuOpen.value = !isAvatarMenuOpen.value
};
/* removeCartProduct = (v: string) => {
    cartStore.removeFromShoppingCart(v)
    console.log(v);
},
resetCartProduct = () => {
    cartStore.resetShoppingCart
    console.log(shoppingCart)
}; */

if (import.meta.client) {
    watch(usePiniaCartStore().$state, (state) => {
        console.log(cart.value, state)
    });
    /* watch(usePinia().state, (state) => {
        getStorage('cart', state.cart?.cart)
    }, { deep: true });
    const get = getStorage('cart'), local = localStorage.getItem('cart');

    get.map((item: {
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
    }) => newCart.push({
        id: item.id,
        title: item.title,
        image: item.image,
        slug: item.slug,
        poids_net: item.poids_net,
        price: item.price,
        price_per_kg: item.price_per_kg,
        reduction_rate: item.reduction_rate,
        old_price: item.old_price,
        stock: item.stock,
        availability: item.availability,
        product_number: item.product_number,
    }))

    onMounted(() => {
        console.log('show: ', show.value, ' shoppingCart: ', shoppingCart, ' newCart: ', newCart)
        console.log(typeof get, get, typeof local, local)
    }); */
}
</script>

<template>
    <div class="flex flex-row justify-end items-center w-full px-6 gap-6">
        <LayoutsMoleculesHeaderSearchBarMobileVersion v-if="isMobile || isMobileOrTablet" :search="search" />
        <LayoutsMoleculesHeaderSearchBarDesktopVersion v-if="isDesktop" :search="search" />
        <!-- <LayoutsMoleculesHeaderShopIconMolecule :new-cart="newCart" :show="show" :shopping-cart="shoppingCart"
            @cart-product-id="removeCartProduct" @cart-reset="resetCartProduct" /> -->
        <LayoutsMoleculesHeaderPiniaShopIconMocule :items="cart" :total="cartTotal" :count="cartItemsCount"
            :show="show" @cart-reset="piniaCart.clearCart" @product-id="piniaCart.removeItem" />
        <UAvatar icon="fa6-solid:circle-user" class="text-4xl" size="xl" @click.prevent="updateAvatarMenu" />
        <HeaderAvatarMenu v-if="isAvatarMenuOpen == true" />
    </div>
</template>