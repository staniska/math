import React from "react";
import Button from "./common/Button";
import simpleClickHandler from "./common/simpleClickHandler";
import filterSimpleResults from "./common/filterSimpleResults";

const SimplifyExpression1: React.FC<{ scores: number, requireScores: number, scoresSetter: React.Dispatch<React.SetStateAction<number>> }> =
    ({scores, requireScores, scoresSetter}) => {

        const clickHandler = (e: React.MouseEvent) => {
            const answer = simpleClickHandler(
                e,
                'simplifyExpression_1',
                results.findIndex(r => r.answer),
                2,
                scores,
                requireScores,
                scoresSetter
            )

            if (!answer && answer !== null) {
                const node = document.createElement('h3')
                node.innerHTML = '' + expression + '&emsp;=&emsp;' + trueValue
                const mistakes = document.querySelector('.mistakes_list') as HTMLDivElement
                mistakes.appendChild(node)
            }
        }

        const availableLetters = ['a', 'b', 'c', 'm', 'n', 'p', 'x', 'y', 'z']
        const limits = [-15, 20]

        const letters =
            Array([1]
                .sort(() => Math.random() - 0.5)[0])
                .fill(0)
                .map(() => availableLetters[Math.round(Math.random() * (availableLetters.length - 1))])
                .filter((l, idx, arr) => arr.indexOf(l) === idx)

        if (Math.random() > 0.3) letters.push('_')

        let terms: Array<{ letter: string, multiplier: number }> =
            letters.map(l => {
                return {letter: l, multiplier: limits[0] + Math.round(Math.random() * (limits[1] - limits[0]))}
            })

        if (terms.filter(t => t.multiplier !== 0).length < 2) {
            terms.push({letter: availableLetters.filter(l => !terms.filter(t => t.letter === l).length).sort(() => Math.random() - 0.5)[0], multiplier: Math.round(Math.random() * 8 + 1)})
        }

        if (terms.length > 2 && !terms.filter(t => t.multiplier === 0).length) {
            terms[Math.round(Math.random() * (terms.length - 1))].multiplier = 0
        }

        let jopa = 0
        while (terms.length === terms.filter(t => t.multiplier === 0).length) {
            jopa++
            console.log('jopa: ' + jopa)
            terms[Math.round(Math.random() * (terms.length - 1))].multiplier = limits[0] + Math.round(Math.random() * (limits[1] - limits[0]))
        }

        // console.log(JSON.parse(JSON.stringify(terms.filter(t => t.multiplier !== 0).sort(t => t.multiplier > 1 ? -1 : 1))))

        const trueValue =
            terms
                .filter(t => t.multiplier !== 0)
                .sort(t => t.multiplier > 1 ? -1 : 1)
                .map((t, i) => `${i > 0 ? (t.multiplier < 0 ? ' - ' : ' + ') : (t.multiplier < 0 ? '-' : '')}${Math.abs(t.multiplier) !== 1 ? Math.abs(t.multiplier) : (t.letter !== '_' ? '': '1')}${t.letter}`).join('')
                .replace(/_/g, '')

        const brakeTerm = () => {

            let termIdx = Math.round(Math.random() * (terms.length - 1))

            if (!!terms.filter(t => t.multiplier === 0).length) {
                termIdx = terms.findIndex(t => t.multiplier === 0)
            }

            let addition = Math.round(Math.random() * 10) * ([-1, 1].sort(() => Math.random() - 0.5)[0])

            let steps = 0

            while (steps < 10 && (terms[termIdx].multiplier - addition === 0 ||
                ![2, 3, 4, 5, 6, 7]
                    // eslint-disable-next-line no-loop-func
                    .filter(d => [...terms.map((t, i) => (i === termIdx ? (t.multiplier - addition) : t.multiplier)), addition].filter(n => n % d === 0).length > 1).length
                )) {
                steps ++
                addition = Math.round(Math.random() * 10) * ([-1, 1].sort(() => Math.random() - 0.5)[0])
            }

            terms[termIdx].multiplier -= addition
            terms.push({letter: terms[termIdx].letter, multiplier: addition})
        }

        for (let i = 0; i < Math.round(Math.random() * 2 + 3); i++) {
            brakeTerm()
        }


        while (!!terms.filter(t => t.multiplier === 0).length) {
            brakeTerm()
        }


        let expression = '';
        let sortedTerms = [];

        let steps = 0;

        // eslint-disable-next-line no-loop-func
        while (!![2, 3, 4, 5, 6, 7].filter(d => terms.filter(t => t.multiplier % d === 0).length > 1).length && steps < 10) {
            steps ++
            [2, 3, 4, 5, 6, 7]
                .sort(() => Math.random() - 0.5)
                // eslint-disable-next-line no-loop-func
                .forEach(d => {
                    if (terms.filter(t => t.multiplier % d === 0).length > 1) {
                        let dividedTerms = terms.filter(t => t.multiplier % d === 0)
                        // console.log(JSON.parse(JSON.stringify(terms)))
                        // console.log(JSON.parse(JSON.stringify(dividedTerms)))
                        if (steps < 8) {
                            dividedTerms = dividedTerms.filter((t, i) => i === dividedTerms.findIndex(p => t.letter === p.letter))
                        }
                        if (dividedTerms.length < 2) return
                        // console.log(JSON.parse(JSON.stringify(dividedTerms)))
                        dividedTerms.forEach(t => {
                            if (terms.findIndex(p => p.multiplier === t.multiplier && p.letter === t.letter) > -1) {
                                delete terms[terms.findIndex(p => p.multiplier === t.multiplier && p.letter === t.letter)]
                                terms = terms.filter(t => t !== undefined)
                            }
                        })
                        // console.log(JSON.parse(JSON.stringify(terms)))
                        sortedTerms.push(...dividedTerms)
                        const k = [1,-1][Math.round(Math.random())]
                        let sign;
                        if (!expression.length) {
                            sign = k < 0 ? '-': ''
                        } else {
                            sign = k > 0 ? ' + ': ' - '
                        }
                        expression += sign + `${d}(` + dividedTerms.map((t,i) => `${t.multiplier / d / k > 0 ? (i > 0 ? '+ ':'') : '- '}${(Math.abs(t.multiplier / d ) !== 1 ) ? Math.abs(t.multiplier / d ) : t.letter === '_'? Math.abs(t.multiplier / d) : ''}${t.letter}`).join(' ') + ')'
                    }
                })
        }
        expression += terms.map(t => `${!!expression.length ? t.multiplier > 0 ? ' + ': ' - ': t.multiplier < 0 ? '- ': ''}${Math.abs(t.multiplier)}${t.letter}`).join(' ')
        expression = expression.replace(/_/g,'')
        sortedTerms.push(...terms)

        const falseValue_1 = (value: string) => {
            let resp = value

            if (resp.length === 1) {
                console.log(resp)
                if (Math.random() > 0.5) {
                    resp = ['', '-'].sort(() => Math.random() - 0.5)[0] + Math.round(Math.random() * 8 + 2) + resp;
                } else {
                    resp = resp + [' + ', ' - '].sort(() => Math.random() - 0.5)[0] + Math.round(Math.random() * 7 + 1)
                }
            }

            const random = Math.random()
            if (random < 0.5) {
                const match = value.match(/\d+/)
                if (match) {
                    const multMatch = match[0].match(/\d+/)![0]
                    let multiplier = parseInt(multMatch)
                    multiplier += Math.round(Math.random() * 20 - 7)
                    while (multiplier <= 0) {
                        multiplier += Math.round(Math.random() * 20)
                    }
                    resp = resp.replace(match[0], match[0].replace(multMatch, multiplier.toString()))
                }
            }

            if (random >= 0.4 && random < 0.8) {
                const sign = resp.match(/[+-]/g)
                if (sign) {
                    if (sign.length > 1) {
                        const replacedSignIdx = resp.indexOf(resp.match(/[+-]/g)![1])
                        let sign = ['+','-'].filter( s => s !== resp[replacedSignIdx])[0]
                        if (replacedSignIdx === 0) sign = ''
                        resp = resp.substring(0, replacedSignIdx) + sign + resp.substring(replacedSignIdx + 1)
                    } else {
                        resp = resp.replace(sign[0], ['+','-'].filter( s => s !== sign[0])[0])
                    }
                }
            }

            if (random > 0.5 && resp.match(/[a-z]/g)!.length > 1) {
                const m = resp.match(/[a-z]/g)
                const idxs = m!.map(m => {
                    return {l: m, i: resp.indexOf(m)}
                })
                resp = resp.substring(0, idxs[0].i) + idxs[1].l + resp.substring(idxs[0].i + 1)
                resp = resp.substring(0, idxs[1].i) + idxs[0].l + resp.substring(idxs[1].i + 1)
            }

            if (resp.match(/(?<=\D)[a-z]/) && random > 0.7) {
                const match = resp.match(/(?<=\D)[a-z]/)![0]
                resp = resp.replace(match, (Math.round(Math.random() * 6 + 2).toString() + match))
            }

            // const replacedMatch = match[0].replace()


            return resp
        }

        let results = [
            {value: trueValue, answer: true},
        ]

        while (results.length < 5) {
            results.push({value: falseValue_1(falseValue_1(trueValue)), answer: false})
            results = filterSimpleResults(results)
            results.sort(r => r.value === trueValue ? -1 : 1)
        }

        results = filterSimpleResults(results)

        return (
            <div className={'simplifyExpression_1'}>
                <h3> Simplify expression: </h3>
                <h3>
                    {expression}
                </h3>
                <div className={'answerButtons'}  onClick={clickHandler}>
                    {results.map((result, idx) => {
                        return <Button key={idx} value={{resultType: 'TSimpleExpression', results: [result.value]}} idx={idx}/>
                    })}
                </div>
            </div>


        )
    }

export default SimplifyExpression1