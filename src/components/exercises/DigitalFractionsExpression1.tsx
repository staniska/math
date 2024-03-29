import React from "react";
import Button from "./common/Button";
// import {EExercise} from "../Main";
import simpleClickHandler from "./common/simpleClickHandler";

export const DigitalFractionsExpression1: React.FC<{ scores: number, requireScores: number, scoresSetter: React.Dispatch<React.SetStateAction<number>> }> =
    ({scores, requireScores, scoresSetter}) => {

        const limits: [number, number] = [-1000, 1500]
        const limits2: [number, number] = [-70, 80]
        let trueValue: number = 0
        let expression: string = ''
        const generateValue: (lim: [number, number], divider?: number) => number = (lim, divider) => {
            if (divider === undefined) divider = 1
            let result: number = 0
            do {
                result = Math.round(lim[0] + Math.random() * (lim[1] - lim[0]))
            } while (result / divider !== Math.round(result / divider))
            return result
        }

        enum EDigitalExpressionType {
            MultAdd,

        }

        const type = Math.round(Math.random() * (Object.keys(EDigitalExpressionType).length / 2 - 1))

        if (type === EDigitalExpressionType.MultAdd) {
            let multResult = 0
            let dividers: number[] = []
            let multipliers: [number, number] = [0, 0]
            while (Math.abs(multResult) < 10) {
                trueValue = generateValue(limits, 10)
                multResult = trueValue + generateValue(limits, 10)
                if (Math.abs(trueValue - multResult) < 150) {
                    multResult = 0
                    continue
                }
                dividers = Array(limits2[1] - limits2[0] + 1).fill(0)
                    .map((n, i) => limits2[0] + i)
                    .filter(n => n !== 0)
                    .filter(n => (multResult / n) === Math.round(multResult / n))
                    .filter(n => Math.abs(n) > 10 && Math.abs(multResult / n) > 10)
                    .filter(n => n / 10 !== Math.round(n / 10) && multResult / n / 10 !== Math.round(multResult / n / 10))
                if (dividers.length < 2) multResult = 0
            }
            multipliers[0] = dividers[Math.round(Math.random() * (dividers.length - 1))]
            multipliers[1] = multResult / multipliers[0]
            const term = trueValue - multResult

            const expressionTerms: string[] = [...multipliers, term, trueValue]
                .map((n, i) => {
                    const divider = i < 2 ? 10 : 100
                    return '' + n / divider
                })
            if (multipliers[1] < 0) {
                expressionTerms[1] = `(${expressionTerms[1]})`
            }
            if (term < 0) {
                expressionTerms[2] = expressionTerms[2].substring(1)
            }

            expression = `${expressionTerms[0]} * ${expressionTerms[1]} ${term > 0 ? '+' : '-'} ${expressionTerms[2]}`
        }
        let answers: number[] =

                    Array(30)
                        .fill(0)
                        .map(() => generateValue(limits, 10))
                        .filter((v, i, a) => !a.filter((n, idx) => Math.abs(n) === Math.abs(v) && i !== idx).length)
                        .slice(0, 4 + Math.round(Math.random() * 4))

            answers.splice(3, 0, trueValue)
            answers = answers.sort(() => Math.random() - 0.5)
            console.log(answers.indexOf(trueValue))

        const clickHandler = (e: React.MouseEvent) => {
            const answer = simpleClickHandler(
                e,
                'digitalFractionExpression',
                answers.indexOf(trueValue),
                1,
                scores,
                requireScores,
                scoresSetter
            )

            if (!answer && answer !== null) {
                const node = document.createElement('h3')
                node.innerText = expression + ' = ' + trueValue / 100
                const mistakes = document.querySelector('.mistakes_list') as HTMLDivElement
                mistakes.appendChild(node)
            }
        }

        return (
            <div className={'digitalFractionExpression'}>
                <div className={'digitalFractionExercise'}>
                    <h3>{expression}</h3>
                </div>
                <div className={'answerButtons'} onClick={clickHandler}>
                    {
                        answers.map((a, idx) => <Button key={idx} value={{
                            resultType: 'TDigitalFraction',
                            results: [{value: a, decimalDigits: 2}]
                        }} idx={idx}/>)
                    }
                </div>
            </div>
        )
    }