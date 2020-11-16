/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import styles from '../styles/App.module.css'
import MainPage from './MainPage'
import SignUp from './SignUp.js'
import SignIn from './SignIn.js'
import RegisteredPart from './RegisteredPart'

// eslint-disable-next-line
function App() {
  const [userReg, setUserReg] = useState(localStorage.getItem('userReg'))
  return (
    <div className={styles.App}>
      <HashRouter>
        {!userReg && (
          <Route exact path="/">
            <MainPage />
          </Route>
        )}
        {!userReg && (
          <Route exact path="/sign-up">
            <SignUp setUserReg={setUserReg} />
          </Route>
        )}
        {!userReg && (
          <Route exact path="/sign-in">
            <SignIn setUserReg={setUserReg} />
          </Route>
        )}
        {userReg && <RegisteredPart />}
      </HashRouter>
    </div>
  )
}

export default App
