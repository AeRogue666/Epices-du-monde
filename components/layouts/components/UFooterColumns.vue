<script setup lang="ts">
    const props = defineProps<{
        columns:
        {
            label: string,
            children?: {
                label: string,
                to?: string,
                target?: string,
                icon?: string,
            }[]
        }[]
    }>();
</script>

<template>
    <footer>
        <nav class="xl:grid xl:grid-cols-3 xl:gap-8 w-full">
            <div class="block mb-10 xl:mb-0">
                <slot name="left"></slot>
            </div>
            <div class="flex flex-col lg:grid grid-flow-col auto-cols-fr gap-8 xl:col-span-2">
                <div v-for="(obj, i) of props.columns" :key="i">
                    <h3 class="text-sm font-semibold">{{ obj.label }}</h3>
                    <ul class="mt-6 space-x-4">
                        <li v-for="(child, i) of obj.children" class="relative" :key="i">
                            <a v-if="!child.icon && child.to" :href="child.to" rel="noopener noreferrer"
                                class="group text-sm flex items-center gap-1.5 focus-visible:outline-primary text-muted hover:text-default transition-colors"
                                :target="child.target">
                                <span class="truncate">
                                    {{ child.label }}
                                    <span
                                        class="iconify i-lucide:arrow-up-right size-3 absolute top-0 text-dimmed inline-block"
                                        aria-hidden="true"></span>
                                </span>
                            </a>
                            <a v-else-if="child.icon && child.to" :href="child.to" rel="noopener noreferrer"
                                class="group text-sm flex items-center gap-1.5 focus-visible:outline-primary text-muted hover:text-default transition-colors"
                                :target="child.target" :aria-label="child.label">
                                <UIcon :name="child.icon" class="text-3xl" />
                            </a>
                            <UIcon v-else-if="!(child.to && child.target)" :name="child.icon || ''" class="text-3xl" />
                        </li>
                    </ul>
                </div>
            </div>
            <div class="block mt-10 xl:mt-0">
                <slot name="right"></slot>
            </div>
        </nav>
    </footer>
</template>