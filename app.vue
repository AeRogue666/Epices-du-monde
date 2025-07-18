<script setup lang="ts">
  import TheHeader from './components/layouts/TheHeader.vue';
  import TheFooter from './components/layouts/TheFooter.vue';

  useHeadSafe({
    link: [
      { rel: 'preconnect', href: "https://fonts.googleapis.com" },
      { rel: 'preconnect', href: "https://fonts.gstatic.com" },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap' },
    ]
  })

  useSeoMeta({
    title: 'Epices du Monde',
    ogTitle: 'Épicerie Asiatique & Exotique – Épices Du Monde | Livraison France',
    description: 'Commandez en ligne vos produits asiatiques et exotiques : sauces, épices, riz, thés… sur epices-du-monde.com. Boutique ouverte en ville et expédition rapide.',
    ogDescription: 'Commandez en ligne vos produits asiatiques et exotiques : sauces, épices, riz, thés… sur epices-du-monde.com. Boutique ouverte en ville et expédition rapide.',
    ogImage: '',
    ogUrl: 'https//www.epices-du-monde.com',
    ogSiteName: 'epices-du-monde.com',
    ogType: 'website',
    twitterTitle: 'Épicerie Asiatique & Exotique – Épices Du Monde | Livraison France',
    twitterCard: 'summary_large_image',
    twitterDescription: 'Commandez en ligne vos produits asiatiques et exotiques : sauces, épices, riz, thés… sur epices-du-monde.com. Boutique ouverte en ville et expédition rapide.',
    twitterImage: '',
    twitterSite: '@epices-du-monde.com',
    googleSiteVerification: 'KW-vaMpUJqCPV9bqy54jn_cMkWti7eiInTwIwYhtJ88',
    // facebookDomainVerification: 'ivmn6elre6bpa0nayqb7qmy91h5pta',
  });

  /*
  <NuxtImg src="/img/logo.png" alt="Image of the logo of Epices du Monde" width="400" height="400"
    v-slot="{ src, isLoaded, imgAttrs }">
    <!-- Show the actual image when loaded -->
    <img v-if="isLoaded" v-bind="imgAttrs" :src="src">
    <!-- Show a placeholder while loading -->
    <img v-else src="https://placehold.co/400x400" alt="placeholder">
  </NuxtImg>
  */
</script>

<template>
  <UApp>
    <NuxtLayout>
      <TheHeader />

      <main id="#main">
        <NuxtPage />
      </main>
      <TheFooter>
        <template #down>
          <span class="text-base">© 2009-2025 Epices Du Monde. Tous droits réservés.</span>
          <span class="text-base">Epices Du Monde - 4 chemin du moulon - 07200 Aubenas</span>
          <span class="text-base">Siret : 82402921900014</span>
        </template>
      </TheFooter>
    </NuxtLayout>
  </UApp>
</template>