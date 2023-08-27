<template>
  <div>
    <p class="text-xl mb-14 font-bold">{{ questionObject.question }}</p>
    <div class="mb-4" v-for="(answer, i) in questionObject.answers" :key="'answer_' + i">
      <div class="flex align-center">
        <span class="inline-block mr-6 font-bold">{{ i + 1 }}.</span>
        <div
          ref="answerRefs"
          :class="[
            'cursor-pointer',
            'inline-block',
            'hover:bg-gray-300',
            'p-2',
            'border',
            'border-gray-800',
            { 'bg-white': !selectedAnswers.includes(answer) },
            { 'bg-blue-200': selectedAnswers.includes(answer) }
          ]"
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
    <v-btn ripple class="mt-6 ml-9" @click="skipAnswer">Skip answer</v-btn>
    <v-btn v-show="currentTestQuestionCounter > 0" ripple class="mt-6 ml-9" @click="backToPrevious"
      >Back to previous</v-btn
    >
  </div>
</template>

<script setup>
import { useTestStore } from '@/stores/test'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
const props = defineProps(['questionObject'])
const emit = defineEmits(['answerSubmitted', 'backToPrevious'])
const testStore = useTestStore()
const { currentGivenAnswers, currentTestQuestionCounter } = storeToRefs(testStore)

const selectedAnswers = ref([])
const answerRefs = ref([])

watch(currentTestQuestionCounter, async () => {
  if (currentGivenAnswers.value[currentTestQuestionCounter.value]) {
    selectedAnswers.value = currentGivenAnswers.value[currentTestQuestionCounter.value]
  }
})

const clickAnswer = (answer) => {
  if (!props.questionObject.isMultipleChoice) {
    selectedAnswers.value = []
  }
  if (!selectedAnswers.value.includes(answer)) {
    selectedAnswers.value.push(answer)
  } else {
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

const skipAnswer = () => {
  emit('answerSubmitted', selectedAnswers.value)
  selectedAnswers.value = []
  answerRefs.value.forEach((ref) => {
    ref.classList.remove('bg-blue-200')
    ref.classList.add('bg-white')
  })
}

const backToPrevious = () => {
  emit('backToPrevious')
}
</script>

<style scoped></style>
