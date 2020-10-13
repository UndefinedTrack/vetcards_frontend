import React from 'react'
// import PropTypes from 'prop-types'
import styles from '../styles/Header.module.css'
import { ReactComponent as BackButton } from '../icons/back_button.svg'

function PopUpHeader() {
  return (
    <header className={styles.Header}>
      <div className={styles.PopUpHeader}>
        <a href="#/mypets" className={styles.NotPetButton}>
          <BackButton className={styles.BackButton} />
        </a>
        <div className={styles.Name}>Добавление питомца</div>
      </div>
    </header>
  )
}

export default PopUpHeader
