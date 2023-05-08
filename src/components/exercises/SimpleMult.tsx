import React from "react";
import Button from "./common/Button";
import simpleClickHandler from "./common/simpleClickHandler";
import filterSimpleResults from "./common/filterSimpleResults";

const SimpleMult: React.FC<{ scores: number, requireScores: number, scoresSetter: React.Dispatch<React.SetStateAction<number>> }> =
    ({scores, requireScores, scoresSetter}) => {

        const clickHandler = (e: React.MouseEvent) => {
            const answer = simpleClickHandler(
                e,
                'simpleMult',
                results.findIndex(r => r.answer),
                1,
                scores,
                requireScores,
                scoresSetter
            )

            if (!answer && answer !== null) {
                const node = document.createElement('h3')
                node.innerText = '' + terms[0] + sign + (terms[1] >= 0 ? terms[1] : `(${terms[1]})`) + '=' + trueValue
                const mistakes = document.querySelector('.mistakes_list') as HTMLDivElement
                mistakes.appendChild(node)
            }
        }

        const limits = [-15, 20, -10, 15]
        const terms: number[] = [0, 0].map((t, i) => Math.round(limits[2 * i] + Math.random() * (limits[2 * i + 1] - limits[2 * i])))
        const sign = '*'

        const trueValue = terms[0] * terms[1]

        let results = [
            {value: trueValue, answer: true},
            {value: terms[0] * (terms[1] - Math.round(Math.random() * 2)), answer: false},
            {value: terms[0] * (terms[1] - Math.round(Math.random() * 2)), answer: false},
            {value: trueValue - 5 + Math.round(Math.random() * 10), answer: false},
            {value: trueValue - 5 + Math.round(Math.random() * 10), answer: false},
            {value: trueValue * [-1, 2].sort(() => Math.random() - 0.5)[0], answer: false},
        ]

        results = filterSimpleResults(results)

        return (
            <div className={'simpleMult'}>
                <h3>
                    {terms[0]}{sign}{terms[1] >= 0 ? terms[1] : `(${terms[1]})`}
                </h3>
                <div className={'answerButtons'}  onClick={clickHandler}>
                    {results.map((result, idx) => {
                        return <Button key={idx} value={{resultType: 'TInt', results: [result.value]}} idx={idx}/>
                    })}
                </div>
            </div>


        )
    }

export default SimpleMult