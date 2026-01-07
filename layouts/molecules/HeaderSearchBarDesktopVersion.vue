<script setup lang="ts">
const filterStore = useFilterStore();
const search = defineModel('search', { type: String, default: '' });

watch(search, (value) => {
    filterStore.setSearch(value)
})
</script>

<template>
    <div class="">
        <!-- <label for="searchInput" class="sr-only">Search a product</label> -->
        <form action="/products" method="get">
            <label for="searchInput" class="sr-only">Search a product</label>
            <UInput id="searchInput" v-model="filterStore.search" @input="filterStore.setSearch($event.target.value)" type="search" name="search"
                placeholder="Search a product" color="neutral" variant="outline" size="md"
                trailing-icon="fa6-solid:magnifying-glass" :ui="{
                    base: 'w-auto h-auto pl-4 pr-12 rounded-lg',
                    trailing: 'absolute top-0 right-2',
                    trailingIcon: 'text-xl',
                }" />
                <!-- <input id="searchInput" v-model="filterStore.search" @input="filterStore.setSearch($event.target.value)"
                type="search" name="search" placeholder="Search a product" /> -->
        </form>
    </div>
</template>