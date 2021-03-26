import { useHistory } from 'react-router-dom';

import s from './style.module.css';

const Footer = ({ title, descr }) => {
    const history = useHistory();

    const handleLogin = () => {
        history.push('/registration');
    }

    const links = ['Главная','Статистика','Словарь','О приложении','О команде']

    return (
        <>
            <footer className={s.root}>
                <div className={s.container}>
                    <div className={s.logo_block}>
                            <a href='https://rs.school/'
                                className={s.logo_link} target="_blank">

                            </a>
                            <div className={s.RS_link_block}>
                                <div className={s.line} />
                                <div className={s.cursor} />
                                <a href='https://rs.school/' target="_blank"
                                    className={s.RS_link}>
                                    rs.school
                                </a>
                            </div>
                    </div>
                    <div className={s.git_links_copyright}>
                        <div className={s.git_link}>
                            <a  href='https://github.com/AlekRing' target='_blank'>
                                @AlekRing  
                            </a>
                            <a href='#' target='_blank'>  
                                @fdgfh  
                            </a>
                            <a href='#' target='_blank'>
                                @fgfhbnjmh  
                            </a>
                            <a href='#' target='_blank'>
                                @p[cfklgb[p  
                            </a>
                        </div>
                        <div className={s.line} />
                        <div className={s.year} >
                            2021
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;