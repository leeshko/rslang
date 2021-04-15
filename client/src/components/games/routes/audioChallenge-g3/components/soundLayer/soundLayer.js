import React from 'react';
import s from './soundLayer.module.css';
import soundLogo from '../../../../../../assets/sound.png';

const SoundLayer = () => (
    <div className={s.soundLayer}>
        <div className={s.roundOfSound}> <img src={soundLogo} className={s.soundImage} /> </div>
    </div>
)

export default SoundLayer;