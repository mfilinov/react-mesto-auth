import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Header from "./Header";
import {register} from "../utils/auth";

function Register({handleInfoTooltip, setIsRegistrationError}) {
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
    register(formValue.email, formValue.password)
      .then((res) => {
        setIsRegistrationError(false);
        handleInfoTooltip();
        navigate('/sign-in', {replace: true});
      })
      .catch(() => {
        setIsRegistrationError(true);
        handleInfoTooltip();
      });
  }

  return (
    <>
      <Header redirectLink="/sign-in" redirectLinkText="Войти"/>
      <div className="login__container">
        <h2 className="login__title">Регистрация</h2>
        <form name="register"
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
          <button type="submit" className="login__button">Зарегистрироваться</button>
        </form>
        <div className="login__redirect-container">
          <p className="login__redirect">
            Уже зарегистрированы? <Link to="/sign-in" className="login__redirect link-opacity">
            Войти</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Register;
