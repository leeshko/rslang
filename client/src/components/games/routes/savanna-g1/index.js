import s from './style.module.css';

import ReactDOM from 'react-dom'
import WORDS from '../../../../data/words.json'
import { useEffect, useState } from 'react';

const Savanna = () => {

    const [wordsIndex, setWordsIndex] = useState([])
    const [translatedWord, setTranslatedWord] = useState(['','','',''])
    const [wordToTranslate, setWordToTranslate] = useState({})
    const [gameLevel, setGameLevel] = useState(1)

    //game parametres
    const [score, setScore] = useState(0)
    const [top, setTop] = useState(0)
    const [lifesLeft, setLifesLeft] = useState(7)

    const findWords = async () => {
        const gameWords = []

        // random index to choose word wich player gona translate
        const wordToTranslateIndex = Math.floor(Math.random() * 4)

        for (let i = 0; i < 4; i ++) {
            let safeIndexesArr = await checkedIndex(i)

            if (i === wordToTranslateIndex) {
                const newWord = {
                        word: WORDS[safeIndexesArr].word,
                        translation: WORDS[safeIndexesArr].wordTranslate
                    }

                setWordToTranslate(newWord)
            }

            gameWords.push(WORDS[safeIndexesArr].wordTranslate)
        }

        // console.log(translatedWord, wordsIndex, wordToTranslate)

        setTranslatedWord(prevState => {
                return (
                    prevState.map((w, ind) => {
                        return  gameWords[ind]
                    })
                )
            })
    }
         
    const checkedIndex = async (i) => {
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
            falling('reset')
        } else {
            setLifesLeft(prevState => prevState - 1)
            minusHeart()
        }
        console.log(lifesLeft)
    }

    const falling = (reset) => {
        if (reset === 'gameOver') {
            setTop(0)
            return
        }
        const t = setInterval(() => {
            setTop(p => p+1)
        }, 6)
        if (reset === 'reset') {
            clearInterval(t)
            setTop(0)
        }
    }

    const minusHeart = () => {
        let lifes = document.getElementById(s.lifes).textContent.split('')
        lifes.pop()
        lifes = lifes.join('')
        document.getElementById(s.lifes).textContent = lifes
    }

    const gameOver = () => {
        falling('gameOver')
    }

    useEffect(()=> {
        findWords()
        falling()
    }, [])

    useEffect(() => {
        const gameWindowHeight = document.getElementById(s.game).clientHeight

        if (top >= gameWindowHeight) {
            setLifesLeft(prevState => prevState - 1)
            minusHeart()
            findWords()
            falling('reset')
            console.log(lifesLeft)
        }
    }, [top])

    useEffect(()=> {
        if (lifesLeft === 0) {
            console.log('GameOVER')
            gameOver()
        }
    }, [lifesLeft])

    return (
        <>
            <div className={s.game_wrapper}>
               <div className={s.game} id={s.game}>
                    <div 
                        className={`${s.word_translate}`}
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
                    </div>
                   {
                       translatedWord.map((w,id) => {
                           return (
                               <div 
                                    key={id} 
                                    className={s.word}
                                    onClick={()=>{
                                        checkAnswer(w)
                                    }}
                                >
                                   {w}
                               </div>
                           )
                       })
                   }
                </div>
            </div>
        </>
    )
}

export default Savanna;