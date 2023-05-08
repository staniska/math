import {TFraction} from "../../Main";

const filterFractionResults: (results: {value: TFraction, answer: boolean}[]) => ({value: TFraction, answer: boolean}[]) =
    (results) => {
        results.forEach(res => {
            if (res.value.numerator === results[0].value.numerator && res.value.denominator === results[0].value.denominator) res.answer = true
        })

        results.sort(() => Math.random() - 0.5).sort(() => Math.random() - 0.5)

        results = results.filter((result, pos) => {
            return results.findIndex(el => el.value.numerator === result.value.numerator && el.value.denominator === result.value.denominator) === pos
        })

        return results
}

export default filterFractionResults