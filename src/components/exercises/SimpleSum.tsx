import React from "react";
import Button from "./common/Button";
import answerButtonHandler from "./common/answerButtonHandler";
import {exec} from "child_process";

const SimpleSum: React.FC<{ scores: number, requireScores: number, scoresSetter: React.Dispatch<React.SetStateAction<number>> }> =
    ({scores, requireScores, scoresSetter}) => {

        const clickHandler = (e: React.MouseEvent) => {

            if ((e.target as HTMLElement).tagName !== 'BUTTON') return
            if ((e.target as HTMLElement).className.match('btn')) return

            const timeout = results[parseInt((e.target as HTMLButtonElement).value)].answer? 100: 2000

            const buttons = Array.from(((e.target as HTMLButtonElement).closest('.simpleSum') as HTMLDivElement).querySelectorAll('button'))

            buttons.forEach(btn => {
                const idx = parseInt(btn.value)
                btn.classList.add(results[idx].answer ? 'btnGreen' : 'btnRed')
            })
            setTimeout(() => {
                buttons.forEach(btn => {
                    const idx = parseInt(btn.value)
                    btn.classList.remove(results[idx].answer ? 'btnGreen' : 'btnRed')
                })
                answerButtonHandler(
                    results[parseInt((e.target as HTMLButtonElement).value)].answer,
                    1,
                    requireScores,
                    scores,
                    scoresSetter
                )
            }, timeout)
        }

        const limits = [-30, 30]
        const terms: number[] = [0, 0].map(el => (Math.round(limits[0] + Math.random() * (limits[1] - limits[0]))))
        const signs = ['+', '-']
        const sign = signs[Math.round(Math.random() * (signs.length - 1))]

        const trueValue = sign === '+' ? terms[0] + terms[1]: terms[0] - terms[1]

        let results = [
            {value: trueValue, answer: true},
            {value: sign === '+'? terms[0] - terms[1]: terms[0] + terms[1], answer: false},
            {value: trueValue - Math.round(Math.random() * 8), answer: false},
            {value: trueValue + Math.round(Math.random() * 10), answer: false},
            {value: Math.round(limits[0] + Math.random() * (limits[1] - limits[0])), answer: false},
            {value: Math.round(limits[0] + Math.random() * (limits[1] - limits[0])), answer: false},
        ]

        results.forEach(res => {
            if (res.value === results[0].value) res.answer = true
        })

        results.sort(() => Math.random() - 0.5)

        results = results.filter((result,pos) => {
            return results.findIndex(el => el.value === result.value) === pos
        })

        return (
            <div className={'simpleSum'} onClick={clickHandler}>
                <h3>
                    {terms[0]}{sign}{terms[1]>=0? terms[1] : `(${terms[1]})`}
                </h3>

                {results.map((result, idx) => {
                    return <Button key={idx} value={{resultType: 'TInt', results: [result.value]}} idx={idx}/>
                })}
            </div>


        )
    }

export default SimpleSum