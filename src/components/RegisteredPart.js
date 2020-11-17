/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { getMe, refreshJWT } from '../actions/signIn.js'
import { getUserProfileInfo } from '../actions/profile.js'
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

// eslint-disable-next-line
function RegisteredPart({ userInfo, getMe, profileInfo, getProfileInfo, refreshJWT, loginFailed }) {
  const token = localStorage.getItem('token')

  if (userInfo.userId === undefined) userInfo.userId = -1
  if (profileInfo === undefined) profileInfo = []
  const uid = userInfo.userId
  const isVet = profileInfo.vet

  if (loginFailed === 'Unauthorized') {
    localStorage.setItem('userReg', '')
    window.location.href = '#/'
    window.location.reload()
  }

  useEffect(() => {
    if (uid === -1) {
      setTimeout(() => getMe(token), 100)
    } else {
      setTimeout(() => getProfileInfo(userInfo.userId, token), 100)
      setTimeout(() => {
        refreshJWT(localStorage.getItem('refresh'))
      }, 6000 * 14)
    }
    // eslint-disable-next-line
  }, [userInfo, uid])

  if (profileInfo)
    if (userInfo.access !== '' && userInfo.access !== undefined) {
      localStorage.setItem('token', userInfo.access)
    }

  return (
    <div className={styles.App}>
      <HashRouter>
        {!isVet && (
          <Route path="/profile">
            <Header header="profile" isVet={isVet} />
            <Profile uid={uid} />
          </Route>
        )}
        {!isVet && (
          <Route path="/my-acc">
            <Header header="my-acc" isVet={isVet} />
            <MyPets uid={uid} />
          </Route>
        )}
        {isVet && (
          <Route path="/my-acc">
            <Header header="my-acc" isVet={isVet} />
            <MyPatients uid={uid} />
          </Route>
        )}
        {!isVet && (
          <Route path="/create-pet">
            <PopUpHeader header="Добавление питомца" link="#/my-acc" isVet={isVet} />
            <PetCreator uid={uid} />
          </Route>
        )}
        {!isVet && (
          <Route path="/diary/:pid">
            <PopUpHeader header="Дневник питомца" link="#/my-acc" isVet={isVet} />
            <Diary uid={uid} />
          </Route>
        )}
        {isVet && (
          <Route path="/vetprofile">
            <Header header="profile" isVet={isVet} />
            <Profile uid={uid} />
          </Route>
        )}
        {isVet && (
          <Route path="/schedule">
            <Header header="schedule" isVet={isVet} />
            <Schedule uid={uid} />
          </Route>
        )}
        {isVet && (
          <Route path="/create-schedule">
            <PopUpHeader header="Настройка графика работы" link="#/schedule" isVet={isVet} />
            <CreateSchedule uid={uid} />
          </Route>
        )}
        {isVet && (
          <Route path="/visits-history/:pid">
            <PopUpHeader header="История приемов" link="#/my-acc" isVet={isVet} />
            <VisitsHistory uid={uid} />
          </Route>
        )}
      </HashRouter>
    </div>
  )
}

const mapStateToProps = (state) => ({
  userInfo: state.signIn.user,
  loginFailed: state.signIn.error,
  profileInfo: state.profile.profile,
})

const mapDispatchToProps = (dispatch) => ({
  getMe: (token) => dispatch(getMe(token)),
  getProfileInfo: (uid, token) => dispatch(getUserProfileInfo(uid, token)),
  refreshJWT: (refresh) => dispatch(refreshJWT(refresh)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisteredPart)
