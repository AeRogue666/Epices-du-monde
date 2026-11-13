<script setup lang="ts">
import { PRODUCTS, CATEGORIES } from '~/data/products';

const route = useRoute();
const router = useRouter();

const search = ref((route.query.q as string) || "");
const selectedCategory = ref((route.query.category as string) || "all");
const activeFilter = ref((route.query.filter as string) || "all");
const sortBy = ref<"default" | "price-asc" | "price-desc">("default");

watch(() => route.query, (newQuery) => {
    search.value = (newQuery.q as string) || "";
    selectedCategory.value = (newQuery.category as string) || "all";
    activeFilter.value = (newQuery.filter as string) || "all";
});

const sortOptions = [
    { label: "Pertinence", value: "default" },
    { label: "Prix croissant", value: "price-asc" },
    { label: "Prix décroissant", value: "price-desc" },
];

const quickFilters = [
    { label: "Tous", value: "all", color: "" },
    { label: "Promotions", value: "promo" },
    { label: "Nouveautés", value: "new" },
    { label: "En stock", value: "instock" },
];

const filteredProducts = computed(() => {
    let list = [...PRODUCTS];

    if (search.value.trim()) {
        const q = search.value.toLowerCase().trim();
        list = list.filter((p) => p.name.toLowerCase().includes(q) || p.origin.toLowerCase().includes(q));
    }

    if (selectedCategory.value !== 'all') {
        list = list.filter((p) => p.category === selectedCategory.value);
    }

    if (activeFilter.value === "promo") {
        list = list.filter((p) => p.isPromo);
    } else if (activeFilter.value === "new") {
        list = list.filter((p) => p.isNew);
    } else if (activeFilter.value === "instock") {
        list = list.filter((p) => p.inStock);
    }

    if (sortBy.value === "price-asc") {
        list.sort((a, b) => a.price - b.price);
    } else if (sortBy.value === "price-desc") {
        list.sort((a, b) => b.price - a.price);
    }

    return list;
});

const hasActiveFilters = computed(() => search.value.trim() !== "" || selectedCategory.value !== "all" || activeFilter.value !== "all");

const resetFilters = () => {
    search.value = "";
    selectedCategory.value = "all";
    activeFilter.value = "all";
    sortBy.value = "default";
    router.replace({ query: {} });
};

useSeoMeta({
    title: "Catalogue - Epices du Monde",
    description: "Parcourez notre catalogue complet d'épices, sauces, nouilles, thés et produits asiatiques."
});
</script>

<template>
    <UContainer class="py-10 sm:py-14 space-y-8">
        <header class="space-y-2 border-b border-default pb-6">
            <h1 class="text-3xl sm:text-5xl font-bold tracking-tight text-highlighted">
                Notre catalogue
            </h1>
            <p class="text-muted text-base sm:text-lg max-w-2xl">
                Explorez nos saveurs venues d'Asie et du monde entier, filtrables par rayon ou origine.
            </p>
        </header>

        <section aria-label="Filtres et recherche" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div class="md:col-span-5">
                    <UInput v-model="search" icon="i-lucide-search" size="lg"
                        placeholder="Rechercher une épice, une sauce, un pays..." aria-label="Rechercher un produit"
                        class="w-full">
                        <template v-if="search" #trailing>
                            <UButton icon="i-lucide-x" color="neutral" variant="link" size="xs"
                                aria-label="Effacer la recherche" @click="search = ''" />
                        </template>
                    </UInput>
                </div>

                <div class="md:col-span-4 flex flex-wrap items-center gap-1.5" role="group"
                    aria-label="Filtres rapides">
                    <UButton v-for="filter in quickFilters" :key="filter.label" size="md"
                        :color="activeFilter === filter.value ? 'primary' : 'neutral'"
                        :variant="activeFilter === filter.value ? 'solid' : 'soft'"
                        @click="activeFilter = filter.value">
                        {{ filter.label }}
                    </UButton>
                </div>

                <div class="md:col-span-3">
                    <USelect v-model="sortBy" :items="sortOptions" value-key="value" size="lg"
                        aria-label="Trier les produits par" class="w-full" />
                </div>
            </div>

            <div class="flex items-center gap-2 overflow-x-auto pb-1" role="group" aria-label="Filtrer par paryon">
                <UButton size="sm" :color="selectedCategory === 'all' ? 'primary' : 'neutral'"
                    :variant="selectedCategory === 'all' ? 'outline' : 'ghost'" @click="selectedCategory = 'all'">
                    Tous les rayons
                </UButton>
                <UButton v-for="cat in CATEGORIES" :key="cat.id" :icon="cat.icon" size="sm"
                    :color="selectedCategory === 'all' ? 'primary' : 'neutral'"
                    :variant="selectedCategory === 'all' ? 'outline' : 'ghost'" @click="selectedCategory = cat.id">
                    {{ cat.label }}
                </UButton>
            </div>
        </section>

        <div class="flex items-center justify-between text-sm text-muted" aria-live="polite">
            <p>
                <strong class="text-highlighted font-semibold">
                    {{ filteredProducts.length }}
                </strong>
                Produit{{ filteredProducts.length > 1 ? 's' : '' }} affiché{{ filteredProducts.length > 1 ? 's' : '' }}
            </p>

            <UButton v-if="hasActiveFilters" variant="link" color="primary" size="sm" icon="i-lucide-rotate-ccw"
                @click="resetFilters">
                Réinitialiser les filtres
            </UButton>
        </div>

        <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" :heading-tag="'h2'" />
        </div>

        <div v-else
            class="flex flex-col items-center justify-center py-16 px-4 text-center rounded-2xl border border-dashed border-default space-y-4">
            <UIcon name="i-lucide-search-x" class="w-12 h-12 text-muted" aria-hidden=true />
            <div cxlass="space-y-1">
                <h2 class="text-lg font-semibold text-highlighted">
                    Aucun produit trouvé
                </h2>
                <p class="text-sm text-muted max-w-md">
                    Aucun article ne correspond à votre sélection actuelle.
                    Essayez un autre mot-clé ou réintialisez les filtres.
                </p>
            </div>
            <UButton color="primary" variant="soft" @click="resetFilters">
                Afficher tout le catalogue
            </UButton>
        </div>
    </UContainer>
</template>