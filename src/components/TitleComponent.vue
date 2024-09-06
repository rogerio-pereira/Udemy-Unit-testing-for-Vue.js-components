<template>
    <h1>{{ value }}</h1>
</template>

<script setup lang='ts'>
    import { onMounted } from "vue"

    export interface TitleComponentProps {
        value?: string
    }

    defineProps<TitleComponentProps>()
    const emit = defineEmits<{
        (e: 'on-mounted') : void
    }>()

    onMounted(() => {
        emit('on-mounted')
    })
</script>
