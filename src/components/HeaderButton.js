import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/HeaderButton.module.css'

function HeaderButton({ buttonName, buttonStyles, header }) {
  function reload() {
    window.location.href = header
    if (header === '#/mypets') {
      window.location.reload()
    }
  }

  if ((header === '#/profile') || (header === '#/vetprofile')) {
    return (
      <ProfileButton
        buttonName={buttonName}
        buttonStyles={buttonStyles}
        header={header}
        reload={reload}
      />
    )
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

function ProfileButton({ header, buttonStyles, reload }) {
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
          reload={reload}
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
        reload={reload}
      />
    </div>
  )
}

ProfileButton.propTypes = {
  header: PropTypes.string.isRequired,
  buttonStyles: PropTypes.string.isRequired,
  reload: PropTypes.func.isRequired,
}

function DropDownList({ isVisible, handleClick, header, reload }) {
  if (isVisible) {
    return (
      <div className={styles.optionsBox}>
        <button type='button' onClick={reload} className={styles.option}>
          <p className={styles.optionText}>Редактировать</p>
        </button>
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
  reload: PropTypes.func.isRequired,
}

export default HeaderButton
