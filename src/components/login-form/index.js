import {memo} from "react";
import "./style.css"
import {cn as bem} from "@bem-react/classname";

function LoginForm(props) {
  const cn = bem('LoginForm');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Вход</h2>
      <form className={cn('form')} onSubmit={(e) => {
        e.preventDefault()
        props.onSubmit(e.target.login.value, e.target.password.value)
      }}>
        <div className={cn('prop')}>
          <label className={cn('label')} htmlFor="login">Логин</label>
          <input className={cn('input')} id="login" type="text"/>
        </div>
        <div className={cn('prop')}>
          <label className={cn('label')} htmlFor="password">Пароль</label>
          <input className={cn('input')} id="password" type="password"/>
        </div>
        <div className={cn('error')}>{props.error}</div>
        <button className={cn('button')} type="submit">Войти</button>
      </form>
    </div>
  )
}

export default memo(LoginForm)
