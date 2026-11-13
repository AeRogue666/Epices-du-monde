<script setup lang="ts">
const columns = reactive<{
    label: string,
    children?: {
        label: string,
        to?: string,
        target?: string,
        icon?: string,
    }[]
}[]>
    ([
        {
            label: 'Aide & Contact',
            children: [
                {
                    label: 'Contact',
                    to: '/contact',
                },
                {
                    label: 'Livraison',
                    to: '/livraison',
                },
            ]
        },
        {
            label: 'Légal',
            children: [
                {
                    label: 'Mentions légales',
                    to: '/mentions-legales',
                },
                {
                    label: 'RGPD',
                    to: '/rgpd',
                },
                {
                    label: 'CGV',
                    to: '/cgv',
                },
            ]
        },
        {
            label: 'Suivez-nous',
            children: [
                {
                    label: 'Facebook',
                    to: '',
                    target: '_blank',
                    icon: 'fa6-brands:facebook'
                },
                {
                    label: 'Instagram',
                    to: '',
                    target: '_blank',
                    icon: 'fa6-brands:instagram'
                },
            ]
        },
        {
            label: 'Paiement',
            children: [
                {
                    label: 'Visa',
                    icon: 'fa6-brands:cc-visa'
                },
                {
                    label: 'MasterCard',
                    icon: 'fa6-brands:cc-mastercard'
                },
                {
                    label: 'PayPal',
                    icon: 'fa6-brands:cc-paypal'
                }
            ]
        }
    ]);
</script>

<template>
    <UFooter class="grid grid-cols-1 xl:gap-8 w-full border-t border-default" :ui="{ container: 'hidden', }">
        <template #left>
            <div class="flex flex-col items-center mb-10 xl:mb-0">
                <slot name="up"></slot>
            </div>
        </template>

        <template #top>
            <UContainer>
                <UFooterColumns :columns="columns" :ui="{
                    root: 'md:grid md:grid-cols-1 xl:grid-cols-2 xl:gap-8 mt-6 space-x-4',
                    center: 'flex flex-col md:grid grid-flow-col auto-cols-fr xl:col-span-2 gap-8',
                }" />
            </UContainer>
        </template>

        <template #bottom>
            <div class="flex flex-col items-center mt-10 xl:mt-0">
                <slot name="down"></slot>
            </div>
        </template>
    </UFooter>
</template>