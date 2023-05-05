import React, {useEffect, useState} from "react";
import SimpleSum from "./exercises/SimpleSum";
import './Main.css';
import FractionSum from "./exercises/FractionSum";

export enum EExercise {
    simpleSum,
    // fractionsSum,
}

export type TInt = number
export type TFraction = {
    Sign: '-' | '+',
    Int: number,
    Numerator: number,
    Denominator: number
}
export type TResult = {
    results: [TInt | TFraction],
    resultType: string,
}

const Main: React.FC = () => {

    const requireScores = 50;
    const [scores, setScores] = useState<number>(0)

    useEffect(() => {
        if (scores < 0) {
            setScores(prev => 0)
        }
    }, [scores])

    return (
        <div>
            <ProgressLine scores={{act: scores, req: requireScores}}/>
            <Exercise exerciseType={null} scores={scores} requireScores={requireScores} scoresSetter={setScores}/>
        </div>
    )
}

const Exercise: React.FC<{ exerciseType: EExercise | null, scores: number, requireScores: number, scoresSetter: React.Dispatch<React.SetStateAction<number>> }> =
    ({exerciseType, scores, requireScores, scoresSetter}) => {
        if (exerciseType === null) {
            exerciseType = getRandomExerciseType()
        }

        if (exerciseType === EExercise.simpleSum) {
            return (<SimpleSum scores={scores} requireScores={requireScores} scoresSetter={scoresSetter}/>)
        }

        return <SimpleSum scores={scores} requireScores={requireScores} scoresSetter={scoresSetter}/>
    }

const getRandomExerciseType: () => EExercise =
    () => {
        return Math.round(Math.random() * (Object.keys(EExercise).length / 2 - 1))
    }

const ProgressLine: React.FC<{ scores: { act: number, req: number } }> =
    ({scores}) => {

        return (

            <div className={'progressWrapper'}>
                <div className={'progressTitle'}>Progress:</div>
                <div className={'progressLine'}>
                    <div
                        style={
                            {
                                width: `${scores.act / scores.req * 100}%`,
                                color: 'white'
                            }
                        }
                        className={'progressAct'}
                    >
                        {scores.act / scores.req > 0.1 ? scores.act : ''}
                    </div>
                    <div style={{marginLeft: scores.act / scores.req <= 0.1 ? '5px' : '0'}}>
                        {scores.act / scores.req <= 0.1 ? scores.act : ''}
                    </div>
                </div>
                <div className={'progressRequire'}> {scores.req} </div>
            </div>
        )
    }

export default Main