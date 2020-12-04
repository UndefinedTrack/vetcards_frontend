import React from 'react'
import PropTypes from 'prop-types'
import { HashLink } from 'react-router-hash-link'
import HeaderButton from './HeaderButton'
import styles from '../../styles/mainPage/MainPageHeader.module.css'

function Header({ header, setSignInUp, signInUp }) {
  let vet = 'disabled'
  let clients = 'disabled'
  let contacts = 'disabled'

  if (header === '/') {
    vet = 'enabled'
  } else if (header === '/clients') {
    clients = 'enabled'
  } else if (header === '/contacts') {
    contacts = 'enabled'
  }

  function signInForm() {
    setSignInUp(!signInUp)
  }

  const hashLink = React.useRef(null)

  function handleButtonClick() {
    if (hashLink.current) {
      hashLink.current.click()
    }
  }

  return (
    <header className={styles.MainPageHeader}>
      <p className={styles.MiniName}>VCards</p>
      <p className={styles.Name}>VetCards</p>
      <div className={styles.Nav}>
        <ButtonContainer vet={vet} clients={clients} contacts={contacts} />
        <div className={styles.SignButtons}>
          <button type="button" className={styles.SignIn} onClick={signInForm}>
            Вход
          </button>
          <button type="button" className={styles.SignUp} onClick={handleButtonClick}>
            Регистрация
          </button>
        </div>
        <HashLink smooth to="/clients/#form" ref={hashLink} />
      </div>
    </header>
  )
}

Header.propTypes = {
  header: PropTypes.string.isRequired,
  setSignInUp: PropTypes.func.isRequired,
  signInUp: PropTypes.bool.isRequired,
}

function ButtonContainer({ vet, clients, contacts }) {
  return (
    <div className={styles.ButtonContainer}>
      <HeaderButton buttonStyles={vet} header="/" buttonName="Для ветеринаров" />
      <HeaderButton buttonStyles={clients} header="/clients" buttonName="Для владельцев" />
      <div className={styles.ContactButton}>
        <HeaderButton buttonStyles={contacts} header="/contacts" buttonName="Контакты" />
      </div>
    </div>
  )
}

ButtonContainer.propTypes = {
  vet: PropTypes.string.isRequired,
  clients: PropTypes.string.isRequired,
  contacts: PropTypes.string.isRequired,
}

export default Header
