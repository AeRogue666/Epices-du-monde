<script setup lang="ts">
import HeaderAvatarMenuConnectedUserMolecule from '../molecules/HeaderAvatarMenuConnectedUserMolecule.vue';
import HeaderAvatarMenuDisconnectedUserMolecule from '../molecules/HeaderAvatarMenuDisconnectedUserMolecule.vue';
import HeaderSettingsMenu from './HeaderSettingsMenu.vue';

const isUserLogged = ref<boolean>(false);
</script>

<template>
    <UCard :ui="{
        body: 'flex flex-col items-center w-full h-auto gap-4'
    }" class="absolute top-9/12 xl:top-9/12 right-[0%] z-50">
        <UAvatar icon="fa6-solid:circle-user" class="text-5xl" size="xl" />
        <HeaderAvatarMenuConnectedUserMolecule v-if="isUserLogged" />
        <HeaderAvatarMenuDisconnectedUserMolecule v-else />
        <HeaderSettingsMenu />
    </UCard>
</template>