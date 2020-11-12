import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createJWT } from '../actions/userCreate.js'
import styles from '../styles/SignUp.module.css'

// eslint-disable-next-line
function SignIn({ userToken, createJWT, setUserReg }) {
  let wrong = false
  const [state, setState] = useState({
    username: '',
    password: '',
  })
  // eslint-disable-next-line
  if (userToken && userToken.detail !== undefined) {
    wrong = true
  }
  // eslint-disable-next-line
  if (userToken && userToken.access !== undefined) {
    wrong = false
    localStorage.setItem('userReg', true)
    setUserReg(true)
    window.location.href = '#/my-acc'
  }

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
    createJWT(state.username, state.password)
  }

  if (userToken !== null && userToken !== undefined) {
    // eslint-disable-next-line
    localStorage.setItem('token', userToken.access)
    // eslint-disable-next-line
    localStorage.setItem('refresh', userToken.refresh)
  }

  return (
    <div className={styles.Container}>
      <form className={`${styles.SignUpForm} ${styles.SignInContainer}`} onSubmit={submitHandler}>
        <div className={styles.FormName}>Вход</div>
        <input
          required
          name="username"
          placeholder="Логин"
          maxLength="30"
          title="Логин должен содержать от 3 символов"
          pattern=".{3,30}"
          className={`${styles.FormInput} ${styles.FormInputIn}`}
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
            className={`${styles.FormInput} ${styles.FormInputIn}`}
            onChange={changeInputHandler}
          />
        </div>
        {wrong && <div className={styles.WrongLogOrPassw}>Неверный логин или пароль</div>}
        <button type="submit" id="submit" className={`${styles.SubmitButton} ${styles.SubmitSignIn}`}>
          ВОЙТИ
        </button>
      </form>
      <div className={styles.SignIn}>
        Нет аккаунта?{' '}
        <a href="#/sign-up" className={styles.SignInButton}>
          Зарегистрироваться
        </a>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  userToken: state.userCreate.user,
})

const mapDispatchToProps = (dispatch) => ({
  createJWT: (username, password) => dispatch(createJWT(username, password)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
