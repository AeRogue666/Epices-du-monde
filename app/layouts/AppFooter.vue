<script setup lang="ts">
const navigationLinks = [
    { label: "Accueil", to: "/" },
    { label: "Tous les produits", to: "/products" },
    { label: "Promotions", to: "/products?filter=promo" },
    { label: "Nouveautés", to: "/products?filter=new" },
    { label: "Mon panier", to: "/cart" },
];

const categoryLinks = [
    { label: "Epices & Curry", to: "/products?category=epices" },
    { label: "Sauces Asiatiques", to: "/products?category=sauces" },
    { label: "Nouilles & Riz", to: "/products?category=nouilles" },
    { label: "Thés & Boissons", to: "/products?category=boissons" },
];
</script>

<template>
    <footer class="border-t border-default bg-stone-50 dark:bg-neutral-950 mt-auto">
        <UContainer class="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="space-y-3">
                <p class="font-serif text-lg font-bold text-primary">
                    Epices du Monde
                </p>
                <p class="text-sm text-muted leading-relaxed">
                    Epicerie asiatique et exotique. Projet showcase repensé avec Nuxt 4 et Nuxt UI.
                </p>
            </div>

            <div class="space-y-3">
                <h2 class="text-sm font-semibold uppercase tracking-wider text-highlighted">
                    Navigation
                </h2>
                <ul class="space-y-2">
                    <li v-for="link in navigationLinks" :key="link.to">
                        <NuxtLink :to="link.to" class="text-sm text-muted hover:text-primary transition">
                            {{ link.label }}
                        </NuxtLink>
                    </li>
                </ul>
            </div>

            <div class="space-y-3">
                <h2 class="text-sm font-semibold uppercase tracking-wider text-highlighted">
                    Rayons
                </h2>
                <ul class="space-y-2">
                    <li v-for="link in categoryLinks" :key="link.to">
                        <NuxtLink :to="link.to" class="text-sm text-muted hover:text-primary transition">
                            {{ link.label }}
                        </NuxtLink>
                    </li>
                </ul>
            </div>

            <div class="space-y-3">
                <h2 class="text-sm font-semibold uppercase tracking-wider text-highlighted">
                    Boutique
                </h2>
                <p class="text-sm text-muted">
                    4 chemin du Moulon, 07200 Aubenas
                </p>
                <div class="flex items-center gap-3 pt-2 text-muted" aria-label="Moyens de paiement">
                    <UIcon name="i-fa7-brands-cc-visa" class="w-7 h-7" aria-hidden=true />
                    <UIcon name="i-fa7-brands-cc-mastercard" class="w-7 h-7" aria-hidden=true />
                    <UIcon name="i-fa7-brands-cc-paypal" class="w-7 h-7" aria-hidden=true />
                </div>
            </div>
        </UContainer>

        <div class="border-t border-default py-6">
            <UContainer class="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
                <slot name="down"></slot>
            </UContainer>
        </div>
    </footer>
</template>