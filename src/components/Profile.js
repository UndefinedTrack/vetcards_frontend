/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from '../styles/Profile.module.css'
import { getUserProfileInfo, updateProfileInfo } from '../actions/profile'
import { uploadUserAvatar, getUserAvatar } from '../actions/avatar'
import PopUpWindow from './PopUpWindow'

// eslint-disable-next-line
function Profile({ uid, profileInfo, getProfileInfo, updateProfileInfo, uploadAvatar, getAvatar, avatar }) {
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
  
  const avatarURL = profileInfo.avatar
  getAvatar(avatarURL, token)
  console.log(avatarURL, avatar)

  useEffect(() => {
    if (profileInfo.userId === -1) {
      getProfileInfo(uid)
    }
    // eslint-disable-next-line
  }, [getProfileInfo])

  console.log(profileInfo)
  
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

  function handleAvatarChange(image) {
    uploadAvatar(uid, token, image)
  }

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
            <Avatar
              handleAvatarChange={handleAvatarChange}
              popUpOpen={popUpOpen}
              avatarURL={profileInfo.avatar}
              getAvatar={getAvatar}
            />
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

function Avatar({ handleAvatarChange, avatarURL, popUpOpen }) {
  const [previewURL, setPreviewURL] = useState('')

  const imageInput = React.useRef(null)

  function handleButtonClick() {
    if (imageInput.current) {
      imageInput.current.click()
    }
    // popUpOpen()
  }

  function handleImageInput(event) {
    const image = event.target.files[0]
    if (image) {
      handleAvatarChange(image)
      setPreviewURL(URL.createObjectURL(image))
    }    
  }

  return (
    <div>
      <div className={styles.avatarWrapper}>
        <AvatarImage previewURL={previewURL} avatarURL={avatarURL} />
        <button type="button" className={styles.changeAvatar} onClick={handleButtonClick}>
          Изменить фото
        </button>
        <input
          id="image"
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageInput}
          ref={imageInput}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  )
}

Avatar.propTypes = {
  handleAvatarChange: PropTypes.func.isRequired,
  popUpOpen: PropTypes.func.isRequired,
  avatarURL: PropTypes.string.isRequired,
}

function AvatarImage({ previewURL, avatarURL }) {
  // if (avatarURL !== '') {
  //   return (
  //     <img src={avatarURL} alt='' className={styles.avatarShape} />
  //   )
  // }
  if (previewURL !== '') {
    return(
      <img src={previewURL} alt='' className={styles.avatarShape} />
    )
  }
  return(
    <div className={`${styles.avatarShape} ${styles.avatarSample}`} />
  )
}

AvatarImage.propTypes = {
  previewURL: PropTypes.string.isRequired,
  avatarURL: PropTypes.string.isRequired,
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

LastName.defaultProps = {
  lastName: '',
}

LastName.propTypes = {
  // handleLastNameChange: PropTypes.func.isRequired,
  lastName: PropTypes.string,
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

FirstName.defaultProps = {
  firstName: '',
}

FirstName.propTypes = {
  // handleFirstNameChange: PropTypes.func.isRequired,
  firstName: PropTypes.string,
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

Patronymic.defaultProps = {
  patronymic: '',
}

Patronymic.propTypes = {
  // handlePatronymicChange: PropTypes.func.isRequired,
  patronymic: PropTypes.string,
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

MobilePhone.defaultProps = {
  mobilePhone: '',
}

MobilePhone.propTypes = {
  // handleMobilePhoneChange: PropTypes.func.isRequired,
  mobilePhone: PropTypes.string,
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

Email.defaultProps = {
  email: '',
}

Email.propTypes = {
  // handleEmailChange: PropTypes.func.isRequired,
  email: PropTypes.string,
}

const mapStateToProps = (state) => ({
  profileInfo: state.profile.profile,
  avatar: state.avatar.avatar,
})

const mapDispatchToProps = (dispatch) => ({
  getProfileInfo: (uid) => dispatch(getUserProfileInfo(uid)),
  updateProfileInfo: (uid, firstName, patronymic, lastName, phone, email, token) =>
    dispatch(updateProfileInfo(uid, firstName, patronymic, lastName, phone, email, token)),
  uploadAvatar: (uid, token, image) => dispatch(uploadUserAvatar(uid, token, image)),
  getAvatar: (avatarURL, token) => dispatch(getUserAvatar(avatarURL, token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
