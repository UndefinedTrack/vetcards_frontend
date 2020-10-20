/* eslint-disable react/prop-types */
import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Profile from './Profile'
import MyPets from './MyPets'
import Header from './Header'
import MyPatients from './vet/MyPatients'
import styles from '../styles/App.module.css'
import PopUpHeader from './PopUpHeader'
import PetCreator from './PetCreator'
import Diary from './pet/Diary'
// import { getUserProfileInfo } from '../actions/profile'

function App({ profileInfo }) {
  return (
    <div className={styles.App}>
      <HashRouter>
        <Route exact path="/">
          <h1>Пользуйтесь нашим великолепным сервисом!</h1>
        </Route>
        <Route path="/profile">
          <Header header="profile" isVet={false} />
          <Profile />
        </Route>
        <Route path="/mypets">
          <Header header="mypets" isVet={false} />
          <MyPets />
        </Route>
        <Route path="/mypatients">
          <Header header="mypatients" isVet={false} />
          <MyPatients />
        </Route>
        <Route path="/create-pet">
          <PopUpHeader header="Добавление питомца" isVet={false} />
          <PetCreator />
        </Route>
        <Route path="/diary">
          <PopUpHeader header="Дневник питомца" isVet={false} />
          <Diary />
        </Route>
      </HashRouter>
    </div>
  )
}

const mapStateToProps = (state) => ({
  profileInfo: state.profile.profile,
})

export default connect(mapStateToProps, null)(App)
