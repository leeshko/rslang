import { useHistory } from 'react-router-dom';

import s from './style.module.css';

const NotFound = () => {
    const history = useHistory();

    const handleClick = () => {
        history.push("/home")
    }

    return (
        <>
            <h1 className={s.header}>
                404 NOT FOUND
            </h1>
            <button className={"link_button"} onClick={handleClick}>
                Get Back
            </button>
        </>   
    )
}

export default NotFound;