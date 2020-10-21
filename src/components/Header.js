import React from 'react'
import PropTypes from 'prop-types'
import HeaderButton from './HeaderButton'
import styles from '../styles/Header.module.css'

function Header({ header, isVet }) {
  isVet = true
  let myPetStyles = 'disabled'
  let profileStyles = 'disabled'
  let myPatientsStyles = 'disabled'
  let scheduleStyles = 'disabled'

  if (header === 'mypets') {
    myPetStyles = 'enabled'
  } else if (header === 'profile') {
    profileStyles = 'enabled'
  } else if (header === 'mypatients') {
    myPatientsStyles = 'enabled'
  } else if (header === 'schedule') {
    scheduleStyles = 'enabled'
  }

  return (
    <header className={styles.Header}>
      <p className={styles.Name}>Личный кабинет</p>
      <div className={styles.ButtonContainer}>
        {!isVet && <HeaderButton buttonStyles={myPetStyles} header="mypets" buttonName="Мои питомцы" />}
        {isVet && <HeaderButton buttonStyles={scheduleStyles} header="schedule" buttonName="График работы" />}
        {isVet && <HeaderButton buttonStyles={myPatientsStyles} header="mypatients" buttonName="Мои пациенты" />}
        <HeaderButton buttonStyles={profileStyles} header="profile" buttonName="Профиль" />
      </div>
    </header>
  )
}

Header.propTypes = {
  header: PropTypes.string.isRequired,
  isVet: PropTypes.bool.isRequired,
}

export default Header
