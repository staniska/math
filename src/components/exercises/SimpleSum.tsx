import React from "react";
import Button from "./common/Button";
import simpleClickHandler from "./common/simpleClickHandler";
import filterSimpleResults from "./common/filterSimpleResults";

const SimpleSum: React.FC<{ scores: number, requireScores: number, scoresSetter: React.Dispatch<React.SetStateAction<number>> }> =
    ({scores, requireScores, scoresSetter}) => {

        const clickHandler = (e: React.MouseEvent) => {
            const answer = simpleClickHandler(
                e,
                'simpleSum',
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

        const limits = [-30, 30]
        const terms: number[] = [0, 0].map(() => (Math.round(limits[0] + Math.random() * (limits[1] - limits[0]))))
        const signs = ['+', '-']
        const sign = signs[Math.round(Math.random() * (signs.length - 1))]

        const trueValue = sign === '+' ? terms[0] + terms[1] : terms[0] - terms[1]

        let results = [
            {value: trueValue, answer: true},
            {value: sign === '+' ? terms[0] - terms[1] : terms[0] + terms[1], answer: false},
            {value: trueValue - Math.round(Math.random() * 8), answer: false},
            {value: trueValue + Math.round(Math.random() * 10), answer: false},
            {value: Math.round(limits[0] + Math.random() * (limits[1] - limits[0])), answer: false},
            {value: Math.round(limits[0] + Math.random() * (limits[1] - limits[0])), answer: false},
        ]

        results = filterSimpleResults(results)

        return (
            <div className={'simpleSum'}>
                <h3>
                    {terms[0]}{sign}{terms[1] >= 0 ? terms[1] : `(${terms[1]})`}
                </h3>
                <div className={'answerButtons'} onClick={clickHandler}>
                    {results.map((result, idx) => {
                        return <Button key={idx} value={{resultType: 'TInt', results: [result.value]}} idx={idx}/>
                    })}
                </div>
            </div>


        )
    }

export default SimpleSum