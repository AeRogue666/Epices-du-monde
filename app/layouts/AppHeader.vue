<script setup lang="ts">
const cartStore = useCartStore();
const mobileMenuOpen = ref(false);

const navLinks = [
    // { label: "Accueil", to: "/" },
    { label: "Catalogue", to: "/products" },
    { label: "Promotions", to: "/products?filter=promo" },
    { label: "Nouveautés", to: "/products?filter=new" },
];
</script>

<template>
    <header class="sticky top-0 z-40 w-full border-b border-default bg-(--color-bg)/90 backdrop-blur-md">
        <UContainer class="h-20 flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
                <UButton icon="i-lucide-menu" color="neutral" variant="ghost" class="lg:hidden"
                    aria-label="Ouvrir le menu de navigation" @click="mobileMenuOpen = true" />

                <NuxtLink to="/"
                    class="flex items-center gap-2.5 font-serif text-xl sm:text-2xl font-bold tracking-tight text-primary focus-visible:outline-2 focus-visible:outline-primary rounded-md">
                    <NuxtImg src="img/logo.png" alt="" width="36" height="36" class="w-9 h-9 object-contain" />
                    <span>Epices du Monde</span>
                </NuxtLink>
            </div>

            <nav aria-label="Navigation principale" class="hidden lg:flex items-center gap-1">
                <UButton v-for="link in navLinks" :key="link.to" :to="link.to" variant="ghost" color="neutral" size="md"
                    active-class="text-primary font-semibold bg-primary/10">
                    {{ link.label }}
                </UButton>
            </nav>

            <div class="flex items-center gap-2">
                <UButton to="/products" icon="i-lucide-search" color="neutral" variant="ghost"
                    aria-label="Rechercher un produit" />

                <UColorModeButton aria-label="Changer le thème clair ou sombre" />

                <UButton to="/cart" color="primary" variant="soft" icon="i-lucide-shopping-bag"
                    :aria-label="`Panier (${cartStore.totalItems || 0} article${cartStore.totalItems > 0 ? 's' : ''})`"
                    class="relative">
                    <span class="hidden sm:inline">Panier</span>
                    <UBadge v-if="cartStore.totalItems > 0" color="primary" variant="solid" size="xs"
                        class="ml-1 rounded-full">
                        {{ cartStore.totalItems }}
                    </UBadge>
                </UButton>
            </div>
        </UContainer>

        <USlideover v-model:open="mobileMenuOpen" side="left" title="Menu" description="Navigation du site">
            <template #body>
                <nav aria-label="Navigation mobile" class="flex flex-col gap-2">
                    <UButton v-for="link in navLinks" :key="link.to" :to="link.to" variant="ghost" color="neutral"
                        size="lg" block class="justify-start" active-class="text-primary font-semibold bg-primary/10"
                        @click="mobileMenuOpen = false">
                        {{ link.label }}
                    </UButton>
                </nav>
            </template>
        </USlideover>
    </header>
</template>