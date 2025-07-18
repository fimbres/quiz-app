import type { QuizAction, QuizState } from "../types/store";

import db from "../../public/db.json";

export const initialState: QuizState = {
    started: false,
    roundEnded: false,
    questions: db.questions,
    currentQuestion: 0,
    time: 60 * 1000,
    score: 0
};

export const quizReducer = (state: QuizState, action: QuizAction) => {
    switch(action.type) {
        case "set-time":
            return {
                ...state,
                time: action.payload,
            };
        case "set-score":
            return {
                ...state,
                score: action.payload,
            };
        case "set-current-question":
            return {
                ...state,
                currentQuestion: action.payload,
            };
        case "start-quiz":
            return {
                ...state,
                started: action.payload,
            };
        case "set-round-ended": 
            return {
                ...state,
                roundEnded: action.payload,
            };
        default: 
            return state;
    }
};
