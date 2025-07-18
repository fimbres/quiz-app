import type { ActionDispatch } from "react";
import type { Question } from "./questions";

export interface QuizState {
    started: boolean;
    questions: Question[];
    currentQuestion: number;
    time: number;
    score: number;
    roundEnded: boolean;
};

export type QuizAction = 
    { type: "set-current-question", payload: number } |
    { type: "set-time", payload: number } |
    { type: "set-score", payload: number } |
    { type: "start-quiz", payload: boolean } |
    { type: "set-round-ended", payload: boolean };

export type QuizContextType = {
    state: QuizState,
    dispatch: ActionDispatch<[action: QuizAction]>
};
