import React from 'react'
import PropTypes from 'prop-types'
import HeaderButton from './HeaderButton'
import styles from '../styles/Header.module.css'

function Header({ header }) {
  let myPetStyles = ''
  let profileStyles = ''
  if (header === 'myPets') {
    myPetStyles = 'enabled'
    profileStyles = 'disabled'
  } else {
    myPetStyles = 'disabled'
    profileStyles = 'enabled'
  }
  return (
    <header className={styles.Header}>
      <p className={styles.Name}>Личный кабинет</p>
      <div className={styles.ButtonContainer}>
        <HeaderButton header={header} myPetStyles={myPetStyles} buttonName="Мои питомцы" />
        <HeaderButton header={header} profileStyles={profileStyles} buttonName="Профиль" />
      </div>
    </header>
  )
}

Header.propTypes = {
  header: PropTypes.string.isRequired,
}

export default Header
