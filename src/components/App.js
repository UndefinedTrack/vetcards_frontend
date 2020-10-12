import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import Profile from './Profile'
import MyPets from './MyPets'
import Header from './Header'
import MyPatients from './vet/MyPatients'
import styles from '../styles/App.module.css'

function App() {
  return (
    <div className={styles.App}>
      <HashRouter>
        <Route exact path="/">
          <h1>Пользуйтесь нашим великолепным сервисом!</h1>
        </Route>
        <Route path="/profile">
          <Header header="profile" />
          <Profile />
        </Route>
        <Route path="/mypets">
          <Header header="myPets" />
          <MyPets />
        </Route>
        <Route path="/mypatients">
          <Header header="profile" />
          <MyPatients />
        </Route>
      </HashRouter>
    </div>
  )
}

export default App
