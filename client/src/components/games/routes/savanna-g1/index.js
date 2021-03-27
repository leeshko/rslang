import s from './style.module.css';

import WORDS from '../../../../data/words.json'
import { useEffect, useState } from 'react';

const Savanna = () => {

    const [wordsIndex, setWordsIndex] = useState([])
    const [playdWord, setPlaydWord] = useState(['', '', '', ''])
    const [gameLevel, setGameLevel] = useState(1)

    // Object.values(WORDS).map((w, id) => {
    //     console.log(w.word, w.wordTranslate)
    //     i++
    //     if (i > 20) return
    // })

    // Забираем из массива слов рандомно 4 объекта,
    // помещаем слова из них в дивы в UI,
    // записываем индексы выбранных объектов,
    // after player choosed one word, we again find randomly
    // another 4 word, and check if there id is already
    // choosed or not 





    const findWords = () => {
        const wordsArr = []

        for (let i = 0; i < 4; i ++) {
            let safeIndexesArr = checkedIndex()

            // const last = wordsArr.length - 1
            // const first = last -
            // wordsArr.slice(, last)
            
            wordsArr.push(WORDS[safeIndex].wordTranslate)
        }

        setPlaydWord(prevState => {
            return (
                prevState.map((w, ind) => {
                    return  wordsArr[ind]
                })
            )
        })
    }
         
    const checkedIndex = () => {
        const uncheckedIndex = getRandUncheckedIndex()

        setWordsIndex(prevState => {
            prevState.push(checkIfIndexUsed(uncheckedIndex))

            return prevState
        })

        return wordsIndex[wordsIndex.length - 1]
    }

    const getRandUncheckedIndex = () => {
        return (Math.floor(Math.random() * 3601))
    }

    const checkIfIndexUsed = (index) => {
        let tempI = index
        if ( !wordsIndex.includes(tempI) ) {
            return tempI
        } else {
            tempI = getRandUncheckedIndex()
            checkIfIndexUsed(tempI)
        }
    }

    useEffect(()=> {
        findWords()
    }, [])

    return (
        <>
            <div className={s.game_wrapper}>
               <div className={s.game} 
                    onClick={()=>{
                        // console.log(checkedIndex())
                        // console.log(playdWord)
                    }}
                >
                    <div
                        className={s.test}
                        onClick={()=> {
                            findWords()
                        }}
                    >
                        rerender Words
                    </div>
                   {
                       playdWord.map((w,id) => {
                           return (
                               <div 
                                    key={id} 
                                    className={s.word}
                                    onClick={()=>{
                                        console.log(w)
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