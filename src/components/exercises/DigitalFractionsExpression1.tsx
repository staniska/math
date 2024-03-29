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
            DivideAdd,
        }

        let type = Math.round(Math.random() * (Object.keys(EDigitalExpressionType).length / 2 - 1))
        // type = 1

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
                    .filter((n:number) => (multResult / n) === Math.round(multResult / n))
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
        if (type === EDigitalExpressionType.DivideAdd) {
            let divideResult = 0
            let multipliers: number[] = []
            while (Math.abs(divideResult) < 10) {
                trueValue = generateValue([-60, 60], 1)
                if (Math.abs(trueValue) < 5) continue
                if (trueValue % 10 === 0) continue
                do {
                    divideResult = trueValue + generateValue(limits2, 1)
                } while (Math.abs(divideResult) < 15)

                if (Math.abs(trueValue - divideResult) < 15) {
                    divideResult = 0
                    continue
                }
                multipliers = Array(limits2[1]).fill(0)
                    .map((n, i) => i + 1)
                    .filter(n => divideResult * n % 10 === 0)
                    .filter(n => n % 5 !== 0)
                    .filter(n => n > 20 && n < 50)
                    .filter(n => n * divideResult < 2000)
                if (multipliers.length < 2) divideResult = 0
            }
            const term = trueValue - divideResult
            const divider = (Math.random() > 0.5 ? (-1) : 1) * multipliers[Math.round(Math.random() * (multipliers.length - 1))]

            expression = `${divideResult * divider} / ${divider} + ${term} = ${trueValue}`

            const expressionTerms: string[] = [divideResult * divider, divider, term, trueValue]
                .map((n, i) => {
                    const divider = i === 0 || i === 3 ? 100 : 10
                    return '' + n / divider
                })
            if (divider < 0) {
                expressionTerms[1] = `(${expressionTerms[1]})`
            }
            if (term < 0) {
                expressionTerms[2] = expressionTerms[2].substring(1)
            }

            expression = `${expressionTerms[0]} : ${expressionTerms[1]} ${term > 0 ? '+' : '-'} ${expressionTerms[2]}`
            trueValue *= 10

        }


        let answers: number[] =

            Array(30)
                .fill(0)
                .map(() => generateValue(limits2, 1))
                .filter((v, i, a) => !a.filter((n, idx) => Math.abs(n) === Math.abs(v) && i !== idx).length)
                .map(v => v * 10)
                .slice(0, 4 + Math.round(Math.random() * 4))

        answers.splice(3, 0, trueValue)
        answers = answers.sort(() => Math.random() - 0.5)

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