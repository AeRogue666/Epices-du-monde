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
    <footer>
        <nav class="grid grid-cols-1 xl:gap-8 w-full">
            <div class="flex flex-col items-center mb-10 xl:mb-0">
                <slot name="up"></slot>
            </div>
            <div class="flex justify-center flex-wrap lg:grid grid-flow-col auto-cols-fr xl:mx-6 gap-8 xl:col-span-2">
                <div v-for="(obj, i) of columns" :key="i">
                    <h3 class="text-sm font-semibold">{{ obj.label }}</h3>
                    <ul class="mt-6 space-x-4">
                        <li v-for="(child, i) of obj.children" class="relative" :key="i">
                            <a v-if="!child.icon && child.to" :href="child.to" rel="noopener noreferrer"
                                class="group text-sm flex items-center gap-1.5 focus-visible:outline-primary text-muted hover:text-default transition-colors"
                                :target="child.target">
                                <span class="truncate">
                                    {{ child.label }}
                                    <span
                                        class="iconify i-lucide:arrow-up-right size-3 absolute top-0 text-dimmed inline-block"
                                        aria-hidden="true"></span>
                                </span>
                            </a>
                            <a v-else-if="child.icon && child.to" :href="child.to" rel="noopener noreferrer"
                                class="group text-sm flex items-center gap-1.5 focus-visible:outline-primary text-muted hover:text-default transition-colors"
                                :target="child.target" :aria-label="child.label">
                                <UIcon :name="child.icon" class="text-3xl" />
                            </a>
                            <UIcon v-else-if="!(child.to && child.target)" :name="child.icon || ''" class="text-3xl" />
                        </li>
                    </ul>
                </div>
            </div>
            <div class="flex flex-col items-center mt-10 xl:mt-0">
                <slot name="down"></slot>
            </div>
        </nav>
    </footer>
</template>