import React, {useState} from "react";
import {Link} from "react-router-dom";
import Header from "./Header";

function Register({onRegister}) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formValue.email, formValue.password);
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
