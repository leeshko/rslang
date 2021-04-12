import s from './style.module.css';
import MovingLayer from './components/movingLayer';
import WORDS from '../../../../data/words.json'
import React, { useEffect, useState } from 'react';

let gameWords;
let correctAnswerWordObject;
let audio;
let imgWord = '';

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

const findWords = () => {
        // make words Obj array
        audio.play();
    }

    const startGame = () => {
        setRulesScreen(false);
        makeWordArr()
        findWords()
    }

    const compareWords = (id) => {
        if (id === correctAnswerWordObject._id.$oid) {
            console.log('Correct!');
            setRound(round + 1);
            makeWordArr();
            audio.play();
        }
    }

    useEffect(() => {
      
    }, [])

    return (
        <>
            <div className={s.game_wrapper}>
                <div className={s.game} >
                    <div className={s.movingLayer}>
                        {rulesScreen ?
                            <div className={s.greeting_bye_screen}>
                                <h1>Audio Challenge</h1>
                        Выбери правильный вариант перевода из предлагаемых пяти
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
                            />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default AudioChallenge;