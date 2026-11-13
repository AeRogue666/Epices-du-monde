<script setup lang="ts">
import CartItem from '~/components/cart/CartItem.vue';

const cartStore = useCartStore();
const toast = useToast();
const orderConfirmed = ref(false);

const shippingCost = computed(() => cartStore.subTotal >= 35 || cartStore.subTotal === 0 ? 0 : 4.9);
const totalAmount = computed(() => cartStore.subTotal + shippingCost.value);

const formatPrice = (value: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(value);

const handleCheckout = () => {
    orderConfirmed.value = true;
    cartStore.clearCart();
    toast.add({
        title: "Commande de démonstration validée",
        description: "Merci d'avoir testé le parcours e-commerce Epices du Monde - Showcase.",
        icon: "i-lucide-party-popper",
        color: "success",
    });
};

useSeoMeta({
    title: "Votre panier - Epices du Monde",
    description: "Consultez et gérez les articles de votre panier."
});
</script>

<template>
    <UContainer class="py-10 sm:py-14 space-y-8">
        <header class="flex flex-wrap items-end justify-between gap-4 border-b border-default pb-6">
            <div>
                <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-highlighted">
                    Votre panier
                </h1>
                <p class="text-muted mt-1" aria-live="polite">
                    {{ cartStore.totalItems }} article{{ cartStore.totalItems > 1 ? 's' : '' }} sélectionné{{
                        cartStore.totalItems > 1 ? 's' : '' }}
                </p>
            </div>

            <UButton v-if="cartStore.items.length > 0" variant="ghost" color="error" size="sm" icon="i-lucide-trash"
                @click="cartStore.clearCart()">
                Vider le panier
            </UButton>
        </header>

        <div v-if="orderConfirmed"
            class="max-w-lg mx-auto text-center py-12 px-6 border border-default bg-default space-y-5">
            <div
                class="mx-auto w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <UIcon name="i-lucide-check-circle-2" class="w-8 h-8" aria-hidden="true" />
            </div>
            <div class="space-y-2">
                <h2 class="text-2xl font-bold text-highlighted">
                    Command simulée avec succès !
                </h2>
                <p class="text-sm text-muted">
                    Ceci est un site vitrine de démonstration : aucun paiement réel n'a été effectué.
                </p>
            </div>
            <UButton to="/products" color="primary" size="lg" icon="i-lucide-arrow-left">
                Continuer la visite du catalogue
            </UButton>
        </div>

        <div v-else-if="cartStore.items.length > 0" class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <section aria-label="Articles dans votre panier" class="lg:col-span-8 space-y-4">
                <CartItem v-for="item in cartStore.items" :key="item.product.id" :item="item" />
            </section>

            <aside aria-label="Récapitulatif de la commande" class="lg:col-span-4 lg:sticky lg:top-28">
                <UCard class="space-y-4">
                    <template #header>
                        <h2 class="text-lg font-bold text-highlighted">
                            Récapitulatif
                        </h2>
                    </template>

                    <div class="space-y-3 text-sm">
                        <div class="flex justify-between text-muted">
                            <span>
                                Sous-total ({{ cartStore.totalItems }} article{{ cartStore.totalItems > 1 ? 's' : '' }}
                                )
                            </span>
                            <span class="font-medium text-highlighted">
                                {{ formatPrice(cartStore.subTotal) }}
                            </span>
                        </div>

                        <div class="flex justify-between text-muted">
                            <span>Livraison standard</span>
                            <span class="font-medium"
                                :class="shippingCost === 0 ? 'text-emerald-600' : 'text-highlighted'">
                                {{ shippingCost === 0 ? 'Offerte' : formatPrice(shippingCost) }}
                            </span>
                        </div>

                        <p v-if="shippingCost > 0"
                            class="text-xs text-muted bg-stone-100 dark:bg-neutral-900 p-2.5 rounded-lg">
                            Plus que <strong>{{ formatPrice(35 - cartStore.subTotal) }}</strong> pour bénéficier de la
                            livraison offerte.
                        </p>

                        <div class="border-t border-default pt-3 flex justify-between items-baseline">
                            <span class="text-base font-bold text-highlighted">
                                Total TTC
                            </span>
                            <span class="text-2xl font-bold text-primary">
                                {{ formatPrice(totalAmount) }}
                            </span>
                        </div>
                    </div>

                    <template #footer>
                        <div class="space-y-2.5">
                            <UButton color="primary" size="xl" block icon="i-lucide-lock" @click="handleCheckout">
                                Valider la commande (Démo)
                            </UButton>
                            <UButton to="/products" variant="ghost" color="neutral" size="md" block>
                                Continuer mes achats
                            </UButton>
                        </div>
                    </template>
                </UCard>
            </aside>
        </div>

        <div v-else
            class="flex flex-col items-center justify-center py-16 px-4 text-center rounded-2xl border border-dashed border-default space-y-4">
            <UIcon name="i-lucide-shopping-bag" class="w-12 h-12 text-muted" aria-hidden="true" />
            <div class="space-y-1">
                <h2 class="text-xl font-semibold text-highlighted">
                    Votre panier est vide.
                </h2>
                <p class="text-sm text-muted max-w-md">
                    Découvrez nos épices, sauces asiatiques et thés authentiques pour composer votre sélection.
                </p>
            </div>
            <UButton to="/products" color="primary" size="lg" icon="i-lucide-compass">
                Explorer le catalogue
            </UButton>
        </div>
    </UContainer>
</template>