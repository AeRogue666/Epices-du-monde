<script setup lang="ts">
import { capitalize } from 'vue';

const filterStore = useFilterStore();
const search = defineModel('search', { type: String, default: '' });
watch(search, (value) => {
    filterStore.setSearch(value)
})

const searchProductTitle = ref<string>('chercher un produit'),
    searchProductDescription = ref<string>('ecrivez le nom du produit et laissez-nous le chercher');
</script>

<template>
    <div class="">
        <UModal :title="capitalize(searchProductTitle)" :description="capitalize(searchProductDescription)">
            <UButton icon="i-fa6-solid:magnifying-glass" color="neutral" variant="ghost" size="xl"
                class="bg-transparent text-2xl rounded-full" />
            <template #body>
                <form action="/products" method="get">
                    <label for="searchInput" class="sr-only">{{ capitalize(searchProductTitle) }}</label>
                    <UInput id="searchInput" v-bind:as="search" type="search" name="q"
                        :placeholder="capitalize(searchProductTitle)" color="neutral" variant="outline" size="md"
                        trailing-icon="fa6-solid:magnifying-glass" :ui="{
                            root: 'w-full',
                            base: 'w-full h-auto pl-4 pr-12 rounded-lg',
                            trailing: 'absolute top-0 right-2',
                            trailingIcon: 'text-xl',
                        }" />
                </form>
            </template>
        </UModal>
    </div>
</template>