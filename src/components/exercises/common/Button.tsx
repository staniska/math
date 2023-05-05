import {TResult} from "../../Main";
import './Button.css'

const Button: React.FC<{ value: TResult, idx: number}> =
    ({value, idx}) => {
        return (
            <button className={'answerButton'} value={idx}>
                {value.results[0] as number}
            </button>
        )

    }

export default Button