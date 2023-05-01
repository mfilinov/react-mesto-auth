import React, {useState} from "react";
import Header from "./Header";
import {useNavigate} from "react-router-dom";
import {authorize} from "../utils/auth";

function Login({handleLogin, setEmail}) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    authorize(formValue.email, formValue.password)
      .then(() => {
        handleLogin();
        setEmail(formValue.email);
        setFormValue({email: '', password: ''});
        navigate('/', {replace: true});
      })
      .catch(e => console.log(e));
  }
  return (
    <>
      <Header redirectLink="/sign-up" redirectLinkText="Регистрация"/>
      <div className="login__container">
        <h2 className="login__title">Вход</h2>
        <form name="login"
              className="login__form"
              noValidate
              onSubmit={handleSubmit}>
          <div className="login__input-container">
            <input type="email"
                   name="email"
                   placeholder="Email"
                   className="login__input"
                   onChange={handleChange}
                   value={formValue.email}/>
            <input type="password"
                   name="password"
                   placeholder="Пароль"
                   className="login__input"
                   onChange={handleChange}
                   value={formValue.password}/>
          </div>
          <button type="submit" className="login__button">Войти</button>
        </form>
      </div>
    </>

  )
}

export default Login;
