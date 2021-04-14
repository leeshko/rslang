import { Link } from "react-router-dom";
import s from "./style.module.css";

const Menu = ({ isActive, handleNavbarClick, routes }) => {

  return (
    <div className={`${s.menuContainer}
          ${isActive === true ? [s.active] : ''}
          ${isActive === false ? [s.deactive] : ''}`
        }>
        <div className={s.overlay} />
        <div className={s.menuItems}>
          <ul>
            {routes.map((route, id) => {
              return (
                <li key={id}>
                  <Link to={route.route} onClick={()=>{
                    handleNavbarClick()
                  }}>
                    {route.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
    </div>
  );
}

export default Menu;
