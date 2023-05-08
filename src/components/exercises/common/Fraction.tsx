import {TsimplifyedFraction} from "./simplificationFraction";
import React from "react";
import './Fraction.css'

const Fraction: React.FC<{ f: TsimplifyedFraction }> = ({f}) => {
    return (
        <div className={'fraction'}>
            <div className={'fraction_sign'}>{f.sign}</div>
            <div className={'fraction_int'}>{f.int}</div>
            <div className={'fraction_numerator'}>{f.numerator}</div>
            <div className={'fraction_denominator'}>{f.denominator}</div>
        </div>
    )
}

export default Fraction