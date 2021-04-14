import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Menu from "./headerMenu/headerMenu";

import s from "./style.module.css";

const Header = () => {
  const history = useHistory();
  const [active, setactive] = useState(null)

  const handleLogin = () => {
    history.push("/registration");
  };

  const handleNav = () => {
    setactive(prevState => !prevState)
  }

  const ROUTES = [
    {
      route: '/',
      title: 'Главная'
    },
    {
      route: '/games',
      title: 'Мини-игры'
    },
    {
      route: '/stats',
      title: 'Статистика'
    },
    {
      route: '/eBook',
      title: 'Учебник'
    },
    {
      route: '/AboutApp',
      title: 'О приложении'
    },
    {
      route: '/AboutTeam',
      title: 'О команде'
    },
    {
      route: '/dictionary',
      title: 'О команде'
    }
  ]

  return (
    <>
      <Menu routes={ROUTES} isActive={active} handleNavbarClick={handleNav} />
      <header className={s.root}>
        <nav className={s.nav}>
        <input id={s.menu_toggle} type="checkbox" checked={active ? true : false}/>
          <label 
            for={s.menu_toggle} 
            className={s.burger}
            onClick={handleNav}
          >
              <span></span>
          </label>
          <ul className={s.menu}>
            {ROUTES.map((link, id) => {
              return (
                <li key={id} className={s.nav_list}>
                  <Link
                    to={link.route}
                    className={s.nav_links}
                  >
                    {link.title}
                  </Link>
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
