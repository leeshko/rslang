import React from 'react';
import s from './movingLayer.module.css';
import WordCell from './wordCells/wordCell';
import SoundLayer from './soundLayer/soundLayer';
import ButtonLayer from './buttonLayer/buttonLayer';

const MovingLayer = (props) => (
    <>
        <SoundLayer />
        <div className={s.wordsLayer}> {props.gameWords.map(wordObj => (
            <WordCell
                key={wordObj._id.$oid}
                text={wordObj}
                compare={props.compare}
            />
        ))}
        </div>
        <ButtonLayer words={props}
        />
    </>
)

export default MovingLayer;

