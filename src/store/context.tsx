import { createContext, useReducer, type FC, type PropsWithChildren } from "react";

import { initialState, quizReducer } from "./reducer";
import type { QuizContextType } from "../types/store";

export const QuizContext = createContext<QuizContextType>({ state: initialState, dispatch: () => null });

export const QuizContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(quizReducer, initialState);

    return (
        <QuizContext.Provider value={{ state, dispatch }}>
            {children}
        </QuizContext.Provider>
    )
}
