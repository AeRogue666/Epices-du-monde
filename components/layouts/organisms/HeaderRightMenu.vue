<script setup lang="ts">
import HeaderAvatarMenu from './HeaderAvatarMenu.vue';

const { search } = useSearchQueryStore(),
    isAvatarMenuOpen = ref<boolean>(false);

const updateAvatarMenu = () => {
    isAvatarMenuOpen.value = !isAvatarMenuOpen.value
};
</script>

<template>
    <div class="flex flex-row justify-end items-center w-full px-6 gap-6">
        <div>
            <label for="searchInput" class="sr-only">Search a product</label>
            <form action="/products" method="get">
                <label for="searchInput" class="sr-only">Search a product</label>
                <UInput id="searchInput" v-bind:model-value="search" type="search" name="q"
                    placeholder="Search a product" color="neutral" variant="outline" size="md"
                    trailing-icon="fa6-solid:magnifying-glass" :ui="{
                        base: 'w-auto h-auto pl-4 pr-12 rounded-lg',
                        trailing: 'absolute top-0 right-2',
                        trailingIcon: 'text-xl',
                    }" />
            </form>
        </div>
        <UAvatar icon="fa6-solid:circle-user" class="text-5xl" @click.prevent="updateAvatarMenu" />
        <HeaderAvatarMenu v-if="isAvatarMenuOpen == true" />
    </div>
</template>