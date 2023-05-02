import React, {useState} from "react";
import Header from "./Header";

function Login({handleLogin}) {
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
    handleLogin(formValue.email, formValue.password);
    setFormValue({email: '', password: ''});
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
