import Header from '../header/header';

import { useHistory } from 'react-router-dom';

import s from './style.module.css';

const Main = ({ title, descr }) => {
    // const history = useHistory();
    // const handleClick = () => {
    //     history.push('/');
    // }
    
    return (
        <>
            <div className={s.main}>
                <Header />
                <div className={s.main_footer_block}>
                    <button className={s.start_game}>
                        Начать игру
                    </button>
                    <div className={s.stats_block}>
                        <div className={s.stats_daily}>
                            <div>Изучено слов сегодня: <span>{0}</span></div>
                        </div>
                        <div className={s.stats_general}>
                            <div>Изучено слов за всё время: <span>{0}</span></div>
                        </div>
                    </div>
                    <div className={s.progress_block}>
                        <div className={s.progress_general}>
                            Весь прогресс: <span>000</span>
                        </div>
                        <div className={s.progressbar}>
                            <div  className={s.progress_zero}>0</div>
                            <div className={s.progress_full}>1000</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main;