import s from './style.module.css';
import MovingLayer from './components/movingLayer';
import WORDS from '../../../../data/words.json'
import React, { useState } from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useHistory } from "react-router-dom";
import correct from '../sounds/correct.mp3';
import error from '../sounds/error.mp3';

let gameWords;
let correctAnswerWordObject;
let audio;
let imgWord = '';
const wrongTranslation = [];

const correctSound = new Audio(correct);
const errorSound = new Audio(error);


const makeWordArr = () => {
    gameWords = [];

    for (let i = 0; i < 5; i++) {
        let startRandomIndex = Math.floor(Math.random() * 3500);
        gameWords.push(WORDS[startRandomIndex + i]);
    }
    //correct answer index
    correctAnswerWordObject = gameWords[Math.floor(Math.random() * 5)];

    const audioWord = correctAnswerWordObject.audio;
    imgWord = correctAnswerWordObject.image;

    //take sound & pic
    audio = new Audio(`https://react-learnwords-example.herokuapp.com/${audioWord}`);
    let imageSrc = `https://react-learnwords-example.herokuapp.com/${imgWord}`;
}

const AudioChallenge = () => {
    const [round, setRound] = useState(0);
    const [rulesScreen, setRulesScreen] = useState(true);
    const history = useHistory();

    const handleFullScr = useFullScreenHandle();

    const startGame = () => {
        setRulesScreen(false);
        makeWordArr();
        audio.play();
    }

    const compareWords = (id) => {
        if (id === correctAnswerWordObject._id.$oid) {
            correctSound.play();
            makeWordArr();
            audio.play();
            setRound(round + 1);
        } else {
            dontKnow();
        }
    }

    const dontKnow = () => {
        errorSound.play();
        if (!wrongTranslation.includes(`${correctAnswerWordObject.word} - ${correctAnswerWordObject.wordTranslate}`)) {
            wrongTranslation.push(`${correctAnswerWordObject.word} - ${correctAnswerWordObject.wordTranslate}`);
        }
        return;
    }

    const dont = () => {
        makeWordArr();
        audio.play();
        setRound(round + 1);
        wrongTranslation.push(`${correctAnswerWordObject.word} - ${correctAnswerWordObject.wordTranslate}`);
    }

    const goto = (route) => {
        history.push(route)
    }

    return (
        <>
            <FullScreen handle={handleFullScr}>
                <div className={s.game_wrapper}>

                    <div className={s.game} >
                        <div className={`${s.movingLayer} ${round >= 10 ? `${s.hidden}` : `${s.visible}`} `} >

                            <div className={s.progress} style={{ width: `${round * 10}%`, }}></div>

                            {rulesScreen ?
                                <div className={s.greeting_bye_screen}>
                                    <h1>Audio Challenge</h1>
                                    <div>
                                        Выбери правильный вариант перевода из предлагаемых пяти
                                    </div>
                                    <button
                                        onClick={() => { startGame() }}
                                        className={s.blue_button}
                                    >
                                        Старт
                                    </button>
                                </div>
                                : <MovingLayer
                                    gameWords={gameWords}
                                    compare={compareWords}
                                    dont={dont}
                                />
                            }
                        </div>

                        <div className={`${s.movingLayer} ${round < 10 ? `${s.hidden}` : `${s.visible}`} `} >
                            <h3 className={s.title}>
                                GAME OVER!
                        </h3>
                            <table className={s.stats_table}>
                                <tr>
                                    <th className={s.title_min} colspan="3">
                                        Your stats
                                </th>
                                </tr>
                                <tr>
                                    <th>
                                        Solved
                                </th>
                                    <th>
                                        Accuracy
                                </th>
                                    <th>
                                        Words unsolved
                                </th>
                                </tr>
                                <tr>
                                    <td>
                                        {round - wrongTranslation.length}
                                    </td>
                                    <td>
                                        {`${(round - wrongTranslation.length) * 100 / round}%`}
                                    </td>
                                    <td>
                                        {wrongTranslation.map(w => {
                                            return (
                                                <div className={s.wrongWord}>
                                                    {w}
                                                </div>
                                            )
                                        })}

                                    </td>
                                </tr>
                            </table>
                            <div className={s.get_back}>
                                <button
                                    onClick={() => { goto('/games') }}
                                    className={`blue_button`}
                                >
                                    К играм
                            </button>

                            </div>
                        </div>

                        <button className={s.fullScrBtn} onClick={!handleFullScr.active ? handleFullScr.enter : handleFullScr.exit}>
                            {!handleFullScr.active ? 'Full Screen' : 'Exit Full Screen'}
                        </button>

                    </div>
                </div>
            </FullScreen>
        </>
    )
}

export default AudioChallenge;