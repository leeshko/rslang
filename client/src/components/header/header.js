import { useHistory } from "react-router-dom";

import s from "./style.module.css";

const Header = ({ title, descr }) => {
  const history = useHistory();

  const handleLogin = () => {
    history.push("/registration");
  };

  const handleLinkNavigation = (e, link) => {
        e.preventDefault();
   
        if(link === links[0]) history.push('/');
        else if(link === links[1]) history.push('/games');
        else if (link === links[3]) history.push("/eBook");
        else if (link === links[4]) history.push('/AboutApp');
        else if (link === links[5]) history.push('/AboutTeam');
        else if (link === links[6]) history.push("/dictionary");
    
    }

  const links = [
    "Главная",
    "Мини-игры",
    "Статистика",
    "Электронный Учебник",
    "О приложении",
    "О команде",
    "Словарь",
  ];
  return (
    <>
      <header className={s.root}>
        <nav className={s.nav}>
          <ul>
            {links.map((link, id) => {
              return (
                <li key={id} className={s.nav_list}>
                  <a
                    href="#"
                    className={s.nav_links}
                    onClick={(e) => {
                      handleLinkNavigation(e, link);
                    }}
                  >
                    {link}
                  </a>
                </li>
              );
            })}
          </ul>
          <button
            onClick={() => {
              handleLogin();
            }}
            className={s.login_button}
          >
            Зайти в кабинет
          </button>
        </nav>
      </header>
    </>
  );
};

export default Header;
