<script setup lang="ts">
import { UDrawer } from '#components';
import type { CategoryGroup } from '~/config/categories';
import ProductsFilterCtg from '../organisms/productsFilterCtg.vue';
import type { LocationQueryValue } from 'vue-router';

defineProps<{
    categoriesList: CategoryGroup[],
    categoriesQuery: LocationQueryValue[],
}>();

const filterStore = useFilterStore(), title = ref<string>('Filtres'), description = ref<string>('Filtrer les produits');

const onSubmit = (values: string[]) => {
    filterStore.setCategories(values)
}, onReset = () => {
    filterStore.clearCategories()
};
</script>

<template>
    <UDrawer :title="title" :description="description">
        <UButton color="neutral" variant="outline" size="xl" icon="fa6-solid:filter"
            class="flex items-center w-auto h-auto min-w-48 text-xl p-4 border-2 border-solid border-(--color-text) rounded-lg relative">
            Filtrer & Trier</UButton>

        <template #body>
            <ProductsFilterCtg :categories-list="categoriesList" :categories-query="categoriesQuery" @submit="onSubmit"
                @reset="onReset" />
        </template>
    </UDrawer>
</template>