import React from 'react'
import s from './wordCell.module.css';

const WordCell = (props) => {

    return (
      <div className={s.cell} onClick={() => {props.compare(props.text._id.$oid)}}> 
      
      <span className={s.word}><b>{props.text.wordTranslate}</b></span>
      </div>
    )
}

export default WordCell;