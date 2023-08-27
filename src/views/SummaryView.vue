<template>
  <div>
    <p class="text-4xl mb-4 font-bold">Results</p>
    <div class="flex mb-20">
      <p class="text-2xl font-bold">
        Points: {{ currentTestScore }} / {{ currentTestQuestions.length }}
      </p>
      <p class="text-2xl font-bold ml-8">
        Percentage:
        <span
          :class="
            ({ 'text-green-500': (currentTestScore / currentTestQuestions.length) * 100 >= 85 },
            { 'text-red-500': (currentTestScore / currentTestQuestions.length) * 100 < 85 })
          "
          >{{ (currentTestScore / currentTestQuestions.length) * 100 }} %</span
        >
      </p>
      <v-btn class="ml-28" @click="router.push('/')">Back to homepage</v-btn>
    </div>
    <div v-for="(question, i) in currentTestQuestions" :key="'question_' + i" class="mb-14">
      <p class="text-lg font-bold mb-6">{{ question.question }}</p>
      <div
        v-for="(answer, j) in question.answers"
        :key="'question_' + i + 'answer_' + j"
        class="flex"
      >
        <v-icon
          v-show="getGivenAnswer(i).includes(answer) && answer.isCorrect"
          color="success"
          icon="mdi-check-circle"
        />
        <v-icon
          v-show="getGivenAnswer(i).includes(answer) && !answer.isCorrect"
          color="error"
          icon="mdi-close-box"
        />
        <v-icon
          v-show="!(getGivenAnswer(i).includes(answer) && answer.isCorrect) && answer.isCorrect"
          color="info"
          icon="mdi-information-box"
        />
        <p
          :class="[
            'mb-3',
            'ml-2',
            'font-semibold',
            {
              'ml-8': !getGivenAnswer(i).includes(answer) && !answer.isCorrect
            },
            {
              'text-green-500': getGivenAnswer(i).includes(answer) && answer.isCorrect
            },
            {
              'text-blue-500':
                !(getGivenAnswer(i).includes(answer) && answer.isCorrect) && answer.isCorrect
            },
            { 'text-red-500': getGivenAnswer(i).includes(answer) && !answer.isCorrect }
          ]"
        >
          {{ answer.answer }}
        </p>
      </div>
    </div>
    <v-btn @click="router.push('/')">Back to homepage</v-btn>
  </div>
</template>

<script setup>
import { useTestStore } from '@/stores/test'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const testStore = useTestStore()
const router = useRouter()
const { currentTestQuestions, currentGivenAnswers, currentTestScore } = storeToRefs(testStore)

const getGivenAnswer = (index) => {
  if (currentGivenAnswers.value[index]) {
    return currentGivenAnswers.value[index]
  }
  return []
}
</script>

<style scoped></style>
