import { ref } from 'vue'
import { defineStore } from 'pinia'
import questionsJson from '../assets/questions.json'

export const useTestStore = defineStore('test', () => {
  const allQuestions: any = ref(questionsJson)
  const currentTestQuestions: any = ref([])
  const currentGivenAnswers = ref([])
  const currentTestQuestionCounter = ref(0)
  const currentTestQuestion = ref({})
  const currentTestScore = ref(0)

  const startAllQuestionTest = () => {
    currentTestScore.value = 0
    currentTestQuestionCounter.value = 0
    currentGivenAnswers.value = []
    currentTestQuestions.value = allQuestions.value.sort(() => Math.random() - 0.5)
    currentTestQuestion.value = currentTestQuestions.value[currentTestQuestionCounter.value]
  }

  const startSimulatedTest = () => {
    currentTestScore.value = 0
    currentTestQuestionCounter.value = 0
    currentGivenAnswers.value = []
    currentTestQuestions.value = allQuestions.value.sort(() => Math.random() - 0.5).slice(0, 80)
    currentTestQuestion.value = currentTestQuestions.value[currentTestQuestionCounter.value]
  }

  const getNextQuestion = () => {
    currentTestQuestionCounter.value++
    currentTestQuestion.value = currentTestQuestions.value[currentTestQuestionCounter.value]
  }

  const backToPrevious = () => {
    currentTestQuestionCounter.value--
    currentTestQuestion.value = currentTestQuestions.value[currentTestQuestionCounter.value]
  }

  return {
    allQuestions,
    currentTestQuestions,
    currentGivenAnswers,
    currentTestQuestionCounter,
    currentTestQuestion,
    currentTestScore,
    startAllQuestionTest,
    startSimulatedTest,
    backToPrevious,
    getNextQuestion
  }
})
