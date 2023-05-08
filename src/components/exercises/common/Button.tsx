import {TFraction, TResult} from "../../Main";
import './Button.css'
import Fraction from "./Fraction";
import simplifyFraction from "./simplificationFraction";

const Button: React.FC<{ value: TResult, idx: number }> =
    ({value, idx}) => {

        if (value.resultType === 'TFraction') {
            return (
                <button className={'answerButton_fraction'} value={idx}>
                    <Fraction f={simplifyFraction(value.results[0] as TFraction)}/>
                </button>
            )
        }

        return (
            <button className={'answerButton'} value={idx}>
                {value.results[0] as number}
            </button>
        )

    }

export default Button