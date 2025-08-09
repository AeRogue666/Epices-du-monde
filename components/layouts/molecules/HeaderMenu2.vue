<script setup lang="ts">
import { capitalize } from 'vue';

const menu = reactive<{
    label: string,
    arrow: boolean,
    link?: string,
    children?: Array<object>
}[]>([
    {
        label: 'par pays',
        arrow: true,
        children: [
            {
                label: 'taïwan',
                icon: 'flag:tw-1x1',
                link: '',
            }
        ]
    },
    {
        label: 'boissons alcoolisées',
        arrow: true,
        children: [
            {
                label: 'Alcool 1',
                icon: 'flag:tw-1x1',
                link: '',
            }
        ]
    }
]);
</script>

<template>
    <div class="absolute top-full z-50">
        <nav class="flex items-stretch w-full h-auto basis-auto shrink-0 overflow-x-hidden">
            <ol class="w-full m-0 p-0 pt-2.5 list-none shrink-0">
                <li v-for="(obj, i) of menu" :key="i">
                    <a data-target="header/navigation/main/sub1" class="block text-xl px-4 py-2.5 border-b-[.0625rem] border-solid border-gray-600 relative">
                        <span>{{ capitalize(obj.label) }}</span>
                        <UIcon v-if="obj.arrow == true" name="i-lucide-arrow-right" />
                    </a>
                </li>
            </ol>
        </nav>
    </div>
</template>