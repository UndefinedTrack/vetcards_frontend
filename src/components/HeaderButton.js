import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from '../styles/HeaderButton.module.css'

function HeaderButton({ buttonName, buttonStyles, header }) {
  if ((header === 'profile') || (header === 'vetprofile')) {
    return (
      <ProfileButton
        buttonName={buttonName}
        buttonStyles={buttonStyles}
        header={header}
      />
    )
  }
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

function ProfileButton({ header, buttonStyles }) {
  const [isVisible, setIsVisible] = useState(false)

  function handleClick() {
    setIsVisible(!isVisible)
  }

  if (buttonStyles === 'enabled') {
    return (
      <div>
        <div
          role='button'
          onClick={handleClick}
          onKeyDown={handleClick}
          tabIndex='0'
          className={`${styles.Enabled} ${styles.Button}`}
        >
          <p>Профиль</p>
        </div>
        <DropDownList
          isVisible={isVisible}
          header={header}
          handleClick={handleClick}
        />
      </div>
    )
  }
  return (
    <div>
      <div
          role='button'
          onClick={handleClick}
          onKeyDown={handleClick}
          tabIndex='0'
          className={`${styles.Disabled} ${styles.Button}`}
        >
        <p>Профиль</p>
      </div>
      <DropDownList
        isVisible={isVisible}
        header={header}
        handleClick={handleClick}
      />
    </div>
  )
}

ProfileButton.propTypes = {
  header: PropTypes.string.isRequired,
  buttonStyles: PropTypes.string.isRequired,
}

function DropDownList({ isVisible, handleClick, header }) {
  if (isVisible) {
    return (
      <div className={styles.optionsBox}>
        <Link to={header} className={styles.option}>
          <p>Редактировать</p>
        </Link>
        <div
          role='button'
          tabIndex='0'
          onKeyDown={handleClick}
          onClick={handleClick}
          className={styles.option}
        >
          Выйти
        </div>
      </div>
    )
  }
  return null
}

DropDownList.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
}

export default HeaderButton
