<script setup lang="ts">
    import type { NavigationMenuItem } from '@nuxt/ui';

    const items = ref<NavigationMenuItem[]>([
        [
            {
                label: 'Catégories',
                type: 'label',
            },
            {
                label: 'Tous les produits',
                icon: 'fa6-solid:cart-shopping',
                to: '/products',
            },
            {
                label: 'Produits par pays',
                icon: 'fa6-solid:flag',
                children: [
                    {
                        label: 'Tous les pays',
                        icon: '',
                        to: '/categories/all-flags',
                    },
                    {
                        label: 'Thaïlande',
                        icon: 'flag:th-4x3',
                        to: '/products?categories=thailande',
                    },
                    {
                        label: 'Corée du sud',
                        icon: 'flag:kr-4x3',
                        to: '/products?categories=coree',
                    },
                    {
                        label: 'Japon',
                        icon: 'flag:jp-4x3',
                        to: '/products?categories=japon',
                    },
                    {
                        label: 'Taïwan',
                        icon: 'flag:tw-4x3',
                        to: '/products?categories=taiwan',
                    },
                    {
                        label: 'Vietnam',
                        icon: 'flag:vn-4x3',
                        to: '/products?categories=vietnam',
                    },
                    {
                        label: 'Chine',
                        icon: 'flag:ch-4x3',
                        to: '/products?categories=chine',
                    },
                ]
            },
            {
                label: 'Epices & Sauces',
                icon: 'fa6-solid:pepper-hot',
                children: [
                    {
                        label: 'Toutes les épices et sauces',
                        icon: '',
                        to: '/categories/epices_sauces',
                    },
                    {
                        label: 'Epices en gros',
                        icon: '',
                        to: '',
                    },
                    {
                        label: 'Epices en 100g',
                        icon: '',
                        to: '',
                    },
                    {
                        label: 'Curry asiatiques',
                        icon: '',
                        to: '',
                    },
                    {
                        label: 'Curry et produits indiens',
                        icon: '',
                        to: '',
                    },
                    {
                        label: 'Sauces soja',
                        icon: '',
                        to: '',
                    },
                    {
                        label: 'Sauces poisson nuoc man',
                        icon: '',
                        to: '',
                    },
                    {
                        label: 'Sauces à huitre',
                        icon: '',
                        to: '',
                    },
                    {
                        label: 'Sauces épicées',
                        icon: '',
                        to: '',
                    },
                    {
                        label: 'Huiles et vinaigres',
                        icon: '',
                        to: '',
                    },
                    {
                        label: 'Sauces diverses',
                        icon: '',
                        to: '',
                    }
                ]
            },
            {
                label: 'Assaisonnements',
                icon: 'fa6-solid:bottle-droplet',
                to: '/products?categories=assaisonnements',
            },
            {
                label: 'Boissons alcoolisées',
                icon: 'fa6-solid:beer-mug-empty',
                children: [
                    {
                        label: 'Toutes les boissons',
                        icon: '',
                        to: '/categories/boissons_alcoolisees',
                    },
                    {
                        label: 'Bières et cidres',
                        icon: '',
                        to: '',
                    },
                    {
                        label: 'Saké, soju et autres alcools',
                        icon: '',
                        to: '',
                    }
                ]
            },
            {
                label: 'Boissons sans alcool & Soda',
                icon: 'fa6-solid:glass-water',
                children: [
                    {
                        label: 'Toutes les boissons',
                        icon: '',
                        to: '/categories/boissons_soda',
                    },
                    {
                        label: 'Boissons sucrées',
                        icon: '',
                        to: '',
                    },
                    {
                        label: 'Soda ramune japonais',
                        icon: '',
                        to: '',
                    },
                    {
                        label: 'Bubble tea, Boba',
                        icon: '',
                        to: '',
                    },
                    {
                        label: 'Mogu mogu',
                        icon: '',
                        to: '',
                    }
                ]
            },
            {
                label: 'Thé, Tisanes & Bois. chaudes',
                icon: 'fa6-solid:mug-hot',
                to: '/products?categories=the,tisane,boissons_chaudes',
            },
            {
                label: 'Aperitifs & Collations',
                icon: 'fa6-solid-stroopwafel',
                children: [
                    {
                        label: 'Tous les apéritifs et collations',
                        icon: '',
                        to: '/categories/aperitifs_collations',
                    },
                    {
                        label: 'Chips, Snacks et apéritifs salés',
                        icon: '',
                        to: '',
                    },
                    {
                        label: 'Gâteaux, biscuits',
                        icon: '',
                        to: '',
                    },
                    {
                        label: 'Mochis',
                        icon: '',
                        to: '',
                    },
                    {
                        label: 'Bonbons',
                        icon: '',
                        to: '',
                    }
                ]
            },
            {
                label: 'Sucre, miels',
                icon: 'fa6-solid:cubes-stacked',
                to: '/products?categories=sucre,miel',
            },
            {
                label: 'Nouilles, pâtes & autres féculents',
                icon: 'fa6-solid:bowl-food',
                children: [
                    {
                        label: 'Tous les féculents, sauces et préparations',
                        icon: '',
                        to: '/categories/feculents_sauces_prep',
                    },
                    {
                        label: 'Nouilles instantanées',
                        icon: '',
                        to: '',
                    },
                    {
                        label: 'Nouilles et vermicelles',
                        icon: '',
                        to: '',
                    },
                    {
                        label: 'Farines',
                        icon: '',
                        to: '',
                    },
                    {
                        label: 'Riz et galettes',
                        icon: '',
                        to: '',
                    },
                    {
                        label: 'Pâtes et sauces en sachet',
                        icon: '',
                        to: '',
                    },
                    {
                        label: 'Pâtes épicés, préparations culinaires',
                        icon: '',
                        to: '',
                    },
                ]
            },
            {
                label: 'Fruits & Légumes',
                icon: 'fa6-solid:apple-whole',
                children: [
                    {
                        label: 'Tous les fruits et légumes',
                        icon: '',
                        to: '/categories/fruits_legumes',
                    },
                    {
                        label: 'Légumes conserves',
                        icon: '',
                        to: '',
                    },
                    {
                        label: 'Légumes secs',
                        icon: '',
                        to: '',
                    },
                    {
                        label: 'Fruits conserves',
                        icon: '',
                        to: '',
                    },
                    {
                        label: 'Fruits secs',
                        icon: '',
                        to: '',
                    },
                    {
                        label: 'Champignons',
                        icon: '',
                        to: '',
                    },
                    {
                        label: 'Noix de coco',
                        icon: '',
                        to: '',
                    }
                ]
            },
            {
                label: 'Produits de la mer',
                icon: 'fa6-solid:fish',
                children: [
                    {
                        label: 'Tous les produits de la mer',
                        icon: '',
                        to: '/categories/produits_mer',
                    },
                    {
                        label: 'Algues, Nori',
                        icon: '',
                        to: '',
                    },
                    {
                        label: 'Poissons, Crevettes',
                        icon: '',
                        to: '',
                    }
                ]
            },
            {
                label: 'Insectes comestibles',
                icon: 'fa6-solid:bug',
                to: '/products?categories=insectes_comestibles',
            },
            {
                label: 'Cosmétiques',
                icon: 'fa6-solid:seedling',
                children: [
                    {
                        label: 'Toutes les cosmétiques',
                        icon: '',
                        to: '/categories/cosmetiques',
                    },
                    {
                        label: 'Soins du corps',
                        icon: '',
                        to: '',
                    },
                    {
                        label: 'Soins capillaires',
                        icon: '',
                        to: '',
                    }
                ]
            },
            {
                label: 'Ustensiles de cusisine',
                icon: 'fa6-solid:utensils',
                to: '/products?categories=ustensiles_cuisine',
            },
            {
                label: 'Encens, Baguettes & Décorations',
                icon: 'fa6-solid:grip-lines',
                children: [
                    {
                        label: 'Tous les encens, baguettes et décorations',
                        icon: '',
                        to: '/categories/encens_baguettes_decorations',
                    },
                    {
                        label: 'Encens',
                        icon: '',
                        to: '',
                    },
                    {
                        label: 'Baguettes',
                        icon: '',
                        to: '',
                    },
                    {
                        label: 'Décorations',
                        icon: '',
                        to: '',
                    },
                ]
            },
        ]
    ]);
</script>

<template>
    <div id="mobile-menu"
        class="block w-auto min-w-[15rem] h-auto max-h-[90vh] bg-(--color-bg) absolute top-full left-0 overflow-y-scroll z-50">
        <UNavigationMenu highlight highlight-color="primary" orientation="vertical" :items="items" :ui="{
            label: 'text-3xl font-semibold',
            childList: 'sm:w-96',
            linkLabel: 'text-base truncate',
            linkTrailingIcon: 'text-xl',
        }" class="m-0 px-2 py-8 bg-(--color-bg) opacity-100" />
    </div>
</template>