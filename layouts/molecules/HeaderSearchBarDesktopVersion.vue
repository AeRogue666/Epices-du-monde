<script setup lang="ts">
const search = defineModel('search', { type: String, default: '' }),
    filterStore = useFilterStore();

watch(search, (value) => {
    filterStore.setSearch(value)
})
</script>

<template>
    <div class="">
        <form action="/products" method="get">
            <label for="searchInput" class="sr-only">Search a product</label>
            <UInput id="searchInput" v-model="filterStore.search" @input="filterStore.setSearch($event.target.value)"
                type="search" name="search" placeholder="Search a product" color="neutral" variant="outline" size="md"
                trailing-icon="fa6-solid:magnifying-glass" :ui="{
                    base: 'w-auto h-auto pl-4 pr-12 rounded-lg',
                    trailing: 'absolute top-0 right-2',
                    trailingIcon: 'text-xl',
                }" />
        </form>
    </div>
</template>