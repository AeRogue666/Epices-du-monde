<script setup lang="ts">
import AppHeader from './layouts/AppHeader.vue';
import AppFooter from './layouts/AppFooter.vue';
import { capitalize } from 'vue';

useSeoMeta({
  title: 'Epices du Web - Epicerie Asiatique & Exotique',
  ogTitle: 'Épicerie Asiatique & Exotique – Épices Du Web | Livraison France',
  description: 'Commandez en ligne vos produits asiatiques et exotiques : sauces, épices, riz, thés… sur epices-du-monde.vercel.app. Boutique ouverte en ville et expédition rapide.',
  ogDescription: 'Commandez en ligne vos produits asiatiques et exotiques : sauces, épices, riz, thés… sur epices-du-monde.vercel.app. Boutique ouverte en ville et expédition rapide.',
  ogType: "website"
});
</script>

<template>
  <UApp>
    <NuxtLayout>
      <a href="#main"
        class="sr-only focus:not-sr-only focus:fixed focus:top^-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md">
        {{ $t('header.skip_content') }}
      </a>
      <AppHeader />

      <main id="main" class="min-h-screen"> <!-- class="min-h-[calc(100vh-calc(.25rem*16))]" -->
        <NuxtRouteAnnouncer />
        <NuxtPage />
      </main>
      <AppFooter>
        <template #down>
          <span class="text-base">© 2025-{{ new Date().getFullYear() }} Epices Du Web. {{
            capitalize($t('footer.copyright')) }}</span>
          <span class="text-base">Epices Du Web - 555 Les Traverses - 07200 Lachapelle-sous-Aubenas</span>
          <span class="text-base">Siret : UN MAGNIFIQUE SIRET</span>
        </template>
      </AppFooter>
    </NuxtLayout>
  </UApp>
</template>