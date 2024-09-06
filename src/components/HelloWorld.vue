<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import axios from 'axios'
import { useAppStore } from '../stores/appStore'
import TitleComponent from './TitleComponent.vue'

export interface HelloWorldProps {
  msg?: String,
}

const props = defineProps<HelloWorldProps>()

const emit = defineEmits<{
    (e: 'card-clicked') : void,
    (e: 'up', count: number) : void,
}>()

const count = ref(0)

const increment = () => {
    count.value++
}

const prefixedMessage = computed(() => 'My Title: '+props.msg)

const changeMessage = useAppStore()

const handleCardClick = () => {
    emit('card-clicked')
}

const handleTitleMounted = () => {
    emit('up', count.value)
}

watch(() => props.msg, (value) => {
    // fetch('https://example.com/'+value)
    // axios.get('https://httpbin.org/get')

    if(!value) {
        return
    }

    changeMessage(value)
})
</script>

<template>
  <title-component 
    :value='prefixedMessage' 
    v-if='msg'
    @on-mounted='handleTitleMounted'
  />

  <!-- If it doesn't have msg, it will add card-success class  -->
  <div class="card" :class="{ 'card-success': !msg }" @click="handleCardClick">
    <button type="button" @click="increment">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
