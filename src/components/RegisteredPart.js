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
import EditClientInformation from './vet/EditClientInformation'
import Mailing from './vet/Mailing'

// eslint-disable-next-line
function RegisteredPart({ userInfo, getMe, profileInfo, getProfileInfo, refreshJWT, loginFailed, loading }) {
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
      getProfileInfo(userInfo.userId, token)
      setTimeout(() => {
        refreshJWT(localStorage.getItem('refresh'))
      }, 60000 * 4)
    }
  }, [userInfo, uid, getMe, getProfileInfo, refreshJWT, token])

  if (profileInfo)
    if (userInfo.access !== '' && userInfo.access !== undefined) {
      localStorage.setItem('token', userInfo.access)
    }

  if (!loading && profileInfo.userId !== -1) {
    if (!isVet) {
      return (
        <div className={styles.App}>
          <HashRouter>
            <Route path="/profile">
              <Header header="profile" isVet={isVet} />
              <Profile uid={uid} />
            </Route>
            <Route path="/my-acc">
              <Header header="my-acc" isVet={isVet} />
              <MyPets uid={uid} />
            </Route>
            <Route path="/create-pet">
              <PopUpHeader header="Добавление питомца" link="#/my-acc" isVet={isVet} />
              <PetCreator uid={uid} />
            </Route>
            <Route path="/diary/:pid">
              <PopUpHeader header="Дневник питомца" link="#/my-acc" isVet={isVet} />
              <Diary uid={uid} />
            </Route>
          </HashRouter>
        </div>
      )
    }
    if (isVet) {
      return (
        <div className={styles.App}>
          <HashRouter>
            <Route path="/my-acc">
              <Header header="my-acc" isVet={isVet} />
              <MyPatients uid={uid} />
            </Route>
            <Route path="/vetprofile">
              <Header header="profile" isVet={isVet} />
              <Profile uid={uid} />
            </Route>
            <Route path="/schedule">
              <Header header="schedule" isVet={isVet} />
              <Schedule uid={uid} />
            </Route>
            <Route path="/create-schedule">
              <PopUpHeader header="Настройка графика работы" link="#/schedule" isVet={isVet} />
              <CreateSchedule uid={uid} />
            </Route>
            <Route path="/visits-history/:pid">
              <PopUpHeader header="История приемов" link="#/my-acc" isVet={isVet} />
              <VisitsHistory uid={uid} isVet />
            </Route>
            <Route path="/edit-client-information/:cid">
              <PopUpHeader header="Информация о клиенте" link="#/my-acc" isVet={isVet} />
              <EditClientInformation uid={uid} />
            </Route>
            <Route path="/new-pet/:cid">
              <PopUpHeader header="Новый питомец" link="#/my-acc" isVet={isVet} />
              <PetCreator uid={0} />
            </Route>
            <Route path="/mailing">
              <Header header="mailing" isVet={isVet} />
              <Mailing uid={uid} />
            </Route>
          </HashRouter>
        </div>
      )
    }
  }
  return null
}

const mapStateToProps = (state) => ({
  userInfo: state.signIn.user,
  loginFailed: state.signIn.error,
  loading: state.signIn.loading,
  profileInfo: state.profile.profile,
})

const mapDispatchToProps = (dispatch) => ({
  getMe: (token) => dispatch(getMe(token)),
  getProfileInfo: (uid, token) => dispatch(getUserProfileInfo(uid, token)),
  refreshJWT: (refresh) => dispatch(refreshJWT(refresh)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisteredPart)
