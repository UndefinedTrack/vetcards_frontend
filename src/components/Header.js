import React from 'react'
import HeaderButton from './HeaderButton'
import styles from '../styles/Header.module.css'

function Header() {
  return (
    <header className={styles.Header}>
      <p className={styles.Name}>Личный кабинет</p>
      <div className={styles.ButtonContainer}>
        <HeaderButton header="Мои питомцы" />
        <HeaderButton header="Профиль" />
      </div>
    </header>
  )
}

export default Header
