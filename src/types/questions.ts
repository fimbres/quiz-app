export interface Question {
  id: number
  question: string
  options: string[]
  correctAnswerIndex: number
}

export interface QuizFile {
  questions: Question[]
}
