import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from '../styles/HeaderButton.module.css'

function HeaderButton({ buttonName, buttonStyles }) {
  let nameHeader
  if (buttonName === 'Мои питомцы') {
    nameHeader = 'mypets'
  } else if (buttonName === 'Профиль') {
    nameHeader = 'profile'
  } else if (buttonName === 'Мои пациенты') {
    nameHeader = 'mypatients'
  }
  return (
    <div>
      {buttonStyles === 'enabled' && (
        <Link to={nameHeader} className={`${styles.Enabled} ${styles.Button}`}>
          <p>{buttonName}</p>
        </Link>
      )}
      {buttonStyles === 'disabled' && (
        <Link to={nameHeader} className={`${styles.Disabled} ${styles.Button}`}>
          <p>{buttonName}</p>
        </Link>
      )}
    </div>
  )
}

HeaderButton.propTypes = {
  buttonName: PropTypes.string.isRequired,
  buttonStyles: PropTypes.string.isRequired,
}

export default HeaderButton
