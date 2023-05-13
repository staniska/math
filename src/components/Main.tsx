import React, {useEffect, useState} from "react";
import SimpleSum from "./exercises/SimpleSum";
import './Main.css';
import FractionSum from "./exercises/FractionSum";
import SimpleMult from "./exercises/SimpleMult";
import FractionMult from "./exercises/FractionMult";
import SimplifyExpression1 from "./exercises/SimplifyExpression1";

export enum EExercise {
    simpleSum,
    simpleMult,
    fractionMult,
    fractionsSum,
    simplifyExpression_1,
}

export type TInt = number
export type TFraction = {
    numerator: number,
    denominator: number
}
export type TSimpleExpression = string
export type TResult = {
    results: [TInt | TFraction | TSimpleExpression],
    resultType: string,
}



const Main: React.FC = () => {

    const requireScores = 50;
    const [scores, setScores] = useState<number>(0)

    useEffect(() => {
        if (scores < 0) {
            setScores(() => 0)
        }
    }, [scores])

    return (
        <div>
            <ProgressLine scores={{act: scores, req: requireScores}}/>
            <Exercise exerciseType={null} scores={scores} requireScores={requireScores} scoresSetter={setScores}/>
            <div className={'mistakes'}>
                <div className={'mistakes_titile'}> Mistakes: </div>
                <div className={'mistakes_list'}> </div>
            </div>
        </div>
    )
}

const Exercise: React.FC<{ exerciseType: EExercise | null, scores: number, requireScores: number, scoresSetter: React.Dispatch<React.SetStateAction<number>> }> =
    ({exerciseType, scores, requireScores, scoresSetter}) => {
        if (exerciseType === null) {
            exerciseType = getRandomExerciseType()
        }

        // exerciseType = [0,1].sort(() => Math.random() - 0.5)[0]

        if (exerciseType === EExercise.fractionsSum) {
            return <FractionSum scores={scores} requireScores={requireScores} scoresSetter={scoresSetter}/>
        }

        if (exerciseType === EExercise.fractionMult) {
            return <FractionMult scores={scores} requireScores={requireScores} scoresSetter={scoresSetter}/>
        }

        if (exerciseType === EExercise.simpleSum) {
            return (<SimpleSum scores={scores} requireScores={requireScores} scoresSetter={scoresSetter}/>)
        }

        if (exerciseType === EExercise.simpleMult) {
            return (<SimpleMult scores={scores} requireScores={requireScores} scoresSetter={scoresSetter}/>)
        }

        if (exerciseType === EExercise.simplifyExpression_1) {
            return (<SimplifyExpression1 scores={scores} requireScores={requireScores} scoresSetter={scoresSetter}/>)
        }

        return <FractionMult scores={scores} requireScores={requireScores} scoresSetter={scoresSetter}/>

    }

const getRandomExerciseType: () => EExercise =
    () => {
        return Math.round(Math.pow(Math.random(), 0.4) * (Object.keys(EExercise).length / 2 - 1))
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