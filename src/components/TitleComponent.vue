<template>
    <h1>{{ value }}</h1>
</template>

<script setup lang='ts'>
    defineProps<{
        value: string
    }>()
</script>
