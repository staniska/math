const filterSimpleResults: (results: {value: number, answer: boolean}[]) => ({value: number, answer: boolean}[]) =
    (results) => {
        results.forEach(res => {
            if (res.value === results[0].value) res.answer = true
        })

        results.sort(() => Math.random() - 0.5).sort(() => Math.random() - 0.5)

        results = results.filter((result, pos) => {
            return results.findIndex(el => el.value === result.value) === pos
        })
        return results
}

export default filterSimpleResults