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
    const [firstWord, setFirstWord] = useState({
        word: '',
        div: null
    })
    const [solvedWords, setSolvedWords] = useState([])
    const [faileddWords, setFaileddWords] = useState([])

    // game start / end 
    const [inGame, setInGame] = useState(false)
    const [isOver, setIsOver] = useState(false)

    // game field
    const cols = 4
    const rows = 4
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
        let both = {}


        // random index to choose word wich player gona translate
        // const wordToTranslateIndex = Math.floor(Math.random() * 4)

        const numWords = ((cols * cols) / 2)

        for (let i = 0; i < numWords; i ++) {
            let safeIndex = await checkedIndex()

            words.push(WORDS[safeIndex].wordTranslate);
            wordsTranslate.push(WORDS[safeIndex].word);

            setBothWords(prevState => {
                return {
                    ...prevState,
                    [`${i}`] : {
                        [`${words[i]}`] : words[i],
                        [`${wordsTranslate[i]}`] : wordsTranslate[i],
                    }
                }
            })
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

    const checkAnswer = (e) => {
        Object.values(bothWords).map((both, id) => {
            if (both[`${e.target.innerText}`]) {
                Object.values(both).map((w) => {
                    if (w === firstWord.word) {
                        if (solvedWords.includes(w)) console.log('AAA')
                        e.target.style.backgroundColor = 'rgba(119,57,221,0.4)'
                        setSolvedWords(prevState => {
                            prevState.push(w)
                            prevState.push(e.target.innerText)
                            return prevState
                        })
                        setScore(prevState => prevState + 92)
                    } else if (w !== e.target.innerText) {
                        setScore(prevState => prevState - 24)
                        setFaileddWords(p => {
                            p.push(firstWord.word)
                            return p
                        })
                        firstWord.div.style.backgroundColor = 'rgba(255,25,50,.4)'
                    }
                }) 
                return both
            }
        })
        setFirstWord({
            word: '',
            div: null
        })
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
        fillCells()
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

    const fillCells = () => {
        const cells = document.getElementsByClassName(s.grid_cell)

        for (let i = 0; i < cells.length; i++) {
            const floored = Math.floor(i / 2)
            i % 2 === 0 ?
            cells[i].innerText = translatedWord[floored]
            : cells[i].innerText = wordToTranslate[floored]
        }
    }

    const addFirstWord = (e) => {
        if (solvedWords.includes(e.target.innerText) 
            || e.target.innerText === firstWord.word
            || faileddWords.includes(e.target.innerText)) return

        if (firstWord.word === '') {
            setFirstWord(prevState => {
                return {
                    ...prevState,
                    word: e.target.innerText,
                    div: e.target
                }
            })

            e.target.style.backgroundColor = 'rgba(119,57,221,0.4)'
            return
        } else if (checkAnswer(e)) {
            

        }

    }

    useEffect(() => {
        findWords()
    }, [])

    useEffect(()=> {
        if (cols * rows - (solvedWords.length + faileddWords.length) <= 1) {
            console.log('gameOver')
        }
    }, [solvedWords, faileddWords])

    return (
        <>
            <div className={s.game_wrapper}>
               <div className={s.game_box}>
                    <div className={`${s.screen} ${s.greeting_bye_screen} ${inGame ? `${s.hidden}` : `${s.visible}`}`}>
                        <h3 className={s.title}>
                            Match
                        </h3>
                        <div className={s.description}>
                            Соедини пары слов!
                        </div>
                        <button 
                            onClick={startGame}
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
                                    {solvedWords.length}
                                </td>
                                <td>
                                    {score}
                                </td>
                                <td>
                                    {/* {faileddWords.map(w => {
                                        return (
                                            <div className={s.wrongWord}>
                                                {w}
                                            </div>
                                        )
                                    })} */}
                                    {faileddWords.join(',')}
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
                        </div>
                    </div>

                    <div className={`${s.screen} ${s.game} ${inGame ? `${s.visible}` : `${s.hidden}`}`} id={s.game}>
                        <div className={s.game_sats}>
                            <div className={s.lifes} id={s.lifes}>
                                <button
                                    className={`login_button ${s.game_over_btn}`}
                                    onClick={gameOver}>
                                    finish game
                                </button>
                            </div>
                            <div
                                className={s.score}
                                style={score < 0 ? {color: 'rgba(0,0,50,.9)'} : {}}
                            >
                                {score}
                            </div>
                        </div>
                        <div 
                            className={s.grid}
                            style={{
                                gridTemplateColumns: `repeat(${cols}, 150px)`
                            }}
                        >
                            {
                                grid.map((rows, i) => rows.map((col, k) => 
                                    <div 
                                        key={`${i}-${k}`}
                                        className={s.grid_cell}
                                        onClick={(e) => {addFirstWord(e)}}
                                    >
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