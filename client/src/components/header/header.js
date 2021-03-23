import { useHistory } from 'react-router-dom';

import s from './style.module.css';

const Header = ({ title, descr }) => {
    // const history = useHistory();

    // const handleClick = () => {
    //     history.push('/');
    // }
    const links = ['Главная','Мини-игры','Статистика','Словарь','О приложении','О команде']

    return (
        <>
            <header className={s.root}>
                <nav className={s.nav}>
                    <ul>
                        {
                            links.map(link => {
                                return (
                                    <li className={s.nav_list}>
                                        <a href="#" className={s.nav_links}
                                        onClick={(e)=>{e.preventDefault()}}>
                                            {link}
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <button className={s.login_button}>
                        Зайти в кабинет
                    </button>
                </nav>
            </header>
        </>
    )
}

export default Header;