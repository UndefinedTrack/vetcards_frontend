/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from '../styles/Profile.module.css'
import { getUserProfileInfo } from '../actions/profile'

function Profile({ profileInfo, getProfileInfo }) {
  const uid = 2
  if (profileInfo === undefined) {
    profileInfo = []
    getProfileInfo(uid)
  }

  // const [lastName, setLastName] = useState('')
  // const [firstName, setFirstName] = useState('')
  const [patronymic, setPatronymic] = useState('')
  // const [mobilePhone, setMobilePhone] = useState('')
  // const [email, setEmail] = useState('')

  useEffect(() => {
    if (profileInfo.userId === -1) {
      getProfileInfo(uid)
    }
    // eslint-disable-next-line
  }, [getProfileInfo])

  // function handleLastNameChange(event) {
  //   setLastName(event.target.value)
  // }

  // function handleFirstNameChange(event) {
  //   setFirstName(event.target.value)
  // }

  function handlePatronymicChange(event) {
    setPatronymic(event.target.value)
  }

  // function handleMobilePhoneChange(event) {
  //   setMobilePhone(event.target.value)
  // }

  // function handleEmailChange(event) {
  //   setEmail(event.target.value)
  // }

  function handleSubmit(event) {
    event.preventDefault()
  }
  return (
    <div className={styles.profileSpace}>
      <div className={styles.profileWrapper}>
        <form onSubmit={handleSubmit} className={styles.formSpace}>
          <ChangeAvatar />
          <div className={styles.fieldsColumn}>
            <LastName
              // handleLastNameChange={handleLastNameChange}
              handleSubmit={handleSubmit}
              lastName={profileInfo.lastName}
            />
            <FirstName
              // handleFirstNameChange={handleFirstNameChange}
              handleSubmit={handleSubmit}
              firstName={profileInfo.firstName}
            />
            <Patronymic
              handlePatronymicChange={handlePatronymicChange}
              handleSubmit={handleSubmit}
              patronymic={patronymic}
            />
          </div>
          <div className={styles.fieldsColumn}>
            <MobilePhone
              // handleMobilePhoneChange={handleMobilePhoneChange}
              handleSubmit={handleSubmit}
              mobilePhone={profileInfo.phone}
            />
            <Email
              // handleEmailChange={handleEmailChange}
              handleSubmit={handleSubmit}
              email={profileInfo.email}
            />
            <p className={styles.noteText}>* - обязательные для заполнения поля</p>
          </div>
        </form>
        <button type="button" className={styles.saveButton}>
          Сохранить
        </button>
      </div>
    </div>
  )
}

function ChangeAvatar(props) {
  return (
    <div className={styles.avatarWrapper}>
      <div className={styles.avatarSample} />
      <button type="button" className={styles.changeAvatar}>
        Изменить фото
      </button>
    </div>
  )
}

function LastName({ handleLastNameChange, lastName }) {
  return (
    <div>
      <p className={styles.text}>
        Фамилия <span className={styles.noteText}>*</span>
      </p>
      <input
        type="text"
        className={styles.input}
        onChange={handleLastNameChange}
        defaultValue={lastName}
        placeholder="Иванов"
      />
    </div>
  )
}

LastName.propTypes = {
  // handleLastNameChange: PropTypes.func.isRequired,
  lastName: PropTypes.string.isRequired,
}

function FirstName({ handleFirstNameChange, firstName }) {
  return (
    <div>
      <p className={styles.text}>
        Имя <span className={styles.noteText}>*</span>
      </p>
      <input
        type="text"
        className={styles.input}
        onChange={handleFirstNameChange}
        defaultValue={firstName}
        placeholder="Иван"
      />
    </div>
  )
}

FirstName.propTypes = {
  // handleFirstNameChange: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
}

function Patronymic({ handlePatronymicChange, patronymic }) {
  return (
    <div>
      <p className={styles.text}>Отчество</p>
      <input
        type="text"
        className={styles.input}
        onChange={handlePatronymicChange}
        defaultValue={patronymic}
        placeholder="Иванович"
      />
    </div>
  )
}

Patronymic.propTypes = {
  // handlePatronymicChange: PropTypes.func.isRequired,
  patronymic: PropTypes.string.isRequired,
}

function MobilePhone({ handleMobilePhoneChange, mobilePhone }) {
  return (
    <div>
      <p className={styles.text}>
        Номер мобильного телефона <span className={styles.noteText}>*</span>
      </p>
      <input
        type="text"
        className={styles.input}
        onChange={handleMobilePhoneChange}
        defaultValue={mobilePhone}
        placeholder="+79990000000"
      />
    </div>
  )
}

MobilePhone.propTypes = {
  // handleMobilePhoneChange: PropTypes.func.isRequired,
  mobilePhone: PropTypes.string.isRequired,
}

function Email({ handleEmailChange, email }) {
  return (
    <div>
      <p className={styles.text}>
        Адрес электронной почты
        <span className={styles.noteText}>*</span>
      </p>
      <input
        type="text"
        className={styles.input}
        onChange={handleEmailChange}
        defaultValue={email}
        placeholder="example@gmail.com"
      />
    </div>
  )
}

Email.propTypes = {
  // handleEmailChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  profileInfo: state.profile.profile,
})

const mapDispatchToProps = (dispatch) => ({
  getProfileInfo: (uid) => dispatch(getUserProfileInfo(uid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
