<script setup lang="ts">
import AppHeader from './layouts/AppHeader.vue';
import AppFooter from './layouts/AppFooter.vue';
import { capitalize } from 'vue';

useSeoMeta({
  title: 'Epices du Monde - Epicerie Asiatique & Exotique',
  ogTitle: 'Épicerie Asiatique & Exotique – Épices Du Monde | Livraison France',
  description: 'Commandez en ligne vos produits asiatiques et exotiques : sauces, épices, riz, thés… sur epices-du-monde.com. Boutique ouverte en ville et expédition rapide.',
  ogDescription: 'Commandez en ligne vos produits asiatiques et exotiques : sauces, épices, riz, thés… sur epices-du-monde.com. Boutique ouverte en ville et expédition rapide.',
  ogType: "website"
});
</script>

<template>
  <UApp>
    <AppHeader />

    <main id="main" class="min-h-screen"> <!-- class="min-h-[calc(100vh-calc(.25rem*16))]" -->
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </main>
    <AppFooter>
      <template #down>
        <span class="text-base">© 2009-{{ new Date().getFullYear() }} Epices Du Monde. {{
          capitalize($t('footer.copyright')) }}</span>
        <span class="text-base">Epices Du Monde - 4 chemin du moulon - 07200 Aubenas</span>
        <span class="text-base">Siret : 82402921900014</span>
      </template>
    </AppFooter>
  </UApp>
</template>