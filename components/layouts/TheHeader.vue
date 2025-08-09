<script setup lang="ts">
    import type { NavigationMenuItem } from '@nuxt/ui';
    import HeaderMenu from './molecules/HeaderMenu.vue';

    const { search } = useSearchQueryStore(),
        isMenuOpen = ref<boolean>(false),
        updateIsMenuOpen = (value: boolean) => {
            isMenuOpen.value = value
        }

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
                        to: '/products?categories=thailande,coree,japon,taiwan,vietnam,chine',
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
                        to: '/products?categories=epices-en-gros,epices-en-100g,curry-asiatiques,curry-produits-inde,sauce-soja,sauce-poisson-nuoc-man,sauce-a-huitres,sauces-epicees,huiles-et-vinaigres,sauces-diverses',
                    },
                    {
                        label: 'Epices en gros',
                        icon: '',
                        to: '/products?categories=epices-en-gros',
                    },
                    {
                        label: 'Epices en 100g',
                        icon: '',
                        to: '/products?categories=epices-en-100g',
                    },
                    {
                        label: 'Curry asiatiques',
                        icon: '',
                        to: '/products?categories=curry-asiatiques',
                    },
                    {
                        label: 'Curry et produits indiens',
                        icon: '',
                        to: '/products?categories=curry-produits-inde',
                    },
                    {
                        label: 'Sauce soja',
                        icon: '',
                        to: '/products?categories=sauce-soja',
                    },
                    {
                        label: 'Sauce poisson nuoc man',
                        icon: '',
                        to: '/products?categories=sauce-poisson-nuoc-man',
                    },
                    {
                        label: 'Sauce à huîtres',
                        icon: '',
                        to: '/products?categories=sauce-a-huitres',
                    },
                    {
                        label: 'Sauces épicées',
                        icon: '',
                        to: '/products?categories=sauce-epicees',
                    },
                    {
                        label: 'Huiles et vinaigres',
                        icon: '',
                        to: '/products?categories=huiles-et-vinaigres',
                    },
                    {
                        label: 'Sauces diverses',
                        icon: '',
                        to: '/products?categories=sauces-diverses',
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
                        to: '/products?categories=bieres-et-cidres,sake-soju-autres-alcools',
                    },
                    {
                        label: 'Bières et cidres',
                        icon: '',
                        to: '/products?categories=bieres-et-cidres',
                    },
                    {
                        label: 'Saké, soju et autres alcools',
                        icon: '',
                        to: '/products?categories=sake-soju-autres-alcools',
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
                        to: '/products?categories=boissons-sucrees,soda-ramune-japonais,bubble-tea-boba,mogu-mogu',
                    },
                    {
                        label: 'Boissons sucrées',
                        icon: '',
                        to: '/products?categories=boisson-sucrees',
                    },
                    {
                        label: 'Soda ramune japonais',
                        icon: '',
                        to: '/products?categories=soda-ramune-japonais',
                    },
                    {
                        label: 'Bubble tea, Boba',
                        icon: '',
                        to: '/products?categories=bubble-tea-boba',
                    },
                    {
                        label: 'Mogu mogu',
                        icon: '',
                        to: '/products?categories=mogu-mogu',
                    }
                ]
            },
            {
                label: 'Thé, Tisanes & Bois. chaudes',
                icon: 'fa6-solid:mug-hot',
                children: [
                    {
                        label: 'Tous les thés, tisanes et bois. chaudes',
                        icon: '',
                        to: '/products?categories=the,tisane,boissons-chaudes',
                    },
                    {
                        label: 'Thé',
                        icon: '',
                        to: '/products?categories=the',
                    },
                    {
                        label: 'Tisane',
                        icon: '',
                        to: '/products?categories=tisane',
                    },
                    {
                        label: 'Boissons chaudes',
                        icon: '',
                        to: '/products?categories=boissons-chaudes',
                    },
                ]
            },
            {
                label: 'Aperitifs & Collations',
                icon: 'fa6-solid-stroopwafel',
                children: [
                    {
                        label: 'Tous les apéritifs et collations',
                        icon: '',
                        to: '/products?categories=chips-snacks-aperitifs-sales,gateaux-biscuits,mochis,bonbons',
                    },
                    {
                        label: 'Chips, Snacks et apéritifs salés',
                        icon: '',
                        to: '/products?categories=chips-snacks-aperitifs-sales',
                    },
                    {
                        label: 'Gâteaux, biscuits',
                        icon: '',
                        to: '/products?categories=gateaux-biscuits',
                    },
                    {
                        label: 'Mochis',
                        icon: '',
                        to: '/products?categories=mochis',
                    },
                    {
                        label: 'Bonbons',
                        icon: '',
                        to: '/products?categories=bonbons',
                    }
                ]
            },
            {
                label: 'Sucre, miels',
                icon: 'fa6-solid:cubes-stacked',
                to: '/products?categories=sucre-miels',
            },
            {
                label: 'Nouilles, pâtes & autres féculents',
                icon: 'fa6-solid:bowl-food',
                children: [
                    {
                        label: 'Tous les féculents, sauces et préparations',
                        icon: '',
                        to: '/products?categories=nouilles-instantanees,nouilles-vermicelles,farines,riz-galettes,pates-sauces-sachet,prep-culinaires',
                    },
                    {
                        label: 'Nouilles instantanées',
                        icon: '',
                        to: '/products?categories=nouilles-instantanees',
                    },
                    {
                        label: 'Nouilles et vermicelles',
                        icon: '',
                        to: '/products?categories=nouilles-vermicelles',
                    },
                    {
                        label: 'Farines',
                        icon: '',
                        to: '/products?categories=farines',
                    },
                    {
                        label: 'Riz et galettes',
                        icon: '',
                        to: '/products?categories=riz-galettes',
                    },
                    {
                        label: 'Pâtes et sauces en sachet',
                        icon: '',
                        to: '/products?categories=pates-sauces-sachet',
                    },
                    {
                        label: 'Pâtes épicés',
                        icon: '',
                        to: '/products?categories=pates-epices',
                    },
                    {
                        label: 'Préparations culinaires',
                        icon: '',
                        to: '/products?categories=prep-culinaires',
                    }
                ]
            },
            {
                label: 'Fruits & Légumes',
                icon: 'fa6-solid:apple-whole',
                children: [
                    {
                        label: 'Tous les fruits et légumes',
                        icon: '',
                        to: '/products?categories=legumes-conserves,legumes-secs,fruits-conserves,fruits-secs,champignons,noix-coco',
                    },
                    {
                        label: 'Légumes conserves',
                        icon: '',
                        to: '/products?categories=legumes-conserves',
                    },
                    {
                        label: 'Légumes secs',
                        icon: '',
                        to: '/products?categories=legumes-secs',
                    },
                    {
                        label: 'Fruits conserves',
                        icon: '',
                        to: '/products?categories=fruits-conserves',
                    },
                    {
                        label: 'Fruits secs',
                        icon: '',
                        to: '/products?categories=fruits-secs',
                    },
                    {
                        label: 'Champignons',
                        icon: '',
                        to: '/products?categories=champignons',
                    },
                    {
                        label: 'Noix de coco',
                        icon: '',
                        to: '/products?categories=noix-coco',
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
                        to: '/products?categories=algues,nori,poissons,crevettes',
                    },
                    {
                        label: 'Algues',
                        icon: '',
                        to: '/products?categories=algues',
                    },
                    {
                        label: 'Nori',
                        icon: '',
                        to: '/products?categories=nori',
                    },
                    {
                        label: 'Poissons',
                        icon: '',
                        to: '/products?categories=poissons',
                    },
                    {
                        label: 'Crevettes',
                        icon: '',
                        to: '/products?categories=crevettes',
                    },
                ]
            },
            {
                label: 'Insectes comestibles',
                icon: 'fa6-solid:bug',
                to: '/products?categories=insectes-comestibles',
            },
            {
                label: 'Cosmétiques',
                icon: 'fa6-solid:seedling',
                children: [
                    {
                        label: 'Toutes les cosmétiques',
                        icon: '',
                        to: '/products?categories=soins-corps,soins-cheveux',
                    },
                    {
                        label: 'Soins du corps',
                        icon: '',
                        to: '/products?categories=soins-corps',
                    },
                    {
                        label: 'Soins capillaires',
                        icon: '',
                        to: '/products?categories=soins-cheveux',
                    }
                ]
            },
            {
                label: 'Ustensiles de cusisine',
                icon: 'fa6-solid:utensils',
                to: '/products?categories=ustensiles-cuisine',
            },
            {
                label: 'Encens, Baguettes & Décorations',
                icon: 'fa6-solid:grip-lines',
                children: [
                    {
                        label: 'Tous les encens, baguettes et décorations',
                        icon: '',
                        to: '/products?categories=encens,baguettes,decorations',
                    },
                    {
                        label: 'Encens',
                        icon: '',
                        to: '/products?categories=encens',
                    },
                    {
                        label: 'Baguettes',
                        icon: '',
                        to: '/products?categories=baguettes',
                    },
                    {
                        label: 'Décorations',
                        icon: '',
                        to: '/products?categories=decorations',
                    },
                ]
            },
        ]
    ]);
</script>

<template>
    <header>
        <section class="flex flex-row justify-start items-center w-full min-h-28 px-6 bg-(--color-bg) fixed gap-6">
            <LayoutsOrganismsHeaderLeftMenu :is-menu-open="isMenuOpen" @is-menu-open="updateIsMenuOpen" />
            <div class="flex flex-row justify-end items-center w-full px-6 gap-6">
                <div>
                    <label for="searchInput" class="sr-only">Search a product</label>
                    <form action="/products" method="get">
                        <label for="searchInput" class="sr-only">Search a product</label>
                        <UInput id="searchInput" v-bind:as="search" type="search" name="q"
                            placeholder="Search a product" color="neutral" variant="outline" size="md"
                            trailing-icon="fa6-solid:magnifying-glass" :ui="{
                                base: 'w-auto h-auto pl-4 pr-12 rounded-lg',
                                trailing: 'absolute top-0 right-2',
                                trailingIcon: 'text-xl',
                            }" />
                    </form>
                </div>
                <UIcon name="fa6-solid:ellipsis-vertical" class="text-2xl" />
                <UAvatar icon="fa6-solid:circle-user" class="text-2xl" />
            </div>
        </section>
        <HeaderMenu v-if="isMenuOpen == true" :items="items" />
    </header>
</template>