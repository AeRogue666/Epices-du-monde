<script setup lang="ts">
    import type { LocationQueryValue } from 'vue-router';

    defineProps<{
        search: string | undefined | LocationQueryValue | LocationQueryValue[]
    }>();
</script>

<template>
    <div class="">
        <!-- <label for="searchInput" class="sr-only">Search a product</label> -->
        <form action="/products" method="get">
            <label for="searchInput" class="sr-only">Search a product</label>
            <UInput id="searchInput" v-bind:as="search" type="search" name="q"
                placeholder="Search a product" color="neutral" variant="outline" size="md"
                trailing-icon="fa6-solid:magnifying-glass" :ui="{
                    base: 'w-auto h-auto pl-4 pr-12 rounded-lg',
                    trailing: 'absolute top-0 right-2',
                    trailingIcon: 'text-xl',
                }" />
        </form>
    </div>
</template>