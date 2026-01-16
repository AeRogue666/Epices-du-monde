<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui';
import { getStorage, saveStorage } from '~/assets/ts/storageFunctions';
import HeaderSettingsMenu from './HeaderSettingsMenu.vue';

const route = useRoute(),
    router = useRouter();

const tabs = ref<TabsItem[]>([
    { label: 'Home', icon: 'i-fa7-solid:house', value: 'home' },
    { label: 'Cart', icon: 'i-fa7-solid:cart-shopping', value: 'cart' },
    { label: 'Settings', icon: 'i-fa7-solid:sliders', value: 'settings' },
]),
    isSettingsMenuOpen = ref<boolean>(false);

const active = computed({
    get() {
        return 'home'
    },
    set(tab) {
        if (tab === 'cart') {
            router.push({ path: '/cart' })
            saveStorage('tabs', 'cart')
        }
        else if (tab === 'home') {
            router.push({ path: '/' })
            saveStorage('tabs', 'home')
        }
        else if (tab === 'settings') {
            isSettingsMenuOpen.value = !isSettingsMenuOpen.value
            saveStorage('tabs', 'settings')
        }
    }
})
</script>

<template>
    <UContainer class="flex flex-row items-center w-full fixed bottom-0 opacity-100">
        <UTabs v-model="active" :content="false" :unmount-on-hide="false" :items="tabs" color="error" variant="pill"
            class="w-full" />
        <HeaderSettingsMenu v-show="isSettingsMenuOpen" />
    </UContainer>
</template>