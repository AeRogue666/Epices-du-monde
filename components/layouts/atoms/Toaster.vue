<script setup lang="ts">
const props = defineProps<{
    event: {
        code: number,
        msg: string,
        color: "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral" | undefined,
    }
}>();

const toast = useToast(),
    toaster = (code?: number, msg?: string, color?: "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral" | undefined) => {
        toast.add({
            title: msg,
            description: `Code: ${code}`,
            color: color,
        })
    };
watch(props.event, (newEvent) => {
    toaster(newEvent?.code, newEvent?.msg, newEvent?.color)
}, { deep: true })
</script>

<template>

</template>