import React from 'react'
import PropTypes from 'prop-types'
import HeaderButton from './HeaderButton'
import styles from '../../styles/mainPage/MainPageHeader.module.css'

function Header({ header }) {
  let vet = 'disabled'
  let clients = 'disabled'
  let contacts = 'disabled'

  if (header === '#/') {
    vet = 'enabled'
  } else if (header === '#/clients') {
    clients = 'enabled'
  } else if (header === '#/contacts') {
    contacts = 'enabled'
  }

  return (
    <header className={styles.MainPageHeader}>
      <p className={styles.Name}>VetCards</p>
      <div className={styles.Nav}>
        <ButtonContainer vet={vet} clients={clients} contacts={contacts} />
        <div className={styles.SignIn}>Вход</div>
        <div className={styles.SignUp}>Регистрация</div>
      </div>
    </header>
  )
}

Header.propTypes = {
  header: PropTypes.string.isRequired,
}

function ButtonContainer({ vet, clients, contacts }) {
  return (
    <div className={styles.ButtonContainer}>
      <HeaderButton buttonStyles={vet} header="#/" buttonName="Для ветеринаров" />
      <HeaderButton buttonStyles={clients} header="#/clients" buttonName="Для владельцев" />
      <HeaderButton buttonStyles={contacts} header="#/contacts" buttonName="Контакты" />
    </div>
  )
}

ButtonContainer.propTypes = {
  vet: PropTypes.string.isRequired,
  clients: PropTypes.string.isRequired,
  contacts: PropTypes.string.isRequired,
}

export default Header
