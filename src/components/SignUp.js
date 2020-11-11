import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createUser } from '../actions/userCreate.js'
import styles from '../styles/SignUp.module.css'

// eslint-disable-next-line
function SignUp({ createUser }) {
  const [state, setState] = useState({
    last_name: '',
    first_name: '',
    phone: '',
    email: '',
    username: '',
    password: '',
  })

  function changeInputHandler(event) {
    event.persist()
    setState((prev) => ({
      ...prev,
      ...{
        [event.target.name]: event.target.value,
      },
    }))
  }

  function submitHandler(event) {
    event.preventDefault()
    createUser(state.username, state.password, state.first_name, '', state.last_name, state.phone, state.email)

    setState({
      last_name: '',
      first_name: '',
      phone: '',
      email: '',
      username: '',
      password: '',
    })
  }

  window.onload = () => {
    document.getElementById('password').onchange = validatePassword
    document.getElementById('password-check').onchange = validatePassword
  }
  function validatePassword() {
    const pass2 = document.getElementById('password-check').value
    const pass1 = document.getElementById('password').value
    if (pass1 !== pass2) document.getElementById('password-check').setCustomValidity('Пароли не совпадают')
    else document.getElementById('password-check').setCustomValidity('')
  }

  return (
    <div className={styles.Container}>
      <form className={`${styles.SignUpForm} form`} onSubmit={submitHandler}>
        <div className={styles.FormName}>Регистрация</div>
        <div>
          <input
            required
            name="last_name"
            placeholder="Фамилия"
            maxLength="30"
            title="Фамилия может содержать только буквы и должна быть длиннее 2 символов"
            pattern="[A-Za-zА-Яа-яЁё]{2,30}"
            className={styles.FormInput}
            onChange={changeInputHandler}
          />
          <input
            required
            name="first_name"
            placeholder="Имя"
            maxLength="30"
            title="Имя может содержать только буквы и должно быть длиннее 2 символов"
            pattern="[A-Za-zА-Яа-яЁё]{2,30}"
            className={styles.FormInput}
            onChange={changeInputHandler}
          />
        </div>
        <div>
          <input
            type="tel"
            required
            name="phone"
            maxLength="11"
            pattern="8[0-9]{10}"
            title="Введите номер телефона в формате 8xxxxxxxxxx"
            placeholder="Номер телефона"
            className={styles.FormInput}
            onChange={changeInputHandler}
          />
          <input
            type="email"
            required
            name="email"
            placeholder="Электронная почта"
            className={styles.FormInput}
            onChange={changeInputHandler}
          />
        </div>
        <input
          required
          name="username"
          placeholder="Логин"
          maxLength="30"
          title="Логин должен содержать от 3 символов"
          pattern=".{3,30}"
          className={styles.FormInput}
          onChange={changeInputHandler}
        />
        <div>
          <input
            required
            name="password"
            type="password"
            id="password"
            title="Пароль не может быть короче 6 символов"
            pattern=".{6,}"
            placeholder="Пароль"
            className={styles.FormInput}
            onChange={changeInputHandler}
          />
          <input
            required
            type="password"
            id="password-check"
            placeholder="Повторите пароль"
            className={styles.FormInput}
          />
        </div>
        <div className={styles.Warning}>Все поля обязательны для заполнения</div>
        <button type="submit" id="submit" className={styles.SubmitButton}>
          ЗАРЕГИСТРИРОВАТЬСЯ
        </button>
      </form>
      <div className={styles.SignIn}>
        Уже есть аккаунт?{' '}
        <a href="#/sign-in" className={styles.SignInButton}>
          Войти
        </a>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  createUser: (username, password, firstName, patronymic, lastName, phone, email) =>
    dispatch(createUser(username, password, firstName, patronymic, lastName, phone, email)),
})

export default connect(null, mapDispatchToProps)(SignUp)
