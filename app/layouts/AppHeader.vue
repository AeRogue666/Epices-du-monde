<script setup lang="ts">
const cartStore = useCartStore();
const mobileMenuOpen = ref(false);

const navLinks = [
    {label: "Accueil", to: "/"},
    {label: "Catalogue", to: "/products"},
    {label: "Promotions", to: "/products?filter=promo"},
    {label: "Nouveautés", to: "/products?filter=new"},
];
</script>

<template>
    <header
        class="sticky top-0 z-40 w-full border-b border-default bg-(--color-bg)/90 backdrop-blur-md">
        <UContainer
            class="w-full max-w-(--ui-container) mx-auto pl-4 pr-0 sm:px-6 lg:px-8 flex items-center justify-between gap-3 h-full">
            <UContainer name="left" class="lg:flex-1 flex items-center gap-1.5">
                <nav class="sr-only">
                    <NuxtLink to="#main">{{ capitalize($t('header.skip_content')) }}</NuxtLink>
                </nav>
                <HeaderMobileMenuMolecule :items="itemsCategories" />
                <HeaderTitleLink highlight highlight-color="neutral" :class="'sr-only xl:not-sr-only'" />
            </UContainer>
        </UContainer>

        <UContainer name="right" class="flex items-center justify-end lg:flex-1 gap-1.5">
            <HeaderRightMenu />
        </UContainer>
    </header>
</template>