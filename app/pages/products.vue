<script setup lang="ts">
import ProductsFilterModal from '~/components/products/organisms/productsFilterModal.vue';
import ProductsItem from '~/components/products/organisms/productsItem.vue';
import ProductsItemSkeleton from '~/components/products/ui/productsItemSkeleton.vue';
import { useProductsStore } from '~/stores/ProductsStore';
import { categoryGroups } from '~/config/categories';

const productsStore = useProductsStore(),
    filterStore = useFilterStore(),
    config = useRuntimeConfig(),
    apiPublicEndpoint = config.public.apiBase;

const { query } = useRoute(),
    router = useRouter();

// Reactive query params
const searchQuery = computed(() => filterStore.search as string || ''),
    categoriesQuery = computed(() => {
        const ctg = filterStore.categories;
        if (!ctg) return []
        return Array.isArray(ctg) ? ctg : [ctg]
    }),
    pageParams = computed(() => filterStore.page as number || 1);

const buildApiUrl = async () => {
    const params = new URLSearchParams();

    // Search filter
    if (searchQuery.value) {
        params.append('search', searchQuery.value)
    }

    // Categories filter
    if (categoriesQuery.value.length > 0) {
        categoriesQuery.value.forEach(ctg => {
            params.append('filter[Product_Categorie][_in]', ctg as string)
        })
    }

    // Page params
    /* if (pageParams.value) {
        params.append('page', pageParams.value)
    } */

    // Standard Directus filters
    params.append('fields', '*,Product_Categorie.*,product_allergie.*,Product_label.*,nutrition_id.*,image_id.*');
    params.append('filter[status][_eq]', 'published');

    const queryString = params.toString();
    return `${apiPublicEndpoint}/items/Product?${queryString ? `${queryString}` : ''}`
};

// Products loading with useAsyncData
const { data: products, pending, error, refresh } = await useAsyncData<Product[]>('Product', async () => {
    const url = await buildApiUrl();

    try {
        const response = await $fetch<{ data: Product[] }>(url, {
            method: 'GET',
            query: {
                page: filterStore.page
            }
        });

        // Calling images details for each product
        const enrichedProducts = await Promise.all(
            response.data.map(async (product) => {
                if (typeof product.image_id === 'string' && product.image_id) {
                    try {
                        const imageResponse = await $fetch<{ data: Image }>(`${apiPublicEndpoint}/files`, {
                            query: {
                                filter: { id: { _eq: product.image_id } },
                                fields: 'id,description,width,height',
                            }
                        });

                        if (imageResponse.data) {
                            // Replacing image_id string by object
                            return {
                                ...product,
                                image_id: Array.isArray(imageResponse.data) ? imageResponse.data[0] : imageResponse.data
                            }
                        }
                    } catch (error) {
                        console.error(`Erreur lors du chargement de l'image ${product.image_id}: `, error);
                    }
                }

                return product
            })
        );

        // Updating productsStore
        productsStore.setProducts(enrichedProducts)
        return enrichedProducts
    } catch (error) {
        console.error('Erreur lors du chargement des produits: ', error);
        throw error
    }
},
    {
        // Automatically reload when query params is updated
        watch: [searchQuery, categoriesQuery, pageParams],
        server: true, // Server-side rendering
        lazy: false, // Client-side lazy loading
    });

// Loading categories
const { data: categoriesData } = await useFetch<{ data: Categorie[] }>(`${apiPublicEndpoint}/items/Categorie`, {
    query: {
        fields: 'id,name,value,product_id,sort',
        filter: { status: { _eq: 'published' } },
        sort: 'sort,name',
    },
});

// Organize categories following categoryGroups
const organizedCategories = computed(() => {
    if (!categoriesData.value?.data) return []

    const categoriesMap = new Map(
        categoriesData.value.data.map(ctg => [ctg.id, ctg])
    );

    return categoryGroups.map(group => ({
        ...group,
        children: group.children
            .map(childId => categoriesMap.get(childId))
            .filter(Boolean) as Categorie[]
    })).filter(group => group.children.length > 0);
});

// Resetting filters
const clearFilters = () => {
    router.push({ query: {} })
};

// Categories loading with useFetch
const { data: categories } = await useFetch<{ data: Categorie[] }>(`${apiPublicEndpoint}/items/Categorie`, {
    query: {
        fields: 'id, name, value, icon, product_id',
        filter: { status: { _eq: 'published' } },
    },
});

const filteredProductsCount = computed(() => products.value?.length || 0),
    hasActiveFilters = computed(() => searchQuery.value.length > 0 || categoriesQuery.value.length > 0);

useHead({
    title: 'Epices du Monde | Nos produits',
    meta: [
        {
            name: 'description',
            content: 'Découvrez notre sélection de produits',
        },
    ],
});
</script>

<template>
    <div class="flex flex-col items-center w-full h-full gap-2">
        <h1 class="text-5xl font-semibold">Products</h1>
        <section class="flex flex-col items-center w-full h-auto gap-6">
            <div class="flex flex-col items-center mt-6 gap-4">
                <div v-if="categories?.data" class="flex flex-row items-center w-full h-full gap-6">
                    <!-- Section Filtres -->
                    <ProductsFilterModal :categories-list="organizedCategories" :categories-query="categoriesQuery" />
                </div>
                <div v-if="!pending" class="flex flex-col items-start gap-4 xl:flex-row xl:items-center">
                    <p class="text-base">
                        <span class="font-semibold">{{ filteredProductsCount }}</span>
                        produit{{ filteredProductsCount > 1 ? 's' : '' }} trouvé{{ filteredProductsCount > 1 ? 's' : ''
                        }}
                    </p>
                </div>
                <!-- Section Tags -->
                <!-- <ProductsMoleculesTagsList :tags-list="tagsList" @id="updateTagsList" /> -->
            </div>
            <div class="flex flex-col items-center gap-6">
                <!-- Loading state -->
                <div v-if="pending">
                    <ProductsItemSkeleton />
                </div>

                <!-- Error state -->
                <div v-else-if="error">
                    <span>Une erreur est survenue lors du chargement des produits</span>
                    <UButton @click.prevent="refresh()" color="neutral" variant="outline" size="xl"
                        class="flex items-center w-auto h-auto text-xl p-4 border-2 border-solid border-(--color-text) rounded-lg relative">
                        Réessayer</UButton>
                </div>

                <!-- Products list -->
                <div v-else-if="products && products.length > 0">
                    <ul class="flex flex-col gap-8 lg:gap-y-16 sm:grid sm:grid-cols-2 lg:grid-cols-3">
                        <li v-for="(item, i) of products" :key="i">
                            <ProductsItem :product="item" />
                        </li>
                    </ul>
                </div>

                <!-- Empty state -->
                <div v-else>
                    <p>Aucun produit ne correspond à vos critères de recherche.</p>
                    <UButton v-if="hasActiveFilters" @click.prevent="clearFilters" color="neutral" variant="outline">
                        Voir tous les produits</UButton>
                </div>
            </div>
            <UPagination :page="pageParams" :items-per-page="15" />
        </section>
    </div>
</template>