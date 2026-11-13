<script setup lang="ts">
import type { Product } from "@/types/product";

const props = defineProps<{
    product: Product;
}>();

const cartStore = useCartStore();
const toast = useToast();

const formatPrice = (value: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(value);

const handleAddToCart = () => {
    if (!props.product.inStock) return;
    cartStore.addItem(props.product, 1);
    toast.add({
        title: "Ajouté au panier",
        description: props.product.name,
        icon: "i-lucide-check-circle",
        color: 'primary',
    });
}
</script>

<template>
    <article
        class="group relative flex flex-col rounded-xl border border-default bg-default overflow-hidden transition hover:border-primary/60 hover:shadow-lg focus-within:ring-2 focus-within:ring-primary">
        <div class="relative aspect-square w-full overflow-hidden bg-stone-100 dark:bg-neutral-900">
            <NuxtImg :src="product.image" :alt="product.name" width="400" height="400" loading="lazy"
                class="h-full w-full object-cover transition duration-300 group-hover:scale-105" />

            <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
                <UBadge v-if="product.isPromo" color="primary" variant="solid" size="md" icon="i-lucide-badge-percent" class="bg-(--primary-color-2) text-(--black)">
                    Promo
                </UBadge>
                <UBadge v-if="product.isNew" color="secondary" variant="solid" size="md" icon="i-lucide-star" class="bg-(--primary-color) text-(--black)">
                    Nouveau
                </UBadge>
            </div>

            <UBadge color="neutral" variant="subtle" size="md" class="absolute bottom-3 left-3 backdrop-blur-xs">
                {{ product.origin }}
            </UBadge>
        </div>

        <div class="flex flex-1 flex-col justify-between p-4 gap-4">
            <div class="space-y-1.5">
                <div class="flex items-center gap-1.5 text-xs font-medium">
                    <span class="w-2 h-2 rounded-full" :class="product.inStock ? 'bg-emerald-600' : 'bg-red-600'"
                        aria-hidden="true">
                    </span>
                    <span :class="product.inStock ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-600'">
                        {{ product.inStock ? 'En stock' : 'Rupture de stock' }}
                    </span>
                </div>

                <h3 class="text-base font-semibold text-highlighted line-clamp-2 group-hover:text-primary transition">
                    <NuxtLink :to="`/product/${product.slug}`" class="after:absolute after:inset-0 focus:outline-none">
                        {{ product.name }}
                    </NuxtLink>
                </h3>

                <p class="text-sm text-muted line-clamp-2">
                    {{ product.description }}
                </p>
            </div>

            <div class="flex items-center justify-between pt-2 border-t border-default">
                <div class="flex flex-col">
                    <span v-if="product.oldPrice" class="text-xs text-muted line-through">
                        {{ formatPrice(product.oldPrice) }}
                    </span>
                    <span class="text-lg font-bold text-highlighted">
                        {{ formatPrice(product.price) }}
                    </span>
                </div>

                <UButton icon="i-lucide-shopping-cart" color="primary" variant="soft" size="md"
                    :disabled="!product.inStock" :aria-label="`Ajouter ${product.name} au panier`" class="relative z-10"
                    @click="handleAddToCart">
                    Ajouter
                </UButton>
            </div>
        </div>
    </article>
</template>