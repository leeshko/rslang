import React from 'react'
import s from './wordCell.module.css';


const WordCell = (props) => {
    
    return (
      <div className={s.cell}> 
         {/*<span className={s.sign}><b>v</b></span>*/}  <span className={s.word}><b>{props.text}</b></span>
      </div>
    )
}

export default WordCell;