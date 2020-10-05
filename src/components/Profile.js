import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/Profile.module.css'

export default function Profile() {
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [patronymic, setPatronymic] = useState('')
  const [mobilePhone, setMobilePhone] = useState('')
  const [email, setEmail] = useState('')

  function handleLastNameChange(event) {
    setLastName(event.target.value)
  }

  function handleFirstNameChange(event) {
    setFirstName(event.target.value)
  }

  function handlePatronymicChange(event) {
    setPatronymic(event.target.value)
  }

  function handleMobilePhoneChange(event) {
    setMobilePhone(event.target.value)
  }

  function handleEmailChange(event) {
    setEmail(event.target.value)
  }

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
              handleLastNameChange={handleLastNameChange}
              handleSubmit={handleSubmit}
              lastName={lastName}
            />
            <FirstName
              handleFirstNameChange={handleFirstNameChange}
              handleSubmit={handleSubmit}
              firstName={firstName}
            />
            <Patronymic
              handlePatronymicChange={handlePatronymicChange}
              handleSubmit={handleSubmit}
              patronymic={patronymic}
            />
          </div>
          <div className={styles.fieldsColumn}>
            <MobilePhone
              handleMobilePhoneChange={handleMobilePhoneChange}
              handleSubmit={handleSubmit}
              mobilePhone={mobilePhone}
            />
            <Email
              handleEmailChange={handleEmailChange}
              handleSubmit={handleSubmit}
              email={email}
            />
            <p className={styles.noteText}>* - обязательные для заполнения поля</p>
          </div>          
        </form>
        <button
         type='button'
         className={styles.saveButton}
        >
          Сохранить
        </button>
      </div>
    </div>
  )
}

function ChangeAvatar(props) {
	return (
    <div className={styles.avatarWrapper}>
      <div className={styles.avatarSample}/>
      <button
        type='button'
        className={styles.changeAvatar}
      >
        Изменить фото
      </button>
    </div>
	)
}

function LastName({ handleLastNameChange, lastName }) {
	return (
		<div>
			<p className={styles.text}>Фамилия <span className={styles.noteText}>*</span></p>
			<input
				type='text'
				className={styles.input}
				onChange={handleLastNameChange}
				value={lastName}
				placeholder='Иванов'
			/>
		</div>
	)
}

LastName.propTypes = {
	handleLastNameChange: PropTypes.func.isRequired,
	lastName: PropTypes.string.isRequired,
}

function FirstName({ handleFirstNameChange, firstName }) {
	return (
		<div>
			<p className={styles.text}>Имя <span className={styles.noteText}>*</span></p>
			<input
				type='text'
				className={styles.input}
				onChange={handleFirstNameChange}
				value={firstName}
				placeholder='Иван'
			/>
		</div>
	)
}

FirstName.propTypes = {
	handleFirstNameChange: PropTypes.func.isRequired,
	firstName: PropTypes.string.isRequired,
}

function Patronymic({ handlePatronymicChange, patronymic }) {
	return (
		<div>
			<p className={styles.text}>Отчество</p>
			<input
				type='text'
				className={styles.input}
				onChange={handlePatronymicChange}
				value={patronymic}
				placeholder='Иванович'
			/>
		</div>
	)
}

Patronymic.propTypes = {
	handlePatronymicChange: PropTypes.func.isRequired,
	patronymic: PropTypes.string.isRequired,
}

function MobilePhone({ handleMobilePhoneChange, mobilePhone }) {
	return (
		<div>
			<p className={styles.text}>Номер мобильного телефона <span className={styles.noteText}>*</span></p>
			<input
				type='text'
				className={styles.input}
				onChange={handleMobilePhoneChange}
				value={mobilePhone}
				placeholder='+79990000000'
			/>
		</div>
	)
}

MobilePhone.propTypes = {
	handleMobilePhoneChange: PropTypes.func.isRequired,
	mobilePhone: PropTypes.string.isRequired,
}

function Email({ handleEmailChange, email }) {
	return (
		<div>
			<p className={styles.text}>Адрес электронной почты</p>
			<input
				type='text'
				className={styles.input}
				onChange={handleEmailChange}
				value={email}
				placeholder='example@gmail.com'
			/>
		</div>
	)
}

Email.propTypes = {
	handleEmailChange: PropTypes.func.isRequired,
	email: PropTypes.string.isRequired,
}
