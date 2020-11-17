import React from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/mainPage/MainPageHeader.module.css'

function HeaderButton({ buttonName, buttonStyles, header }) {
  return (
    <div>
      {buttonStyles === 'enabled' && (
        <a href={header} className={`${styles.Enabled} ${styles.Button}`}>
          <p>{buttonName}</p>
        </a>
      )}
      {buttonStyles === 'disabled' && (
        <a href={header} className={`${styles.Disabled} ${styles.Button}`}>
          <p>{buttonName}</p>
        </a>
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
