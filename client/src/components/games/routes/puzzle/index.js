import s from './style.module.css';

import { useHistory } from "react-router-dom";
import WORDS from '../../../../data/words.json'
import { useEffect, useState } from 'react';

const Sapper = () => {
    const history = useHistory()

    const [wordsIndex, setWordsIndex] = useState([])
    const [translatedWord, setTranslatedWord] = useState([])
    const [wordToTranslate, setWordToTranslate] = useState([])
    const [bothWords, setBothWords] = useState({})
    const [gameLevel, setGameLevel] = useState(1)

    //game parametres
    const [score, setScore] = useState(0)
    const [lifesLeft, setLifesLeft] = useState(7)
    const [wrongWord, setWrongWord] = useState([])

    // game start / end 
    const [inGame, setInGame] = useState(false)
    const [isOver, setIsOver] = useState(false)

    // game field
    const cols = 6
    const rows = 6
    const setMap = () => {
        const rowsArr = []

        for (let i = 0; i < rows; i++) {
            rowsArr.push(Array.from(Array(cols), () => 0))
        }

        return rowsArr
    }

    const grid = setMap()

    const findWords = async () => {
        const wordsTranslate = []
        const words = []


        // random index to choose word wich player gona translate
        // const wordToTranslateIndex = Math.floor(Math.random() * 4)

        const numWords = ((cols * cols) / 2)

        for (let i = 0; i < numWords; i ++) {
            let safeIndex = await checkedIndex()

            words.push(WORDS[safeIndex].wordTranslate);
            wordsTranslate.push(WORDS[safeIndex].word);
        }

        setWordToTranslate(shuffleArray(wordsTranslate))
        setTranslatedWord(shuffleArray(words))
    }

    const shuffleArray = (arr) => {
        let currentIndex = arr.length, temporaryVal, randomInd;

        while (currentIndex !== 0) {
            randomInd = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryVal = arr[currentIndex];
            arr[currentIndex] = arr[randomInd];
            arr[randomInd] = temporaryVal;
        }

        return arr;
    }

         
    const checkedIndex = async () => {
        const uncheckedIndex = getRandUncheckedIndex()

        const checkedI = await checkIfIndexUsed(uncheckedIndex)

        setWordsIndex((prevState) => {
            prevState.push(checkedI)

            return prevState
        })
    
        return wordsIndex[wordsIndex.length - 1]
    }

    const getRandUncheckedIndex = () => {
        return (Math.floor(Math.random() * 3600))
    }

    const checkIfIndexUsed = (index) => {
        let tempI = index

        while (wordsIndex.includes(tempI)) {
            tempI = getRandUncheckedIndex()
        }
        return tempI
    }

    const checkAnswer = (w) => {
        if (w === wordToTranslate.translation) {
            findWords()
            setScore(prevState => prevState + 83)
        } else {
            setLifesLeft(prevState => prevState - 1)
            minusHeart()
            pushWrongWord()
        }
    }


    const minusHeart = () => {
        let lifes = document.getElementById(s.lifes).textContent.split('')
        lifes.pop()
        lifes = lifes.join('')
        document.getElementById(s.lifes).textContent = lifes
    }

    const gameOver = () => {
        setIsOver(p => !p)
        setInGame(false)
    }

    const startGame = () => {
        setInGame(true)
        findWords()
    }

    const goto = (route) => {
        history.push(route)
    }

    // useEffect(() => {
    //     const gameWindowHeight = document.getElementById(s.game_box).clientHeight

    //     if (top === gameWindowHeight) {
    //         if (lifesLeft < 1) {
    //             minusHeart()
    //             return
    //         }
    //         pushWrongWord()
    //         setLifesLeft(prevState => prevState - 1)
    //         minusHeart()
    //         findWords()
    //     }
    // }, [top])

    const pushWrongWord = () => {
        if (wrongWord.length !== 0 
            && !wrongWord.includes(wordToTranslate.word)) {
                setWrongWord(prevState => {
                    const arr = prevState
                    arr.push(wordToTranslate.word)
                    return arr
                })
        } else if (wrongWord.length === 0 ) {
            setWrongWord([wordToTranslate.word])
        } else return
    }

    const fillCells = () => {
        const cells = document.querySelectorAll('.grid_cell')

        console.log(cells)

        
    }


    useEffect(() => {
        fillCells()
    }, [])

    // useEffect(()=> {
    //     if (lifesLeft === 0) {
    //         falling('reset')
    //         gameOver()
    //     }
    // }, [lifesLeft])

    return (
        <>
            <div className={s.game_wrapper}>
               <div className={s.game_box}>
                    <div className={`${s.screen} ${s.greeting_bye_screen} ${inGame ? `${s.hidden}` : `${s.visible}`}`}>
                        <h3 className={s.title}>
                            Пазлы
                        </h3>
                        <div className={s.description}>
                            Соедени пары слов!
                        </div>
                        <button 
                            onClick={()=> {startGame()}}
                            className={`blue_button`}
                        >
                            Старт
                        </button>
                    </div>
                    
                    <div className={`${s.screen} ${s.greeting_bye_screen} ${isOver ? s.visible : s.hidden}`}>
                        <h3 className={s.title}>
                            GAME OVER!
                        </h3>
                        <table className={s.stats_table}>
                            <tr>
                                <th className={s.title_min} colSpan="3">
                                    Your stats
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    Solved
                                </th>
                                <th>
                                    Score
                                </th>
                                <th>
                                    Words unsolved
                                </th>
                            </tr>
                            <tr>
                                <td>
                                    {score / 83}
                                </td>
                                <td>
                                    {score}
                                </td>
                                <td>
                                    {/* {wrongWord.map(w => {
                                        return (
                                            <div className={s.wrongWord}>
                                                {w}
                                            </div>
                                        )
                                    })} */}
                                    {/* {wrongWord.join(',')} */}
                                </td>
                            </tr>
                        </table>
                        <div className={s.get_back}>
                            <button 
                                onClick={()=> {goto('/games')}}
                                className={`blue_button`}
                            >
                                К играм
                            </button>
                            {/* <button 
                                onClick={()=> {startNewGame()}}
                                className={`blue_button`}
                            >
                                Играть ещё раз
                            </button> */}
                        </div>
                    </div>

                    <div className={`${s.screen} ${s.game} ${inGame ? `${s.visible}` : `${s.hidden}`}`} id={s.game}>
                        {/* <div 
                            className={`${s.word_translate} ${s.word}`}
                            style={{top: `${top}px`}}
                        >
                            {wordToTranslate.word}
                        </div>
                        <div className={s.game_sats}>
                            <div className={s.lifes} id={s.lifes}>
                                {'❤❤❤❤❤❤❤'}
                            </div>
                            <div className={s.score}>
                                {score}
                            </div>
                        </div> */}
                        <div 
                            className={s.grid}
                            style={{
                                gridTemplateColumns: `repeat(${cols}, 100px)`
                            }}
                        >
                            {
                                grid.map((rows, i) => rows.map((col, k) => 
                                    <div 
                                        key={`${i}-${k}`}
                                        className={s.grid_cell} 
                                    >
                                        {
                                            
                                            // k % 2 === 0 ? wordToTranslate[i+k] : translatedWord[i+k]
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sapper;