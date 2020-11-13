/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from '../styles/Profile.module.css'
import { getUserProfileInfo, updateProfileInfo } from '../actions/profile'
import { uploadUserAvatar } from '../actions/avatar'
import PopUpWindow from './PopUpWindow'

// eslint-disable-next-line
function Profile({ uid, profileInfo, getProfileInfo, uploadAvatar, updateProfileInfo }) {
  const [popUpDispl, setPopUpDispl] = useState(false)
  const token = localStorage.getItem('token')

  if (profileInfo === undefined) {
    profileInfo = []
    getProfileInfo(uid)
  }
  const [state, setState] = useState({
    firstName: '',
    patronymic: '',
    lastName: '',
    phone: '',
    email: '',
  })
  const [patronymic, setPatronymic] = useState('')

  useEffect(() => {
    if (profileInfo.userId === -1) {
      getProfileInfo(uid)
    }
    // eslint-disable-next-line
  }, [getProfileInfo])

  function changeInputHandler(event) {
    event.persist()
    setState((prev) => ({
      ...prev,
      ...{
        [event.target.name]: event.target.value,
      },
    }))
  }

  function submitHandler(event) {
    event.preventDefault()
    if (state.firstName === '') state.firstName = profileInfo.firstName
    if (state.lastName === '') state.lastName = profileInfo.lastName
    if (state.phone === '') state.phone = profileInfo.phone
    if (state.email === '') state.email = profileInfo.email
    if (state.patronymic === '') state.patronymic = profileInfo.patronymic
    // uid, firstName, patronymic, lastName, phone, email, token
    updateProfileInfo(uid, state.firstName, state.patronymic, state.lastName, state.phone, state.email, token)

    setState({
      firstName: '',
      patronymic: '',
      lastName: '',
      phone: '',
      email: '',
    })
  }

  function handlePatronymicChange(event) {
    setPatronymic(event.target.value)
  }

  function handleAvatarChange(event) {
    uploadAvatar(uid, event.target.files)
  }

  // function handleSubmit(event) {
  //   event.preventDefault()
  // }

  function popUpOpen() {
    setPopUpDispl(true)
    setTimeout(() => {
      setPopUpDispl(false)
    }, 2000)
  }

  return (
    <div className={styles.profileSpace}>
      <div className={styles.profileWrapper}>
        <form onSubmit={submitHandler}>
          <div className={styles.formSpace}>
            <ChangeAvatar handleAvatarChange={handleAvatarChange} popUpOpen={popUpOpen} />
            <div className={styles.fieldsColumn}>
              <LastName changeInputHandler={changeInputHandler} lastName={profileInfo.lastName} />
              <FirstName changeInputHandler={changeInputHandler} firstName={profileInfo.firstName} />
              <Patronymic
                name="patronymic"
                changeInputHandler={changeInputHandler}
                handlePatronymicChange={handlePatronymicChange}
                patronymic={patronymic}
              />
            </div>
            <div className={styles.fieldsColumn}>
              <MobilePhone changeInputHandler={changeInputHandler} mobilePhone={profileInfo.phone} />
              <Email changeInputHandler={changeInputHandler} email={profileInfo.email} />
              <p className={styles.noteText}>* - обязательные для заполнения поля</p>
            </div>
          </div>
          <button type="submit" className={styles.saveButton}>
            Сохранить
          </button>
        </form>
      </div>
      <PopUpWindow displ={popUpDispl} />
    </div>
  )
}

function ChangeAvatar({ handleAvatarChange, popUpOpen }) {
  const imageInput = React.useRef(null)
  function handleImageInput() {
    // if (imageInput.current) {
    //   imageInput.current.click()
    // }
    popUpOpen()
  }

  return (
    <div>
      <div className={styles.avatarWrapper}>
        <div className={styles.avatarSample} />
        <button type="button" className={styles.changeAvatar} onClick={handleImageInput}>
          Изменить фото
        </button>
        <input
          id="image"
          type="file"
          multiple
          accept="image/*"
          onChange={handleAvatarChange}
          ref={imageInput}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  )
}

ChangeAvatar.propTypes = {
  handleAvatarChange: PropTypes.func.isRequired,
}

function LastName({ lastName, changeInputHandler }) {
  return (
    <div>
      <p className={styles.text}>
        Фамилия <span className={styles.noteText}>*</span>
      </p>
      <input
        type="text"
        name="lastName"
        onChange={changeInputHandler}
        className={styles.input}
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

function FirstName({ firstName, changeInputHandler }) {
  return (
    <div>
      <p className={styles.text}>
        Имя <span className={styles.noteText}>*</span>
      </p>
      <input
        type="text"
        name="firstName"
        onChange={changeInputHandler}
        className={styles.input}
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

function Patronymic({ patronymic, changeInputHandler }) {
  return (
    <div>
      <p className={styles.text}>Отчество</p>
      <input
        type="text"
        name="patronymic"
        onChange={changeInputHandler}
        className={styles.input}
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

function MobilePhone({ mobilePhone, changeInputHandler }) {
  return (
    <div>
      <p className={styles.text}>
        Номер телефона <span className={styles.noteText}>*</span>
      </p>
      <input
        type="text"
        name="phone"
        onChange={changeInputHandler}
        className={styles.input}
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

function Email({ email, changeInputHandler }) {
  return (
    <div>
      <p className={styles.text}>
        Электронная почта
        <span className={styles.noteText}>*</span>
      </p>
      <input
        type="text"
        name="email"
        onChange={changeInputHandler}
        className={styles.input}
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
  avatar: state.avatar.avatar,
})

const mapDispatchToProps = (dispatch) => ({
  getProfileInfo: (uid) => dispatch(getUserProfileInfo(uid)),
  updateProfileInfo: (uid, firstName, patronymic, lastName, phone, email, token) =>
    dispatch(updateProfileInfo(uid, firstName, patronymic, lastName, phone, email, token)),
  uploadAvatar: (uid, files) => dispatch(uploadUserAvatar(uid, files)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
