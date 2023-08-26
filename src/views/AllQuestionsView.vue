<template>
  <div>
    <simple-question
      v-if="!currentTestQuestion.isMultipleChoice"
      :questionObject="currentTestQuestion"
      @answerSubmitted="handleAnswers"
    />
    <multiple-question
      v-else
      :questionObject="currentTestQuestion"
      @answerSubmitted="handleAnswers"
    />
    <div class="text-center font-bold mt-10">
      {{ currentTestQuestionCounter + 1 }} / {{ allQuestions.length }}
    </div>
    {{ currentTestScore }}
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTestStore } from '@/stores/test'
import { storeToRefs } from 'pinia'
import SimpleQuestion from '../components/SimpleQuestion.vue'
import MultipleQuestion from '../components/MultipleQuestion.vue'

const testStore = useTestStore()

const { allQuestions, currentTestQuestionCounter, currentTestQuestion, currentTestScore } =
  storeToRefs(testStore)

const handleAnswers = (answers) => {
  answers
  if (answer.isCorrect) {
    testStore.currentTestScore++
  }
  testStore.getNextQuestion()
}

onMounted(() => {
  testStore.startAllQuestionTest()
})
</script>

<style scoped></style>
