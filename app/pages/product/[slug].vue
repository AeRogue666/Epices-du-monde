<script setup lang="ts">
import { PRODUCTS, CATEGORIES } from '~/data/products';

const route = useRoute();
const cartStore = useCartStore();
const toast = useToast();

const slug = computed(() => String(route.params.slug));
const product = computed(() => PRODUCTS.find((p) => p.slug === slug.value));

if (!product.value) {
    throw createError({
        status: 404,
        statusText: 'Produit introuvable',
    });
}

const quantity = ref(1);

watch(slug, () => {
    quantity.value = 1;
});

const categoryLabel = computed(() => {
    const found = CATEGORIES.find((c) => c.id === product.value?.category);
    return found ? found.label : 'Catalogue';
});

const relatedProducts = computed(() => PRODUCTS.filter((p) => p.category === product.value?.category && p.id !== product.value.id).slice(0, 4));

const breadcrumbItems = computed(() => [
    { label: "Accueil", to: "/" },
    { label: "Catalogue", to: "/products" },
    { label: categoryLabel.value, to: `/products?category=${product.value?.category}` },
    { label: product.value?.name || "Produit" },
]);

const accordionItems = computed(() => [
    {
        label: "Description détaillée",
        icon: "i-lucide-file-text",
        content: product.value?.description || "Aucune description disponible",
    },
    {
        label: "Ingrédients & Origine",
        icon: "i-lucide-sprout",
        content: product.value?.ingredients
            ? `Ingrédients : ${product.value.ingredients}. Origine : ${product.value.origin}` : `Produit authentique en provenance de : ${product.value?.origin}`
    },
    {
        label: "Livraison & Conservation",
        icon: "i-lucide-truck",
        content: "Expédition rapide sous 24/48h en France métropolitaine. Conserver dans un endroit frais et sec à l'abri de la lumière."
    }
]);

const formatPrice = (value: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(value);

const handleAddToCart = () => {
    if (!product.value || !product.value.inStock) return;
    cartStore.addItem(product.value, quantity.value);
    toast.add({
        title: "Ajouté au panier",
        description: `${quantity.value} x ${product.value.name}`,
        icon: "i-lucide-check-circle",
        color: "primary",
    });
};

useSeoMeta({
    title: () => `${product.value?.name} - Epices du Monde`,
    description: () => product.value?.description,
});
</script>

<template>
    <UContainer v-if="product" class="py-8 sm:py-12 space-y-16">
        <UBreadcrumb :items="breadcrumbItems" />

        <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-14 items-start">
            <div
                class="relative aspect-square rounded-2xl overflow-hidden border border-default bg-stone-100 dark:bg-neutral-900">
                <NuxtImg :src="product.image" :alt="product.name" width="700" height="700"
                    class="w-full h-full object-cover" />

                <div class="absolute top-4 left-4 flex gap-2">
                    <UBadge v-if="product.isPromo" color="error" variant="solid" size="md">
                        Promotion
                    </UBadge>
                    <UBadge v-if="product.isNew" color="error" variant="solid" size="md">
                        Nouveauté
                    </UBadge>
                </div>
            </div>

            <div class="space-y-6">
                <div class="space-y-2">
                    <div class="flex flex-wrap items-center gap-2 text-sm text-muted">
                        <span v-if="product.brand" class="font-semibold text-primary uppercase tracking-wide">
                            {{ product.brand }}
                        </span>
                        <span>Origine : <strong class="text-highlighted">
                                {{ product.origin }}
                            </strong></span>
                        <template v-if="product.weight">
                            <span aria-hidden="true">-</span>
                            <span>{{ product.weight }}</span>
                        </template>
                    </div>

                    <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-highlighted leading-tight">
                        {{ product.name }}
                    </h1>
                </div>

                <div class="flex items-center justify-between py-4 border-y border-default">
                    <div class="flex items-baseline gap-3">
                        <span class="text-3xl font-bold text-highlighted">
                            {{ formatPrice(product.price) }}
                        </span>
                        <span v-if="product.oldPrice" class="text-lg text-muted line-through">
                            {{ formatPrice(product.oldPrice) }}
                        </span>
                    </div>

                    <UBadge :color="product.inStock ? 'success' : 'error'" variant="subtle" size="md">
                        {{ product.inStock ? 'En stock' : 'Rupture de stock' }}
                    </UBadge>
                </div>

                <p class="text-base text-muted leading-relaxed">
                    {{ product.description }}
                </p>

                <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                    <div class="flex items-center border border-default rounded-lg w-fit">
                        <UButton icon="i-lucide-minus" color="neutral" variant="ghost" size="lg"
                            :disabled="quantity <= 1 || !product.inStock" aria-label="Diminuer la quantité"
                            @click="quantity = Math.max(1, quantity - 1)">
                            <span class="w-12 text-center font-semibold text-highlighted" aria-live="polite">
                                {{ quantity }}
                            </span>
                            <UButton icon="i-lucide-plus" color="neutral" variant="ghost" size="lg"
                                :disabled="!product.inStock" aria-label="Augmenter la quantité" @click="quantity++" />
                        </UButton>
                    </div>

                    <UButton icon="i-lucide-shopping-bag" color="primary" size="xl" class="flex-1 justify-center"
                        :disabled="!product.inStock" @click="handleAddToCart">
                        {{ product.inStock ? 'Ajouter au panier' : 'Indisponible' }}
                    </UButton>
                </div>

                <UAccordion :items="accordionItems" class="pt-4" />
            </div>
        </div>

        <section v-if="relatedProducts.length" aria-labelledby="related-heading"
            class="space-y-6 pt-8 border-t border-default">
            <h2 id="related-heading" class="text-2xl font-bold text-highlighted">
                Dans le même rayon
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <ProductCard v-for="item in relatedProducts" :key="item.id" :product="item" />
            </div>
        </section>
    </UContainer>
</template>