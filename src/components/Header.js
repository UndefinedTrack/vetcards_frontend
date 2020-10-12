import React from 'react'
import PropTypes from 'prop-types'
import HeaderButton from './HeaderButton'
import styles from '../styles/Header.module.css'

function Header({ header, isVet }) {
  let myPetStyles = 'disabled'
  let profileStyles = 'disabled'
  let myPatientsStyles = 'disabled'

  if (header === 'mypets') {
    myPetStyles = 'enabled'
  } else if (header === 'profile') {
    profileStyles = 'enabled'
  } else if (header === 'mypatients') {
    myPatientsStyles = 'enabled'
  }

  return (
    <header className={styles.Header}>
      <p className={styles.Name}>Личный кабинет</p>
      <div className={styles.ButtonContainer}>
        {!isVet && <HeaderButton buttonStyles={myPetStyles} buttonName="Мои питомцы" />}
        {isVet && <HeaderButton buttonStyles={myPatientsStyles} buttonName="Мои пациенты" />}
        <HeaderButton buttonStyles={profileStyles} buttonName="Профиль" />
      </div>
    </header>
  )
}

Header.propTypes = {
  header: PropTypes.string.isRequired,
  isVet: PropTypes.bool.isRequired,
}

export default Header
