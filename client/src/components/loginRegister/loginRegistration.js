import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import s from './style.module.css';

const LoginRegister = () => {   
    const history = useHistory()
    const [signup, setSignup] = useState(true) 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const handleClick = () => {
        history.push('/')
    }

    const handleClickSignupIn = () => {
        setEmail(p => {
            return p
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setEmail('')
        setPassword('')
        setName('')
    }
    
    return (
        <>
            <div className={s.reg}>
                <div className={s.reg_block}>
                    <h3>
                        {signup ? 'Регистрация' : 'Авторизация'}
                    </h3>
                    <p>
                        Больше 70% учеников увеличили свой словарный запас на 2500 слов
                    </p>
                    <form
                        onSubmit={handleSubmit}
                        className={s.reg_form}
                    >
                        <input
                            onChange={(e) => {setEmail(e.target.value)}}
                            value={email}
                            className={s.input} 
                            type={'text'} 
                            id={'email'} 
                            placeholder={'E-mail'} 
                            required 
                            inputMode={'email'}>
                        </input>
                        {signup ? 
                        <input
                            onChange={(e) => {setName(e.target.value)}}
                            value={name}
                            className={s.input} 
                            type={'text'} 
                            id={'name'}
                            placeholder={'Name'}>
                        </input> : ''}
                        <input
                            onChange={(e) => {setPassword(e.target.value)}}
                            value={password}
                            className={s.input} 
                            type={'password'} 
                            id={'password'}
                            placeholder={'Password'} 
                            required>
                        </input>
                        <div className={s.btn_sign_up_in}>
                            <button 
                                className={'blue_button'} 
                                type={'submit'}
                            >
                                {signup ? 'Sign up' : 'Sign in'}
                            </button>
                            <div 
                                className={s.sign_up_in}
                                onClick={handleClickSignupIn}
                            >
                                {signup ? 'sign in?' : 'sign up?'}
                            </div>
                        </div>
                    </form>
                </div>
                <button
                    onClick={handleClick}
                    className={`login_button ${s.back_btn}`}
                >
                    Вернуться на главную
                </button>
            </div>
        </>
    )
}

export default LoginRegister;
