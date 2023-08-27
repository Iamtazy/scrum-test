<template>
  <div>
    <p class="text-xl mb-14 font-bold">{{ questionObject.question }}</p>
    <div class="mb-4" v-for="(answer, i) in questionObject.answers" :key="'answer_' + i">
      <div class="flex align-center">
        <span class="inline-block mr-6 font-bold">{{ i + 1 }}.</span>
        <div
          ref="answerRefs"
          class="cursor-pointer inline-block bg-white hover:bg-gray-300 p-2 border border-gray-800"
          @click="clickAnswer(answer, i)"
        >
          {{ answer.answer }}
        </div>
      </div>
    </div>
    <v-btn
      :disabled="selectedAnswers.length === 0"
      ripple
      color="rgba(110, 231, 183, 1)"
      class="mt-6 ml-9"
      @click="submitAnswer"
      >Submit answer</v-btn
    >
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps(['questionObject'])
const emit = defineEmits(['answerSubmitted'])

const selectedAnswers = ref([])
const answerRefs = ref([])

const clickAnswer = (answer, index) => {
  if (!props.questionObject.isMultipleChoice) {
    selectedAnswers.value = []
    answerRefs.value.forEach((ref) => {
      ref.classList.remove('bg-blue-200')
      ref.classList.add('bg-white')
    })
  }
  answerRefs.value[index].classList.remove('bg-white')
  answerRefs.value[index].classList.add('bg-blue-200')
  if (!selectedAnswers.value.includes(answer)) {
    selectedAnswers.value.push(answer)
  } else {
    answerRefs.value[index].classList.remove('bg-blue-200')
    answerRefs.value[index].classList.add('bg-white')
    selectedAnswers.value.splice(selectedAnswers.value.indexOf(answer), 1)
  }
}

const submitAnswer = () => {
  emit('answerSubmitted', selectedAnswers.value)
  selectedAnswers.value = []
  answerRefs.value.forEach((ref) => {
    ref.classList.remove('bg-blue-200')
    ref.classList.add('bg-white')
  })
}
</script>

<style scoped></style>
