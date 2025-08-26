<script setup lang="ts">
const isUserLogged = ref<boolean>(false);
</script>

<template>
    <UCard :ui="{
        body: 'flex flex-col items-center w-full h-auto gap-4'
    }" class="absolute top-9/12 right-[0%]">
        <UAvatar icon="fa6-solid:circle-user" class="text-5xl" />
        <LayoutsMoleculesHeaderAvatarMenuConnectedUserMolecule v-if="isUserLogged" />
        <LayoutsMoleculesHeaderAvatarMenuDisconnectedUserMolecule v-else />
        <LayoutsOrganismsHeaderSettingsMenu />
    </UCard>
</template>