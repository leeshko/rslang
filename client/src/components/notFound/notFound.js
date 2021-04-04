import { useHistory } from 'react-router-dom';

import s from './style.module.css';

const NotFound = () => {
    const history = useHistory();

    const handleClick = () => {
        history.push("/")
    }

    return (
        <div className={s.notfound}>
            <h1 className={s.error}>
                404 NOT FOUND
            </h1>
            <button className={s.get_back} onClick={handleClick}>
                Get Back
            </button>
        </div>   
    )
}

export default NotFound;