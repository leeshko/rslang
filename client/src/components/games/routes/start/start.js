import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import s from './style.module.css';

const StartPage = () => {
    const history = useHistory()

    const games = [
        {
            id: 0,
            title: 'Саванна',
            action: 'Отличная тренировка',
            imgStyle: 'game1',
            imgbg: 'linebg1',
            description: 'Тренирует понимание речи и быстрого перевода слов, помогает не забыть выученные слова.',
            link: '/savannah'
        },
        {
            id: 1,
            title: 'Спринт',
            action: 'Приготовься к скорости',
            imgStyle: 'game2',
            imgbg: 'linebg2',
            description: 'Напоминает пройденные слова, тренирует быстрый  перевод.',
            link: '/'
        },
        {
            id: 2,
            title: 'Аудиовызов',
            action: 'Приготовь наушники',
            imgStyle: 'game3',
            imgbg: 'linebg3',
            description: 'Повышает уровень восприятия речи на слух.',
            link: '/'
        },
        {
            id: 3,
            title: 'Мэтч',
            action: 'Наслаждайся',
            imgStyle: 'game4',
            imgbg: 'linebg4',
            description: 'Тренирует внимательность.',
            link: '/match'
        }
    ]

    const chooseGame = (id) => {
        history.push(`/games${games[id].link}`)
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
                                            <div className={`${s.img} ${s[game.imgbg]}`} />
                                            <div className={`${s.img} ${s[game.imgStyle]}`} />
                                        </div>
                                        <div className={s.title}>
                                            {game.title}
                                        </div>
                                        <div className={s.action}>
                                            {game.action}
                                        </div>
                                        <button onClick={()=>{chooseGame(game.id)}}
                                            className={"blue_button"}>
                                            Я в игре
                                        </button>
                                        <div className={s.description}>
                                            {game.description}
                                        </div>
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

export default StartPage;