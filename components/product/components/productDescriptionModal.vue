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
    <div class="prose">
        <div v-html="result"></div>
        <!-- <MDCRenderer :body="source" :prose="true" /> -->
    </div>
</template>
