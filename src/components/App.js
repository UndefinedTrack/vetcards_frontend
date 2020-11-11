/* eslint-disable react/prop-types */
import React, { useState } from 'react'
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
import Schedule from './vet/Schedule'
import CreateSchedule from './vet/CreateSchedule'
import VisitsHistory from './vet/VisitsHistory'
import MainPage from './MainPage'
import SignUp from './SignUp.js'

function App() {
  const [input, setInput] = useState([])
  return (
    <div className={styles.App}>
      <HashRouter>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route exact path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/profile">
          <Header header="profile" isVet={false} />
          <Profile />
        </Route>
        <Route path="/mypets">
          <Header header="mypets" isVet={false} />
          <MyPets input={input} setInput={setInput} />
        </Route>
        <Route path="/mypatients">
          <Header header="mypatients" isVet />
          <MyPatients />
        </Route>
        <Route path="/create-pet">
          <PopUpHeader header="Добавление питомца" link="#/mypets" isVet={false} />
          <PetCreator />
        </Route>
        <Route path="/diary/:pid">
          <PopUpHeader header="Дневник питомца" link="#/mypets" isVet={false} />
          <Diary />
        </Route>
        <Route path="/vetprofile">
          <Header header="profile" isVet />
          <Profile />
        </Route>
        <Route path="/schedule">
          <Header header="schedule" isVet />
          <Schedule />
        </Route>
        <Route path="/create-schedule">
          <PopUpHeader header="Настройка графика работы" link="#/schedule" isVet />
          <CreateSchedule />
        </Route>
        <Route path="/visits-history/:pid">
          <PopUpHeader header="История приемов" link="#/mypatients" isVet />
          <VisitsHistory />
        </Route>
      </HashRouter>
    </div>
  )
}

const mapStateToProps = (state) => ({
  profileInfo: state.profile.profile,
})

export default connect(mapStateToProps, null)(App)
