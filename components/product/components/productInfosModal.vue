<script setup lang="ts">
    defineProps<{
        origine: string,
        marque: string,
        poids_net: string,
        price: number,
        price_per_kg: number,
        reduction_rate: number,
        old_price: number,
        stock: {
            availability: string,
            number: number,
            color: string,
        },
    }>();
    const productNumber = ref<number>(1);
</script>

<template>
    <UContainer class="w-96 h-96 border border-solid border-(--color-text)">
        <div class="flex flex-col gap-4">
            <span class="text-base font-semibold">{{ price }} €</span>
            <span class="text-base">Poids net: {{ poids_net }}</span>
            <span>1 kg = {{ price_per_kg }} €</span>
        </div>
        <div class="flex flex-col">
            <span class="flex flex-row items-center text-base gap-2">
                <UIcon name="i-fa6-solid:circle" class="size-5" :class="stock.color" />
                {{ stock.availability }}: {{ stock.number }}
            </span>
            <UContainer>
                <UInputNumber v-model="productNumber" :default-value="1" :min="1" :max="99" />
                <UButton color="neutral" variant="outline" size="xl" icon="fa6-solid:cart-shopping"
                    class="flex items-center w-auto h-auto min-w-[12rem] text-xl p-4 border-2 border-solid border-(--color-text) rounded-lg relative">
                    Ajouter au panier</UButton>
            </UContainer>
        </div>
    </UContainer>
</template>