import React from 'react';
import s from './buttonLayer.module.css';

const ButtonLayer = (props) => (
    <div className={s.buttonLayer} >
        <button className={s.button} onClick={() => {props.dont()}}> <b>{`не знаю`}</b> </button>      
    </div>
)

export default ButtonLayer;