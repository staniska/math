import React from "react";

const answerButtonHandler: (answer: boolean, weight: number, reqScores: number, scores: number, scoresSetter: React.Dispatch<React.SetStateAction<number>>) => void =
    (answer, weight, reqScores, scores, scoresSetter) => {
        if (answer) {
            if (scores + weight < reqScores) {
                scoresSetter(() => scores + weight)
            } else {
                scoresSetter(() => reqScores)
            }
        } else {
            scoresSetter(() => scores - 2 * weight)
        }
    }

export default answerButtonHandler