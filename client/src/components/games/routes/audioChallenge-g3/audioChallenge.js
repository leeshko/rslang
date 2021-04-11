import s from './style.module.css';
import MovingLayer from './components/movingLayer';



import WORDS from '../../../../data/words.json'
import React, { useEffect, useState } from 'react';


const AudioChallenge = () => {
    const gameWords = [];
    let imgWord = '';
    const startRandomIndex = Math.floor(Math.random() * 3500);

    // make words Obj array
    for (let i = 0; i < 5; i++) {
        gameWords.push(WORDS[startRandomIndex + i]);
    }

    //take sound 

    //correct answer index
    let correctAnswerWordObject = gameWords[Math.floor(Math.random() * 5)];
    const [audioWord, setAudioWord] = useState(correctAnswerWordObject.audio);
    imgWord = correctAnswerWordObject.image;         
    let audio = new Audio(`https://react-learnwords-example.herokuapp.com/${audioWord}`);
    let imageSrc = `https://react-learnwords-example.herokuapp.com/${imgWord}`;
    console.log(imageSrc)

    
    useEffect(() => {
        audio.play();
    }, [])

    return (
        <>
            <div className={s.game_wrapper}>
                <div className={s.game} >
                    <div className={s.movingLayer}>
                        <MovingLayer
                            gameWords={gameWords}
                        />
                    </div>
                </div>
            </div>

            {/* //             <div className={s.score}>
//                         <button onClick={() => audio.play()}></button>
//                         <img src={`https://react-learnwords-example.herokuapp.com/${imgWord}`} alt="logo"></img>
                        
//                         </div> */}
        </>
    )

}


// class AudioChallenge extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { playing: false, todos: [] };
//         this.audioWord = gameWords[Math.floor(Math.random() * 5)].audio;
//         this.audio = new Audio(`https://react-learnwords-example.herokuapp.com/${audioWord}`);
//         this.imgWord = gameWords[Math.floor(Math.random() * 5)].image;  
//         this.gameWords = [];
//         this.startRandomIndex = Math.floor(Math.random() * 3500);
//       }

//     // make words Obj array
//     makeGameWordsObj() {
//     for (let i = 0; i < 5; i++) {
//         gameWords.push(WORDS[startRandomIndex + i]);
//     }}

//     componentDidMount(){
//         this.audio.play();
//       }

//     render() {

//     return (
//         <>
//             <div className={s.game_wrapper}>
//                 <div className={s.game} >
//                     <div className={s.movingLayer}>
//                         <MovingLayer

//                             gameWords={gameWords}
//                         />
//                     </div>
//                 </div>
//             </div>

//             {/* <div className={s.score}>
//                         <button onClick={() => audio.play()}></button>
//                         <img src={`https://react-learnwords-example.herokuapp.com/${imgWord}`} alt="logo"></img>

//                         </div> */}
//         </>
//     )}



export default AudioChallenge;