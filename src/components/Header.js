import React from 'react'
import PropTypes from 'prop-types'
import HeaderButton from './HeaderButton'
import styles from '../styles/Header.module.css'

function Header({ header, isVet }) {
  let myPetStyles = 'disabled'
  let profileStyles = 'disabled'
  let myPatientsStyles = 'disabled'
  let scheduleStyles = 'disabled'
  let mailingStyles = 'disabled'

  if (header === 'my-acc') {
    myPatientsStyles = 'enabled'
    myPetStyles = 'enabled'
  } else if (header === 'profile') {
    profileStyles = 'enabled'
  } else if (header === 'schedule') {
    scheduleStyles = 'enabled'
  } else if (header === 'mailing') {
    mailingStyles = 'enabled'
  }

  return (
    <header className={styles.Header}>
      <p className={styles.Name}>Личный кабинет</p>
      <ButtonContainer
        isVet={isVet}
        scheduleStyles={scheduleStyles}
        myPatientsStyles={myPatientsStyles}
        profileStyles={profileStyles}
        myPetStyles={myPetStyles}
        mailingStyles={mailingStyles}
      />
    </header>
  )
}

Header.propTypes = {
  header: PropTypes.string.isRequired,
  isVet: PropTypes.bool.isRequired,
}

function ButtonContainer({ isVet, scheduleStyles, myPatientsStyles, profileStyles, myPetStyles, mailingStyles }) {
  if (isVet) {
    return (
      <div className={styles.ButtonContainer}>
        {/* <HeaderButton buttonStyles={scheduleStyles} header="#/schedule" buttonName="График работы" /> */}
        <HeaderButton buttonStyles={mailingStyles} header="#/mailing" buttonName="Рассылка" />
        <HeaderButton buttonStyles={myPatientsStyles} header="#/my-acc" buttonName="Мои пациенты" />
        <HeaderButton buttonStyles={profileStyles} header="#/vetprofile" buttonName="Профиль" />
      </div>
    )
  }
  return (
    <div className={styles.ButtonContainer}>
      <HeaderButton buttonStyles={myPetStyles} header="#/my-acc" buttonName="Мои питомцы" />
      <HeaderButton buttonStyles={profileStyles} header="#/profile" buttonName="Профиль" />
    </div>
  )
}

ButtonContainer.propTypes = {
  isVet: PropTypes.bool.isRequired,
  scheduleStyles: PropTypes.string.isRequired,
  myPatientsStyles: PropTypes.string.isRequired,
  profileStyles: PropTypes.string.isRequired,
  myPetStyles: PropTypes.string.isRequired,
  mailingStyles: PropTypes.string.isRequired,
}

export default Header
