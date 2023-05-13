import React from "react";
import answerButtonHandler from "./answerButtonHandler";

const simpleClickHandler:
    (e: React.MouseEvent,
     exerciseClassName: string,
     trueButtonId: number,
     exerciseWeight: number,
     scores: number,
     requireScores: number,
     scoresSetter: React.Dispatch<React.SetStateAction<number>>
    ) => boolean | null =
    (e,exerciseClassName, trueButtonId,exerciseWeight, scores, requireScores, scoresSetter) => {

        let target = (e.target as HTMLElement)
        if (target.tagName !== 'BUTTON' && target.closest('button') !== null) {
            target = target.closest('button') as HTMLButtonElement
        }

        if (target.tagName !== 'BUTTON') return null

        const buttons = Array.from((target.closest(`.${exerciseClassName}`) as HTMLDivElement).querySelectorAll('button'))
        buttons.forEach(b => b.disabled = true)

        const trueButton = buttons.filter(btn => parseInt(btn.value) === trueButtonId)[0]
        trueButton.classList.add('btnGreen')
        const answer = (target as HTMLButtonElement).value === trueButton.value
        const timeout = answer? 100: 2000

        setTimeout(() => {
            trueButton.classList.remove('btnGreen')
            buttons.forEach(b => b.disabled = false)

            answerButtonHandler(
                answer,
                exerciseWeight,
                requireScores,
                scores,
                scoresSetter
            )
        }, timeout)

        return answer
    }

export default simpleClickHandler