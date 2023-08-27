<template>
  <div>
    <s-timer
      v-if="route.path === '/simulate-test'"
      class="text-center relative bottom-4 lg:bottom-28"
      @testTimeout="router.push('/test-summary')"
    />
    <s-question
      :questionObject="currentTestQuestion"
      @answerSubmitted="handleAnswers"
      @backToPrevious="backToPrevious"
    />
    <div class="text-center font-bold mt-10">
      {{ currentTestQuestionCounter + 1 }} / {{ currentTestQuestions.length }}
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTestStore } from '@/stores/test'
import { storeToRefs } from 'pinia'
import SQuestion from '../components/SQuestion.vue'
import STimer from '../components/STimer.vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const testStore = useTestStore()

const {
  currentTestQuestions,
  currentGivenAnswers,
  currentTestQuestionCounter,
  currentTestQuestion
} = storeToRefs(testStore)

const handleAnswers = (answers) => {
  currentGivenAnswers.value.push(answers)
  if (
    answers.length === currentTestQuestion.value.numberOfCorrectAnswers &&
    answers.every((answer) => answer.isCorrect)
  ) {
    testStore.currentTestScore++
  }
  if (currentTestQuestionCounter.value === currentTestQuestions.value.length - 1) {
    router.push('/test-summary')
    return
  }
  testStore.getNextQuestion()
}

const backToPrevious = () => {
  testStore.backToPrevious()
}

onMounted(() => {
  if (route.path === '/all-questions') {
    testStore.startAllQuestionTest()
  } else {
    testStore.startSimulatedTest()
  }
})
</script>

<style scoped></style>
