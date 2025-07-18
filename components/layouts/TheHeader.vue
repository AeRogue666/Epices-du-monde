<script setup lang="ts">
    import HeaderMenu from './components/HeaderMenu.vue';

    const { search } = useSearchQueryStore(), isMenuOpen = ref<boolean>(false); // search = ref<string>(''),

    const headerMenuOpen = () => {
        isMenuOpen.value = !isMenuOpen.value
    };
</script>

<template>
    <header>
        <div class="flex flex-row items-center w-full min-h-28 bg-(--color-bg) fixed">
            <section class="flex flex-row justify-start items-center w-full px-6 gap-6">
                <nav class="sr-only">
                    <NuxtLink to="#main">Skip to the main content</NuxtLink>
                </nav>
                <div @click="headerMenuOpen">
                    <UIcon v-if="!isMenuOpen" name="fa6-solid:bars" class="text-3xl" />
                    <UIcon v-else name="fa6-solid:xmark" class="text-3xl" />
                </div>
                <a href="/">
                    <span class="title text-3xl font-semibold text-(--color-logo)">Epices du Monde</span>
                </a>
            </section>
            <HeaderMenu v-if="isMenuOpen" />
            <section class="flex flex-row justify-end items-center w-full px-6 gap-6">
                <div>
                    <label for="searchInput" class="sr-only">Search a product</label>
                    <form action="/products" method="get">
                        <label for="q" class="sr-only">Search a product</label>
                        <UInput id="searchInput" v-model:model-value="search" type="search" name="q"
                            placeholder="Search a product" color="neutral" variant="outline" size="md"
                            trailing-icon="fa6-solid:magnifying-glass" :ui="{
                                base: 'w-auto h-auto pl-4 pr-12 rounded-lg',
                                trailing: 'absolute top-0 right-2',
                                trailingIcon: 'text-xl',
                            }" />
                    </form>
                </div>
                <UIcon name="fa6-solid:ellipsis-vertical" class="text-2xl" />
                <UAvatar icon="fa6-solid:circle-user" class="text-2xl" />
            </section>
        </div>
    </header>
</template>