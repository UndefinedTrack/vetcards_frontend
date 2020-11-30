/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createUser, createJWT } from '../actions/userCreate.js'
import styles from '../styles/SignUp.module.css'

// eslint-disable-next-line
function SignUp({ createUser, createJWT, userToken, setUserReg, regFailed }) {
  let wrong
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
  }

  if (userToken && userToken.id !== undefined) {
    wrong = ''
    createJWT(state.username, state.password)
  }
  if (userToken && userToken.username !== undefined && userToken.username !== state.username) {
    ;[wrong] = userToken.username
  }
  if (userToken && userToken.password !== undefined && userToken.password !== state.password) {
    ;[wrong] = userToken.password
  }

  if (userToken !== null && userToken !== undefined) {
    localStorage.setItem('token', userToken.access)
    localStorage.setItem('refresh', userToken.refresh)
  }

  if (userToken && userToken.access !== undefined) {
    localStorage.setItem('userReg', true)
    setUserReg(true)
    window.location.href = '#/my-acc'
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
    <div className={styles.SignUpContainer}>
      <form className={styles.SignUpForm} onSubmit={submitHandler}>
        <div className={styles.FormName}>Регистрация</div>
        <div className={styles.Block}>
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
        <div className={styles.Block}>
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
        <div className={styles.Block}>
          <input
            required
            name="password"
            type="password"
            id="password"
            title="Пароль не может быть короче 8 символов"
            pattern=".{8,}"
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
        <div className={styles.WrongMessage}>{wrong}</div>
        <button type="submit" id="submit" className={styles.SubmitButton}>
          ЗАРЕГИСТРИРОВАТЬСЯ
        </button>
        <div className={styles.SignIn}>
          Уже есть аккаунт?{' '}
          <a href="#/" className={styles.SignInButton}>
            Войти
          </a>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  userToken: state.userCreate.user,
  regFailed: state.signIn.error,
})

const mapDispatchToProps = (dispatch) => ({
  createUser: (username, password, firstName, patronymic, lastName, phone, email) =>
    dispatch(createUser(username, password, firstName, patronymic, lastName, phone, email)),
  createJWT: (username, password) => dispatch(createJWT(username, password)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
