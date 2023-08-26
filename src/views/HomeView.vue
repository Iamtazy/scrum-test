<template>
  <div>
    <h1 class="mb-8">Scrum Test Application</h1>
    <div class="flex flex-row justify-between">
      <v-btn @click="router.push('/simulate-test')"> Simulate test </v-btn>
      <v-btn @click="router.push('/all-questions')"> Test with all questions </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style scoped>
h1 {
  font-size: 40px;
}
</style>
