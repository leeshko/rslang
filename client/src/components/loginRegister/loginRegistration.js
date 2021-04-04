import s from './style.module.css';

const LoginRegister = () => {    
    return (
        <>
            <div className={s.reg}>
                <div className={s.reg_block}>
                    <h3>
                        Регистрация
                    </h3>
                    <p>
                        Больше 70% учеников увеличили свой словарный запас на 2500 слов
                    </p>
                    <form className={s.reg_form}>
                        <input className={s.input} type={'text'} id={'email'} 
                            placeholder={'E-mail'} required inputMode={'email'}>
                        </input>
                        <input  className={s.input} type={'text'} id={'name'}
                            placeholder={'Name'} required>
                        </input>
                        <input  className={s.input} type={'password'} id={'password'}
                            placeholder={'Password'} required>
                        </input>
                        <button className={'blue_button'} type={'submit'}>
                            Sign up
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginRegister;