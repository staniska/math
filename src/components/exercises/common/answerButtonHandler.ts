import React from "react";

const answerButtonHandler: (answer: boolean, weight: number, reqScores: number, scores: number, scoresSetter: React.Dispatch<React.SetStateAction<number>>) => void =
    (answer, weight, reqScores, scores, scoresSetter) => {
        if (answer) {
            if (scores + weight < reqScores) {
                scoresSetter(prev => scores + weight)
            } else {
                scoresSetter(prev => reqScores)
            }
        } else {
            scoresSetter(prev => scores - weight)
        }
    }

export default answerButtonHandler