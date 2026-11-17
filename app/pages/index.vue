<script setup lang="ts">
import { PRODUCTS, CATEGORIES } from '../data/products';

const promoProducts = computed(() => PRODUCTS.filter((p) => p.isPromo).slice(0, 4));
const newProducts = computed(() => PRODUCTS.filter((p) => p.isNew).slice(0, 4));
</script>

<template>
    <div class="space-y-16 pb-20">
        <section aria-labelledby="hero-heading" class="bg-stone-50 dark:bg-neutral-900 border-b border-default">
            <UContainer class="py-1- lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div class="space-y-6">
                    <UBadge color="primary" variant="subtle" size="lg">
                        Epicerie Asiatique & Exotique - DEMONSTRATEUR
                    </UBadge>

                    <h1 id="hero-heading"
                        class="text-4xl sm:text-6xl font-bold tracking-tight text-highlighted leading-tight">
                        Les saveurs authentiques du monde dans votre cuisine.
                    </h1>

                    <p class="text-lg text-muted max-w-xl leading-relaxed">
                        Découvrez notre sélection d'épices rares, sauces traditionnelles, nouilles, thés matcha et
                        doucours venues d'Asie.
                    </p>

                    <div class="flex flex-wrap gap-4 pt-2">
                        <UButton to="/products" size="xl" color="primary" icon="i-lucide-compass">
                            Explorer le catalogue
                        </UButton>
                        <UButton to="/products?filter=promo" size="xl" variant="outline" color="neutral"
                            icon="i-lucide-badge-percent">
                            Voir les promotions
                        </UButton>
                    </div>
                </div>

                <div>
                    <NuxtImg src="img/hero_image.png"
                        alt="Assortiment d'épices colorées, bols de curry et ingrédients asiatiques"
                        class="w-full h-full object-cover" width="800" height="600" />
                </div>
            </UContainer>
        </section>

        <UContainer>
            <section aria-labelledby="categories-heading" class="space-y-6">
                <div class="flex items-end justify-between">
                    <div>
                        <h2 id="categories-heading" class="text-2xl sm:text-3xl font-bold text-highlighted">
                            Nos rayons phares
                        </h2>
                        <p class="text-muted mt-1">
                            Accédez directement aux essentiels par catégorie.
                        </p>
                    </div>
                    <UButton to="/products" variant="link" trailing-icon="i-lucide-arrow-right">
                        Tout voir
                    </UButton>
                </div>

                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    <NuxtLink v-for="cat in CATEGORIES" :key="cat.id" :to="`/products?category=${cat.id}`"
                        class="group flex flex-col items-center justify-center p-6 rounded-xl border border-default bg-default hover:border-primary hover:shadow-md transition focus-visible:outline-2 focus-visible:outline-primary text-center gap-3">
                        <div
                            class="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition">
                            <UIcon :name="cat.icon" class="w-6 h-6" aria-hidden="true" />
                        </div>
                        <span class="font-medium text-highlighted">
                            {{ cat.label }}
                        </span>
                    </NuxtLink>
                </div>
            </section>
        </UContainer>

        <UContainer v-if="promoProducts.length">
            <section aria-labelledby="promo-heading" class="space-y-6">
                <div class="flex items-end justify-between">
                    <div>
                        <h2 id="promo-heading" class="text-2xl sm:text-3xl font-bold text-highlighted">
                            Promotions du moment
                        </h2>
                        <p class="text-muted mt-1">
                            Profitez de nos offres à prix réduits.
                        </p>
                    </div>
                    <UButton to="/products?filter=promo" variant="ghost" trailing-icon="i-lucide-arrow-right">
                        Toutes les promos
                    </UButton>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ProductCard v-for="product in promoProducts" :key="product.id" :product="product" />
                </div>
            </section>
        </UContainer>

        <UContainer v-if="newProducts.length">
            <section aria-labelledby="new-heading" class="space-y-6">
                <div class="flex items-end justify-between">
                    <div>
                        <h2 id="new-heading" class="text-2xl sm:text-3xl font-bold text-highlighted">
                            Nouveautés
                        </h2>
                        <p class="text-muted mt-1">
                            Les deniers arrivages dans notre boutique.
                        </p>
                    </div>
                    <UButton to="/products?filter=new" variant="link" trailing-icon="i-lucide-arrow-right">
                        Toutes les nouveautés
                    </UButton>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ProductCard v-for="product in newProducts" :key="product.id" :product="product" />
                </div>
            </section>
        </UContainer>
    </div>
</template>