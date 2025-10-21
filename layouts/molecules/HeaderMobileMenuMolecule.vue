<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import type { ArrayOrNested } from '@nuxt/ui/runtime/types/utils.js';
import HeaderTitleLink from '../atoms/HeaderTitleLink.vue';

defineProps<{
    items: ArrayOrNested<NavigationMenuItem> | undefined,
}>();
</script>

<template>
    <UCollapsible>
        <UButton variant="ghost" color="neutral" icon="fa6-solid:bars" aria-label="Open menu" />
        <template #content>
            <div id="mobile-menu"
                class="block w-full lg:w-auto min-w-[15rem] h-auto max-h-screen bg-(--color-bg) lg:border-solid lg:border-r-2 border-b-2 border-gray-300 lg:rounded-r-xl basis-0.5 absolute top-[101%] left-0 overflow-hidden overflow-y-scroll z-50 [&::-webkit-scrollbar]:bg-transparent [&::-webkit-scrollbar]:w-2">
                <HeaderTitleLink highlight highlight-color="neutral" :class="'not-sr-only xl:sr-only'" />
                <UNavigationMenu highlight-color="neutral" orientation="vertical" :items="items" :ui="{
                    root: '',
                    list: 'flex flex-col gap-2', // ul
                    label: 'text-3xl text-muted font-semibold',
                    childList: 'sm:w-72',
                    childLinkWrapper: 'pb-2', // li
                    childLink: '', // a
                    childLinkDescription: 'text-balance line-clamp-2',
                    link: 'text-muted',
                    linkLeadingIcon: 'text-muted',
                    linkLabel: 'text-base truncate',
                    linkTrailingIcon: 'text-xl',
                }" class="h-screen m-0 px-2 py-8 lg:pt-2 bg-transparent opacity-100 data-[orientation=vertical]:w-full" />
            </div>
        </template>
    </UCollapsible>

    <!-- <UNavigationMenu highlight highlight-color="primary" orientation="horizontal" :items="itemsDesktop" :ui="{
            label: 'text-3xl font-semibold',
            childList: 'sm:w-96',
            childLinkDescription: 'text-balance line-clamp-2',
            linkLabel: 'text-base truncate',
            linkTrailingIcon: 'text-xl',
        }" class="m-0 px-2 py-8 bg-transparent opacity-100 data-[orientation=vertical]:w-full">
            <template #item-content="{ item, index }">
                <ul class="grid md:grid-cols-2 gap-2">
                    <li v-for="(child, childIndex) of item.children" :value="item.value || `item-${index}`">
                        <ULink v-if="child.type == 'label'" v-slot="{ active }" v-bind="item.children" custom>
                            <UPopover>
                                <ULinkBase>
                                    <ULink as="button" :type="child.type" :index="childIndex"
                                        class="flex flex-row items-center text-muted font-semibold mx-2 my-4 mr-0 gap-4"
                                        inactive-class="text-muted">
                                        <ULinkBase as-child :active="active">
                                            <UIcon v-if="child.icon" :name="child.icon" />
                                            <span>{{ child.label }}</span>
                                        </ULinkBase>
                                    </ULink>
                                </ULinkBase>

                                <template #content>
                                    <slot :name="item.slot ? `${item.slot}-content` : 'item-content'" :item="item"
                                        :active="active || item.active" :index="index">
                                        <ul>
                                            <li v-for="(childItem, childIndex) in child.children"
                                                class="flex flex-row items-center text-muted font-semibold mx-4 mb-2"
                                                :key="childIndex">
                                                <ULink :to="childItem.to"
                                                    v-slot="{ active: childActive, ...childSlotProps }" custom>
                                                    <ULinkBase as-child :active="childActive"
                                                        @select="childItem.onSelect" v-bind="childSlotProps">
                                                        <UIcon :name="childItem.icon || 'fa6-solid:circle'"
                                                            class="mr-2" />
                                                        <span>{{ childItem.label }}</span>
                                                    </ULinkBase>
                                                </ULink>
                                            </li>
                                        </ul>
                                    </slot>
                                </template>
                            </UPopover>
                        </ULink>
                    </li>
                </ul>
            </template>
        </UNavigationMenu> -->
</template>