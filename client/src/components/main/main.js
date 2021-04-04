import { useHistory } from 'react-router-dom';

import s from './style.module.css';

const Main = () => {
    const history = useHistory();
    const handleStartGame = () => {
        history.push('/games');
    }
    
    return (
        <>
            <div className={s.main}>
                <div className={s.main_footer_block}>
                    <button onClick={()=> {handleStartGame()}}
                        className={`blue_button`}>
                        Начать игру
                    </button>
                    <div className={s.stats_block}>
                        <div className={s.stats_daily}>
                            Изучено слов сегодня: <span>{0}</span>
                        </div>
                        <div className={s.stats_general}>
                            Изучено слов за всё время: <span>{0}</span>
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