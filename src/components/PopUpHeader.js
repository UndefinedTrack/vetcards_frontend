import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/Header.module.css'
import { ReactComponent as BackButton } from '../icons/back_button.svg'

function PopUpHeader({ header, link }) {
  function reload() {
    window.location.href = link
    window.location.reload()
  }
  return (
    <header className={styles.Header}>
      <div className={styles.PopUpHeader}>
        <button type="button" className={styles.NotPetButton} onClick={reload}>
          <BackButton className={styles.BackButton} />
          <div className={`${styles.Name} ${styles.PopUpName}`}>{header}</div>
        </button>
      </div>
    </header>
  )
}

PopUpHeader.propTypes = {
  header: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
}

export default PopUpHeader
