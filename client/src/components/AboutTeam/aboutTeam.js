import { useHistory } from 'react-router-dom';

import s from './style.module.css';

const AboutTeam = () => {
    const history = useHistory();

    const handle = () => {
        history.push('/');
    }

    const authors = [
        {
            img: '../',
            name: 'Олег Кольцов',
            git: '@AlekRing',
            gitLink: 'github.com/AlekRing',
            role: 'done something'
        },
        {
            img: '../',
            name: 'Алексей',
            git: '@git..',
            gitLink: 'github.com/..',
            role: 'done something'
        },
        {
            img: '../',
            name: 'Ойбек',
            git: '@git..',
            gitLink: 'github.com/..',
            role: 'done something'
        },
        {
            img: '../',
            name: 'Руслан',
            git: '@git..',
            gitLink: 'github.com/..',
            role: 'done something'
        }
    ]

    return (
        <>
            <div className={s.about}>
               <div className={s.bg_blur}>
                    <div className={s.about_logoblock}>
                        <div className={s.eclips}></div>
                        <div className={s.about_title}>О команде</div>
                    </div>
                    <div className={s.cards_block}>
                        {
                            authors.map(auth => {
                                return (
                                    <div className={s.card}>
                                        <div className={s.img}>

                                        </div>
                                        <div className={s.name}>
                                            {auth.name}
                                        </div>
                                        <div className={s.git}>
                                            <a href={auth.gitLink}>{auth.git}</a>
                                        </div>
                                        <button className={s.donat_btn}>
                                            Вклад в проект
                                        </button>
                                        <div>
                                            {auth.role}
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

export default AboutTeam;