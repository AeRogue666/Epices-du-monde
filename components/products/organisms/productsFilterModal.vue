<script setup lang="ts">
    import { UDrawer } from '#components';
    import ProductsFilterCtg from '../organisms/productsFilterCtg.vue';

    defineProps<{
        tagsList: Array<{
            id: number,
            label: string,
            children: Array<{
                id: number,
                label: string,
                value: string,
                checked?: boolean,
            }>
        }>,
    }>();
    const title = ref<string>('Filtrer & Trier'), description = ref<string>('Filtrer les produits');
</script>

<template>
    <UDrawer :title="title" :description="description">
        <UButton color="neutral" variant="outline" size="xl" icon="fa6-solid:filter"
            class="flex items-center w-auto h-auto min-w-[12rem] text-xl p-4 border-2 border-solid border-(--color-text) rounded-lg relative">
            Filtrer & Trier</UButton>

        <template #body>
            <ProductsFilterCtg :categories-list="tagsList" />
        </template>
    </UDrawer>
</template>