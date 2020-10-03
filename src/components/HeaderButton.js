import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from '../styles/HeaderButton.module.css'

function HeaderButton({ buttonName, myPetStyles, profileStyles }) {
  let nameHeader
  if (buttonName === 'Мои питомцы') {
    nameHeader = 'mypets'
    if (myPetStyles === 'enabled') {
      return (
        <Link to={nameHeader} className={styles.Enabled}>
          <p>{buttonName}</p>
        </Link>
      )
    }
    return (
      <Link to={nameHeader} className={styles.Disabled}>
        <p>{buttonName}</p>
      </Link>
    )
  }
  if (buttonName === 'Профиль') {
    nameHeader = 'profile'
    if (profileStyles === 'enabled') {
      return (
        <Link to={nameHeader} className={styles.Enabled}>
          <p>{buttonName}</p>
        </Link>
      )
    }
    return (
      <Link to={nameHeader} className={styles.Disabled}>
        <p>{buttonName}</p>
      </Link>
    )
  }
}

HeaderButton.propTypes = {
  buttonName: PropTypes.string.isRequired,
  myPetStyles: PropTypes.string,
  profileStyles: PropTypes.string,
}

export default HeaderButton
