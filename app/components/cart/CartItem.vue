<script setup lang="ts">
const props = defineProps<{
    item: CartItem;
}>();

const cartStore = useCartStore();

const formatPrice = (value: number) => new Intl.NumberFormat('fr-FR', { style: "currency", currency: "EUR" }).format(value);

const lineTotal = computed(() => props.item.product.price * props.item.quantity);
</script>

<template>
    <article
        class="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl border border-default bg-default">
        <NuxtLink :to="`/product/${item.product.slug}`"
            class="shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-stone-100 dark:bg-neutral-900 border border-default">
            <NuxtImg :src="item.product.image" :alt="item.product.name" width="96" height="96"
                class="w-full h-full object-cover" />
        </NuxtLink>

        <div class="flex-1 min-w-0 space-y-1">
            <div class="flex items-start justify-between gap-2">
                <h2 class="text-base font-semibold text-highlighted line-clamp-2">
                    <NuxtLink :to="`/product/${item.product.slug}`" class="hover:text-primary transition">
                        {{ item.product.name }}
                    </NuxtLink>
                </h2>

                <UButton icon="i-lucide-trash-2" color="error" variant="ghost" size="sm"
                    :aria-label="`Supprimer ${item.product.name} du panier`"
                    @click="cartStore.removeItem(item.product.id)" />
            </div>

            <p class="text-xs text-muted">
                Origine : {{ item.product.origin }}
                <span v-if="item.product.weight">
                    - {{ item.product.weight }}
                </span>
            </p>

            <div class="flex flex-wrap items-center justify-between gap-4 pt-3">
                <div class="flex items-center border border-default rounded-lg">
                    <UButton icon="i-lucide-minus" color="neutral" variant="ghost" size="sm"
                        :aria-label="`Augmenter la quantité de ${item.product.name}`"
                        @click="cartStore.updateQuantity(item.product.id, item.quantity + 1)" />
                </div>

                <div class="text-right">
                    <p class="text-base font-bold text-highlighted">
                        {{ formatPrice(lineTotal) }}
                    </p>
                    <p v-if="item.quantity > 1" class="text-xs text-muted">
                        {{ formatPrice(item.product.price) }}/ unité
                    </p>
                </div>
            </div>
        </div>
    </article>
</template>