import React, { useState } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import styles from '../styles/App.module.css'
import SignIn from './SignIn.js'
import RegisteredPart from './RegisteredPart'
import VetPage from './mainPage/VetPage'
import ContactsPage from './mainPage/ContactsPage'
import ClientPage from './mainPage/ClientPage'
import Header from './mainPage/Header'

function App() {
  const [userReg, setUserReg] = useState(localStorage.getItem('userReg'))
  const [signInUp, setSignInUp] = useState(false)
  if (!userReg) {
    window.location.href = '#/'
  }

  return (
    <div className={styles.App}>
      <HashRouter>
        {signInUp && <SignIn setUserReg={setUserReg} setSignInUp={setSignInUp} />}
        {!userReg && (
          <Route exact path="/">
            <Header header="/" setSignInUp={setSignInUp} signInUp={signInUp} />
            <VetPage />
          </Route>
        )}
        {!userReg && (
          <Route exact path="/clients">
            <Header header="/clients" setSignInUp={setSignInUp} signInUp={signInUp} />
            <ClientPage setUserReg={setUserReg} />
          </Route>
        )}
        {!userReg && (
          <Route exact path="/contacts">
            <Header header="/contacts" setSignInUp={setSignInUp} signInUp={signInUp} />
            <ContactsPage />
          </Route>
        )}
        {userReg && <RegisteredPart />}
      </HashRouter>
    </div>
  )
}

export default App
