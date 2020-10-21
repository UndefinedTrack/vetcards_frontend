import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from '../styles/HeaderButton.module.css'

function HeaderButton({ buttonName, buttonStyles, header }) {
  return (
    <div>
      {buttonStyles === 'enabled' && (
        <Link to={header} className={`${styles.Enabled} ${styles.Button}`}>
          <p>{buttonName}</p>
        </Link>
      )}
      {buttonStyles === 'disabled' && (
        <Link to={header} className={`${styles.Disabled} ${styles.Button}`}>
          <p>{buttonName}</p>
        </Link>
      )}
    </div>
  )
}

HeaderButton.propTypes = {
  buttonName: PropTypes.string.isRequired,
  buttonStyles: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
}

export default HeaderButton
