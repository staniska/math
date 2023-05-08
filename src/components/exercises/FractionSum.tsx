import React from "react";
import Button from "./common/Button";
import simpleClickHandler from "./common/simpleClickHandler";
import {TFraction} from "../Main";
import filterFractionResults from "./common/filterFractionResults";
import simplifyFraction from "./common/simplificationFraction";
import Fraction from "./common/Fraction";
import './FractionSum.css'

const FractionSum: React.FC<{ scores: number, requireScores: number, scoresSetter: React.Dispatch<React.SetStateAction<number>> }> =
    ({scores, requireScores, scoresSetter}) => {

        const clickHandler = (e: React.MouseEvent) => {

            const node = (document.querySelector('.fractionSum_exercise') as HTMLDivElement).cloneNode(true)
            const resultNode = (Array.from((document.querySelector('.fractionSum') as HTMLDivElement).querySelectorAll('button') as NodeListOf<HTMLButtonElement>)
                .filter(b => results[parseInt(b.value)].answer)[0]
                .querySelector('.fraction') as HTMLDivElement).cloneNode(true)

            const answer = simpleClickHandler(
                e,
                'fractionSum',
                results.findIndex(r => r.answer),
                2,
                scores,
                requireScores,
                scoresSetter
            )

            if (!answer && answer !== null) {
                const equal = document.createElement('div')
                equal.className = 'equal'
                equal.innerText = '='
                node.appendChild(equal)
                node.appendChild(resultNode)
                const mistakes = document.querySelector('.mistakes_list') as HTMLDivElement
                mistakes.appendChild(node)
            }
        }

        const numeratorLimits = [-30, 30]
        const denominatorLimits = [1, 16]

        const signs: Array<'+' | '-'> = ['+', '-']

        const terms: TFraction[] = [0, 0].map(() => {
            const term: TFraction = {
                numerator: numeratorLimits[0] + Math.round(Math.random() ** 2 * (numeratorLimits[1] - numeratorLimits[0])),
                denominator: denominatorLimits[0] + Math.round(Math.random() * (denominatorLimits[1] - denominatorLimits[0])),
            }

            while (term.numerator === 0) {
                term.numerator = numeratorLimits[0] + Math.round(Math.random() ** 2 * (numeratorLimits[1] - numeratorLimits[0]))
            }
            return term
        })

        const sign = signs[Math.round(Math.random() * (signs.length - 1))]

        const trueValue: TFraction =
            {
                numerator: terms[0].numerator * terms[1].denominator + terms[1].numerator * terms[0].denominator * (sign === '+' ? 1 : -1),
                denominator: terms[0].denominator * terms[1].denominator
            }


        let results: { value: TFraction, answer: boolean }[] = [
            {value: trueValue, answer: true},
            {
                value: {
                    numerator: trueValue.numerator - 5 + Math.round(Math.random() * 10),
                    denominator: trueValue.denominator
                },
                answer: false
            },
            {
                value: {
                    numerator: trueValue.numerator - 5 + Math.round(Math.random() * 10),
                    denominator: trueValue.denominator
                },
                answer: false
            },
            {
                value: {
                    numerator: trueValue.numerator + trueValue.denominator * [-1,1].sort(() => Math.random() - 0.5)[0],
                    denominator: trueValue.denominator
                },
                answer: false
            },
            {
                value: {
                    numerator: terms[0].denominator * terms[1].denominator + terms[1].numerator * terms[0].numerator * (sign === '+' ? -1 : 1),
                    denominator: Math.abs(terms[0].numerator) * terms[1].denominator
                },
                answer: false
            },
            {
                value: {
                    numerator: terms[1].numerator + terms[0].numerator * (sign === '+' ? -1 : 1),
                    denominator: terms[1].denominator
                },
                answer: false
            },
        ]

        results = filterFractionResults(results)

        results = results.filter(r => r.value.denominator <= terms[0].denominator * terms[1].denominator)

        const simplifiedTerms = terms.map(t => simplifyFraction(t))

        return (
            <div className={'fractionSum'}>
                <div className={'fractionSum_exercise'}>
                    <Fraction f={simplifiedTerms[0]}/>
                    <div className={'fractionSum_sign'}>{sign}</div>
                    <div className={'fractionSum_bracket'}>{terms[1].numerator < 0 ? '(' : null}</div>
                    <Fraction f={simplifiedTerms[1]}/>
                    <div className={'fractionSum_bracket'}>{terms[1].numerator < 0 ? ')' : null}</div>
                </div>

                <div className={'answerButtons'} onClick={clickHandler}>
                    {results.map((result, idx) => {
                        return <Button key={idx} value={{resultType: 'TFraction', results: [result.value]}} idx={idx}/>
                    })}
                </div>
            </div>


        )
    }

export default FractionSum