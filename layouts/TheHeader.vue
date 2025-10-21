<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import HeaderTitleLink from './atoms/HeaderTitleLink.vue';
import HeaderRightMenu from './organisms/HeaderRightMenu.vue';
import HeaderMobileMenuMolecule from './molecules/HeaderMobileMenuMolecule.vue';
import { capitalize } from 'vue';

const { isDesktop, isMobile } = useDevice();

const itemsCategories = computed<NavigationMenuItem[]>(() =>
    [
        {
            label: 'Recettes de cuisine',
            icon: 'fa6-solid:carrot',
            to: '/recipes',
        },
        {
            label: 'Tous les produits',
            icon: 'fa6-solid:cart-shopping',
            to: '/products',
        },
        {
            label: 'Produits par pays',
            type: 'label',
            icon: 'fa6-solid:flag',
            children: [
                {
                    label: 'Tous les pays',
                    icon: 'fa6-solid:flag',
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
            type: 'label',
            icon: 'fa6-solid:pepper-hot',
            children: [
                {
                    label: 'Toutes les épices et sauces',
                    icon: 'fa6-solid:pepper-hot',
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
                },
                {
                    label: 'Assaisonnements',
                    icon: 'fa6-solid:bottle-droplet',
                    to: '/products?categories=assaisonnements',
                },
            ]
        },
        {
            label: 'Boissons alcoolisées',
            type: 'label',
            icon: 'fa6-solid:beer-mug-empty',
            children: [
                {
                    label: 'Toutes les boissons',
                    icon: 'fa6-solid:beer-mug-empty',
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
                },
            ]
        },
        {
            label: 'Boissons sans alcool & Soda',
            type: 'label',
            icon: 'fa6-solid:glass-water',
            children: [
                {
                    label: 'Toutes les boissons',
                    icon: 'fa6-solid:glass-water',
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
                },
            ]
        },
        {
            label: 'Thé, Tisanes & Bois. chaudes',
            type: 'label',
            icon: 'fa6-solid:mug-hot',
            children: [
                {
                    label: 'Tous les thés, tisanes et bois. chaudes',
                    icon: 'fa6-solid:mug-hot',
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
            type: 'label',
            icon: 'fa6-solid:stroopwafel',
            children: [
                {
                    label: 'Tous les apéritifs et collations',
                    icon: 'fa6-solid:stroopwafel',
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
                },
            ]
        },
        {
            label: 'Sucre & Miels',
            type: 'label',
            icon: 'fa6-solid:cubes-stacked',
            children: [
                {
                    label: 'Sucre, miels',
                    icon: 'fa6-solid:cubes-stacked',
                    to: '/products?categories=sucre-miels',
                },
            ]
        },
        {
            label: 'Nouilles, pâtes & autres féculents',
            type: 'label',
            icon: 'fa6-solid:bowl-food',
            children: [
                {
                    label: 'Tous les féculents, sauces et préparations',
                    icon: 'fa6-solid:bowl-food',
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
                },
            ]
        },
        {
            label: 'Fruits & Légumes',
            type: 'label',
            icon: 'fa6-solid:apple-whole',
            children: [
                {
                    label: 'Tous les fruits et légumes',
                    icon: 'fa6-solid:apple-whole',
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
                },
            ]
        },
        {
            label: 'Produits de la mer',
            type: 'label',
            icon: 'fa6-solid:fish',
            children: [
                {
                    label: 'Tous les produits de la mer',
                    icon: 'fa6-solid:fish',
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
            type: 'label',
            icon: 'fa6-solid:bug',
            children: [
                {
                    label: 'Insectes comestibles',
                    icon: 'fa6-solid:bug',
                    to: '/products?categories=insectes-comestibles',
                },
            ]
        },
        {
            label: 'Cosmétiques',
            type: 'label',
            icon: 'fa6-solid:seedling',
            children: [
                {
                    label: 'Toutes les cosmétiques',
                    icon: 'fa6-solid:seedling',
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
                },
            ]
        },
        {
            label: 'Ustensiles de cusisine',
            type: 'label',
            icon: 'fa6-solid:utensils',
            children: [
                {
                    label: 'Ustensiles de cusisine',
                    icon: 'fa6-solid:utensils',
                    to: '/products?categories=ustensiles-cuisine',
                },
            ]
        },
        {
            label: 'Encens, Baguettes & Décorations',
            type: 'label',
            icon: 'fa6-solid:grip-lines',
            children: [
                {
                    label: 'Tous les encens, baguettes et décorations',
                    icon: 'fa6-solid:grip-lines',
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
    ]);
</script>

<template>
    <header
        class="backdrop-blur border-b border-default h-(--ui-header-height) top-0 z-50 flex flex-row justify-start items-center w-full min-h-28 px-0 bg-(--color-bg) fixed gap-6">
        <UContainer
            class="w-full max-w-(--ui-container) mx-auto pl-4 pr-0 sm:px-6 lg:px-8 flex items-center justify-between gap-3 h-full">
            <UContainer name="left" class="lg:flex-1 flex items-center gap-1.5">
                <nav class="sr-only">
                    <NuxtLink to="#main">{{ capitalize($t('header.skip_content')) }}</NuxtLink>
                </nav>
                <HeaderMobileMenuMolecule :items="itemsCategories" />
                <HeaderTitleLink highlight highlight-color="neutral" :class="'sr-only xl:not-sr-only'" />
            </UContainer>
        </UContainer>

        <UContainer name="right" class="flex items-center justify-end lg:flex-1 gap-1.5">
            <HeaderRightMenu v-show="isDesktop" />
        </UContainer>
    </header>
</template>