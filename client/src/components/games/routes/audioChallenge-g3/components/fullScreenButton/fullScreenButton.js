import React from 'react'
import s from './style.module.css';

const fullScreenButton = () => {

    return (
        <div className={s.fullscreenBtn}>
            <img className={s.fullScreenImg} src="./images/fullscr.png" alt="full-screen"></img>
        </div>
    )
}

export default fullScreenButton;