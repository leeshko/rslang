import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import s from './style.module.css';

const Games = () => {

    const games = [
        {
            title: 'a',
            description: 'aaa',
            imgStyle: 'game1',
        },
        {
            title: 'b',
            description: 'aaa',
            imgStyle: 'game2',
        },
        {
            title: 'v',
            description: 'aaa',
            imgStyle: 'game3',
        },
        {
            title: 'g',
            description: 'aaa',
            imgStyle: 'game4',
        }
    ]

    const activateRole = (id) => {
        // setAuthors(prevState => {
        //     return (
        //         prevState.map(auth => {
        //             if (auth.id === id) {
        //                 auth.activated = !auth.activated
        //             }
        //             return auth
        //         })
        //     )
        // })
    }

    return (
        <>
            <div className={s.games}>
                <div className={s.bg_blur}>
                    <div className={s.about_logoblock}>
                        <div className={s.eclips}></div>
                        <div className={s.about_title}>Мини-Игры</div>
                    </div>
                    <div className={s.games_block}>
                        {
                            games.map((game, id) => {
                                return (
                                    <div key={id} className={s.card}>
                                        <div className={s.img_wrapper}>
                                            <div className={`${s.img} ${s[game.imgStyle]}`} />
                                        </div>
                                        <div className={s.title}>
                                            {game.title}
                                        </div>
                                        <div className={s.description}>
                                            {game.description}
                                        </div>
                                        <button onClick={()=>{activateRole(game.id)}}
                                            className={s.donat_btn}>
                                            Начать игру
                                        </button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Games;