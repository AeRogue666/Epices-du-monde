<script setup lang="ts">
const route = useRoute(),
    { cart, addItem } = useCartStore(),
    config = useRuntimeConfig(),
    apiPublicEndpoint = config.public.apiBase;

const productId = computed(() => String(route.params.id));

const { data: product, pending, error, refresh } = await useAsyncData(`product-${route.params.id}`, () =>
    $fetch(`${apiPublicEndpoint}/items/Product`, {
        params: {
            filter: {
                id: { _eq: route.params.id },
                status: { _eq: 'published' }
            },
            fields: [
                'id',
                'title',
                'description',
                'price',
                'old_price',
                'reduction_rate',
                'stock',
                'availability',
                'image_id',
                'slug',
                'ingredients',
                'marque',
                'origine',
                'Product_Categorie',
            ]
        }
    }).then((res: any) => res.data?.[0]),
    { server: true }
);

const addToCart = async (nb: number) => {
    addItem(productId.value, nb, product.value!.stock);
};
</script>

<template>
    <!-- Loading state -->
    <ProductUiProductSkeleton v-if="pending" />
    <!-- Product loaded -->
    <ProductOrganismsProductPageContent v-else-if="product" :product="product" @change-products-number="addToCart" />
    <!-- Error state -->
    <!-- <Toaster v-else-if="error" :event="cartError" /> -->
    <!-- Empty state -->
    <div v-else>
        <p>Aucun produit ne correspond à vos critères de recherche.</p>
        <UButton @click.prevent="refresh()" color="neutral" variant="outline">Refresh</UButton>
    </div>
</template>