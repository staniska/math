import React from "react";
import Button from "./common/Button";
import simpleClickHandler from "./common/simpleClickHandler";
import {TFraction} from "../Main";
import filterFractionResults from "./common/filterFractionResults";
import simplifyFraction from "./common/simplificationFraction";
import Fraction from "./common/Fraction";
import './FractionMult.css'

const FractionMult: React.FC<{ scores: number, requireScores: number, scoresSetter: React.Dispatch<React.SetStateAction<number>> }> =
    ({scores, requireScores, scoresSetter}) => {

        const clickHandler = (e: React.MouseEvent) => {

            const node = (document.querySelector('.fractionMult_exercise') as HTMLDivElement).cloneNode(true)
            const resultNode = (Array.from((document.querySelector('.fractionMult') as HTMLDivElement).querySelectorAll('button') as NodeListOf<HTMLButtonElement>)
                .filter(b => results[parseInt(b.value)].answer)[0]
                .querySelector('.fraction') as HTMLDivElement).cloneNode(true)

            const answer = simpleClickHandler(
                e,
                'fractionMult',
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

        const numeratorLimits = [-10, 20]
        const denominatorLimits = [1, 15]

        const terms: TFraction[] = [0, 0].map(() => {
            const term: TFraction = {
                numerator: numeratorLimits[0] + Math.round(Math.random() ** 2 * (numeratorLimits[1] - numeratorLimits[0])),
                denominator: denominatorLimits[0] + Math.round(Math.random() * (denominatorLimits[1] - denominatorLimits[0])),
            }

            while (term.numerator === 0 || Math.abs(term.numerator / term.denominator) === 1) {
                term.numerator = numeratorLimits[0] + Math.round(Math.random() ** 2 * (numeratorLimits[1] - numeratorLimits[0]))
            }

            return term
        })

        const sign = '*'

        const trueValue: TFraction =
            {
                numerator: terms[0].numerator * terms[1].numerator,
                denominator: terms[0].denominator * terms[1].denominator
            }


        let results: { value: TFraction, answer: boolean }[] = [
            {value: trueValue, answer: true},
            {
                value: {
                    numerator: trueValue.numerator -5 + Math.round(Math.random() * 15),
                    denominator: trueValue.denominator
                },
                answer: false
            },
            {
                value: {
                    numerator: trueValue.numerator -5 + Math.round(Math.random() * 15),
                    denominator: trueValue.denominator
                },
                answer: false
            },
            {
                value: {
                    numerator: trueValue.numerator * -1 + Math.round(Math.random() * 4),
                    denominator: trueValue.denominator
                },
                answer: false
            },
            {
                value: {
                    numerator: trueValue.numerator -5 + trueValue.denominator * [1,2,3].sort(() => Math.random() - 0.5)[0] * [-1,1].sort(() => Math.random() - 0.5)[0],
                    denominator: trueValue.denominator + terms[0].numerator * [-2,-1,1,2].sort(() => Math.random() - 0.5)[0]
                },
                answer: false
            },
            {
                value: {
                    numerator: trueValue.numerator -5 + trueValue.denominator * [1,2,3].sort(() => Math.random() - 0.5)[0] * [-1,1].sort(() => Math.random() - 0.5)[0],
                    denominator: trueValue.denominator + terms[0].numerator * [-2,-1,1,2].sort(() => Math.random() - 0.5)[0]
                },
                answer: false
            },
        ]
        if (Math.random() < 0.2) {
            results.push({
                value: {
                    numerator: trueValue.numerator * -1,
                    denominator: trueValue.denominator,
                },
                answer: false
            })
        }

        results = results.filter(r => r.value.denominator !== 0)

        results = filterFractionResults(results)

        const simplifiedTerms = terms.map(t => simplifyFraction(t))

        return (
            <div className={'fractionMult'}>
                <div className={'fractionMult_exercise'}>
                    <Fraction f={simplifiedTerms[0]}/>
                    <div className={'fractionMult_sign'}>{sign}</div>
                    <div className={'fractionMult_bracket'}>{terms[1].numerator < 0 ? '(' : null}</div>
                    <Fraction f={simplifiedTerms[1]}/>
                    <div className={'fractionMult_bracket'}>{terms[1].numerator < 0 ? ')' : null}</div>
                </div>

                <div className={'answerButtons'} onClick={clickHandler}>
                    {results.map((result, idx) => {
                        return <Button key={idx} value={{resultType: 'TFraction', results: [result.value]}} idx={idx}/>
                    })}
                </div>
            </div>


        )
    }

export default FractionMult