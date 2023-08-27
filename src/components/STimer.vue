<template>
  <div>
    <p class="text-3xl font-bold">
      {{ (minutes < 10 ? '0' : '') + minutes }} : {{ (seconds < 10 ? '0' : '') + seconds }}
    </p>
  </div>
</template>

<script setup>
import { onUnmounted } from 'vue'
import { onMounted } from 'vue'
import { ref } from 'vue'

const emit = defineEmits(['testTimeout'])
const minutes = ref(60)
const seconds = ref(0)
const timer = ref({})

onMounted(() => {
  timer.value = setInterval(() => {
    if (seconds.value - 1 < 0) {
      seconds.value = 59
      if (minutes.value !== 0) minutes.value--
    } else {
      seconds.value--
    }
    if (minutes.value === 0 && seconds.value === 0) {
      emit('testTimeout')
    }
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer.value)
})
</script>

<style scoped></style>
