<template>
  <div>
    <p class="text-xl mb-14 font-bold">{{ questionObject.question }}</p>
    <div class="mb-4" v-for="(answer, i) in questionObject.answers" :key="'answer_' + i">
      <div class="flex align-center">
        <span class="inline-block mr-6 font-bold">{{ i + 1 }}.</span>
        <div
          class="cursor-pointer inline-block bg-white hover:bg-gray-300 p-2 border border-gray-800"
          @click="clickAnswer(answer)"
        >
          {{ answer.answer }}
        </div>
      </div>
    </div>
    {{ selectedAnswers }}
    <v-btn
      ripple
      color="rgba(110, 231, 183, 1)"
      class="mt-6 ml-9"
      @click="emit('answerSubmitted', selectedAnswers)"
      >Submit answer</v-btn
    >
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps(['questionObject'])
const emit = defineEmits(['answerSubmitted'])
const selectedAnswers = ref([])

const clickAnswer = (answer) => {
  if (!selectedAnswers.value.includes(answer)) {
    selectedAnswers.value.push(answer)
  } else {
    selectedAnswers.value.splice(selectedAnswers.value.indexOf(answer), 1)
  }
}
</script>

<style scoped></style>
