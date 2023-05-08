import {TFraction} from "../../Main";

export type TsimplifyedFraction = { sign: '-' | null, int: number | null, numerator: number | null, denominator: number | null }

const simplifyFraction: (fraction: TFraction) => TsimplifyedFraction =
    (fraction) => {
        const simplifiedFraction: TsimplifyedFraction = {
            sign: fraction.numerator < 0 ? '-' : null,
            int: Math.abs(fraction.numerator) >= fraction.denominator ? Math.trunc(Math.abs(fraction.numerator) / fraction.denominator) : null,
            numerator: Math.abs(fraction.numerator) % fraction.denominator,
            denominator: fraction.denominator
        }

        if (simplifiedFraction.numerator === 0) {
            simplifiedFraction.numerator = null
            simplifiedFraction.denominator = null
        }

        if (simplifiedFraction.numerator === null && simplifiedFraction.int === null) {
            simplifiedFraction.int = 0
        }

        const findMinDenom: (f: TsimplifyedFraction) => number =
            (f) => {
                if (f.numerator === null || f.denominator === null) return 0
                const maxDenom = Math.min(f.numerator, f.denominator)
                let denom = 0
                for (let i = 2; i <= maxDenom; i++) {
                    if (f.numerator % i === 0 && f.denominator % i === 0) {
                        denom = i
                        break
                    }
                }
                return denom
            }

        if (simplifiedFraction.numerator !== null && simplifiedFraction.denominator !== null) {
            while (findMinDenom(simplifiedFraction)) {
                const denom = findMinDenom(simplifiedFraction)
                simplifiedFraction.numerator /= denom
                simplifiedFraction.denominator /= denom
            }
        }
        return simplifiedFraction
    }

export default simplifyFraction