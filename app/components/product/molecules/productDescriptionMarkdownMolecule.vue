<script setup lang="ts">
import markdownit from 'markdown-it'

const props = defineProps<{
    source: any,
}>(),
    md = markdownit({
        html: true,
        linkify: true,
        typographer: true
    }),
    result = md.render(props.source);
</script>

<template>
    <UCard :ui="{
        body: 'shadow-none justify-content items-baseline'
    }">
        <template #default>
            <div class="prose mt-1 text-sm text-pretty text-muted">
                <div v-html="result"></div>
                <!-- <MDCRenderer :body="source" :prose="true" /> -->
            </div>
        </template>
    </UCard>
</template>