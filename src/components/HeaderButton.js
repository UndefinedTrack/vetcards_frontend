import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/HeaderButton.module.css'

function HeaderButton({ buttonName, buttonStyles, header }) {
  function reload() {
    window.location.href = header
    if (header === '#/mypets') {
      window.location.reload()
    }
  }

  return (
    <div>
      {buttonStyles === 'enabled' && (
        <button type="button" onClick={reload} className={`${styles.Enabled} ${styles.Button}`}>
          <p>{buttonName}</p>
        </button>
      )}
      {buttonStyles === 'disabled' && (
        <button type="button" onClick={reload} className={`${styles.Disabled} ${styles.Button}`}>
          <p>{buttonName}</p>
        </button>
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
