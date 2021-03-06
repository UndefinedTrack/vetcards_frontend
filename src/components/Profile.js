/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from '../styles/Profile.module.css'
import { updateProfileInfo } from '../actions/profile'
import { uploadUserAvatar, getUserAvatar } from '../actions/avatar'
import PopUpWindow from './PopUpWindow'

function Profile({ uid, profileInfo, updateInfo, uploadAvatar, getAvatar, avatarFullURL }) {
  const [popUpDispl, setPopUpDispl] = useState(false)
  const token = localStorage.getItem('token')

  if (profileInfo === undefined) {
    profileInfo = []
  }

  const isVet = profileInfo.vet
  const [state, setState] = useState({
    firstName: '',
    patronymic: '',
    lastName: '',
    phone: '',
    email: '',
    region: '',
    city: '',
    street: '',
    addressOther: '',
  })

  useEffect(() => {
    if (profileInfo.avatar) {
      getAvatar(profileInfo.avatar, token)
    }
  }, [getAvatar, profileInfo.avatar, token])

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
    if (state.region === '') state.region = profileInfo.region
    if (state.city === '') state.city = profileInfo.city
    if (state.street === '') state.street = profileInfo.street
    if (state.addressOther === '') state.addressOther = profileInfo.addressOther
    // uid, firstName, patronymic, lastName, phone, email, address, paidService, token
    updateInfo(
      uid,
      state.firstName,
      state.patronymic,
      state.lastName,
      state.phone,
      state.email,
      state.region,
      state.city,
      state.street,
      state.addressOther,
      false,
      token,
    )

    setState({
      firstName: '',
      patronymic: '',
      lastName: '',
      phone: '',
      email: '',
      region: '',
      city: '',
      street: '',
      addressOther: '',
    })
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
        <form onSubmit={submitHandler} className={styles.form} >
          <div className={styles.formSpace}>
            <Avatar
              handleAvatarChange={handleAvatarChange}
              popUpOpen={popUpOpen}
              avatarFullURL={avatarFullURL}
              getAvatar={getAvatar}
            />
            <div className={styles.fieldsColumn}>
              <LastName changeInputHandler={changeInputHandler} lastName={profileInfo.lastName} isVet={isVet} />
              <FirstName changeInputHandler={changeInputHandler} firstName={profileInfo.firstName} isVet={isVet} />
              <Patronymic
                name="patronymic"
                changeInputHandler={changeInputHandler}
                patronymic={profileInfo.patronymic}
                isVet={isVet}
              />
            </div>
            <div className={styles.fieldsColumn}>
              <MobilePhone changeInputHandler={changeInputHandler} mobilePhone={profileInfo.phone} isVet={isVet} />
              <Email changeInputHandler={changeInputHandler} email={profileInfo.email} isVet={isVet} />
            </div>
            <FullAddress
              region={profileInfo.region}
              city={profileInfo.city}
              street={profileInfo.street}
              addressOther={profileInfo.addressOther}
              changeInputHandler={changeInputHandler}
              isVet={isVet}
            />
          </div>
          {isVet && <p className={`${styles.noteText} ${styles.requiredText}`}>* - обязательные для заполнения поля</p>}
          {!isVet && (
              <p className={`${styles.noteText} ${styles.requiredText}`}>Важно: редактировать информацию может только ваш ветеринар</p>
          )}     
          <button type="submit" className={styles.saveButton}>
            Сохранить
          </button>
        </form>
      </div>
      <PopUpWindow displ={popUpDispl} />
    </div>
  )
}

function Avatar({ handleAvatarChange, avatarFullURL, popUpOpen }) {
  const [previewURL, setPreviewURL] = useState('')

  const imageInput = React.useRef(null)

  function handleButtonClick() {
    if (imageInput.current) {
      imageInput.current.click()
    }
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
        <AvatarImage previewURL={previewURL} avatarFullURL={avatarFullURL} />
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
  avatarFullURL: PropTypes.string.isRequired,
}

function AvatarImage({ previewURL, avatarFullURL }) {
  if (avatarFullURL !== '' && avatarFullURL !== undefined && typeof avatarFullURL === 'string') {
    return <img src={avatarFullURL} alt="" className={styles.avatarShape} />
  }
  if (previewURL !== '') {
    return <img src={previewURL} alt="" className={styles.avatarShape} />
  }
  return <div className={`${styles.avatarShape} ${styles.avatarSample}`} />
}

AvatarImage.propTypes = {
  previewURL: PropTypes.string.isRequired,
  avatarFullURL: PropTypes.string.isRequired,
}

function LastName({ lastName, changeInputHandler, isVet }) {
  return (
    <div>
      <p className={styles.text}>
        Фамилия <span className={styles.noteText}>*</span>
      </p>
      {isVet && (
        <input
          type="text"
          name="lastName"
          title="Фамилия может содержать только буквы и должна быть длиннее 2 символов"
          pattern="[A-Za-zА-Яа-яЁё]{2,30}"
          onChange={changeInputHandler}
          className={styles.input}
          defaultValue={lastName}
        />
      )}
      {!isVet && (
        <input
          type="text"
          name="lastName"
          disabled
          onChange={changeInputHandler}
          className={styles.input}
          defaultValue={lastName}
        />
      )}
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

function FirstName({ firstName, changeInputHandler, isVet }) {
  return (
    <div>
      <p className={styles.text}>
        Имя <span className={styles.noteText}>*</span>
      </p>
      {isVet && (
        <input
          type="text"
          name="firstName"
          title="Имя может содержать только буквы и должно быть длиннее 2 символов"
          pattern="[A-Za-zА-Яа-яЁё]{2,30}"
          onChange={changeInputHandler}
          className={styles.input}
          defaultValue={firstName}
        />
      )}
      {!isVet && (
        <input
          type="text"
          name="firstName"
          disabled
          onChange={changeInputHandler}
          className={styles.input}
          defaultValue={firstName}
        />
      )}
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

function Patronymic({ patronymic, changeInputHandler, isVet }) {
  return (
    <div>
      <p className={styles.text}>Отчество</p>
      {isVet && (
        <input
          type="text"
          name="patronymic"
          title="Отчество может содержать только буквы и должно быть длиннее 2 символов"
          pattern="[A-Za-zА-Яа-яЁё]{2,30}"
          onChange={changeInputHandler}
          className={styles.input}
          defaultValue={patronymic}
        />
      )}
      {!isVet && (
        <input
          type="text"
          name="patronymic"
          disabled
          onChange={changeInputHandler}
          className={styles.input}
          defaultValue={patronymic}
        />
      )}
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

function MobilePhone({ mobilePhone, changeInputHandler, isVet }) {
  return (
    <div>
      <p className={styles.text}>
        Номер телефона <span className={styles.noteText}>*</span>
      </p>
      {isVet && (
        <input
          type="text"
          name="phone"
          required
          onChange={changeInputHandler}
          className={styles.input}
          defaultValue={mobilePhone}
          placeholder="89990000000"
          maxLength="11"
          pattern="8[0-9]{10}"
          title="Введите номер телефона в формате 8хххххххххх"
        />
      )}
      {!isVet && (
        <input
          type="text"
          name="phone"
          disabled
          required
          onChange={changeInputHandler}
          className={styles.input}
          defaultValue={mobilePhone}
          placeholder="89990000000"
          maxLength="11"
        />
      )}
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

function Email({ email, changeInputHandler, isVet }) {
  return (
    <div>
      <p className={styles.text}>
        Электронная почта
        <span className={styles.noteText}>*</span>
      </p>
      {isVet && (
        <input
          type="email"
          required
          name="email"
          onChange={changeInputHandler}
          className={styles.input}
          defaultValue={email}
          placeholder="example@gmail.com"
        />
      )}
      {!isVet && (
        <input
          type="email"
          required
          name="email"
          disabled
          onChange={changeInputHandler}
          className={styles.input}
          defaultValue={email}
          placeholder="example@gmail.com"
        />
      )}
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

function FullAddress({ region, city, street, addressOther, changeInputHandler, isVet }) {
  if (isVet) {
    return(
      <div className={styles.fieldsColumn}>
        <p className={styles.text}>Адрес</p>
        <input 
            type="text"
            name="region"
            onChange={changeInputHandler}
            className={`${styles.input} ${styles.inputaddress}`}
            defaultValue={region}
            placeholder="Регион"
          />
          <input 
            type="text"
            name="city"
            onChange={changeInputHandler}
            className={`${styles.input} ${styles.inputaddress}`}
            defaultValue={city}
            placeholder="Город"
          />
          <input
            type="text"
            name="street"
            onChange={changeInputHandler}
            className={`${styles.input} ${styles.inputaddress}`}
            defaultValue={street}
            placeholder="Улица"
          />
          <input
            type="text"
            name="addressOther"
            onChange={changeInputHandler}
            className={`${styles.input} ${styles.inputaddress}`}
            defaultValue={addressOther}
            placeholder="Дом, корпус, квартира"
          />
      </div>
    )
  }
  return(
    <div className={styles.fieldsColumn}>
      <p className={styles.text}>Адрес</p>
      <input
        disabled
        type="text"
        name="region"
        onChange={changeInputHandler}
        className={`${styles.input} ${styles.inputaddress}`}
        defaultValue={region}
        placeholder="Регион"
      />
      <input 
        disabled
        type="text"
        name="city"
        onChange={changeInputHandler}
        className={`${styles.input} ${styles.inputaddress}`}
        defaultValue={city}
        placeholder="Город"
      />
      <input
        disabled
        type="text"
        name="street"
        onChange={changeInputHandler}
        className={`${styles.input} ${styles.inputaddress}`}
        defaultValue={street}
        placeholder="Улица"
      />
      <input
        disabled
        type="text"
        name="addressOther"
        onChange={changeInputHandler}
        className={`${styles.input} ${styles.inputaddress}`}
        defaultValue={addressOther}
        placeholder="Дом, корпус, квартира"
      />
    </div>
  )
}

FullAddress.propTypes = {
  changeInputHandler: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  profileInfo: state.profile.profile,
  avatarFullURL: state.avatar.avatar,
})

const mapDispatchToProps = (dispatch) => ({
  updateInfo: (uid, firstName, patronymic, lastName, phone, email, region, city, street, addressOther, paidService, token) =>
    dispatch(updateProfileInfo(uid, firstName, patronymic, lastName, phone, email, region, city, street, addressOther, paidService, token)),
  uploadAvatar: (uid, token, image) => dispatch(uploadUserAvatar(uid, token, image)),
  getAvatar: (avatarURL, token) => dispatch(getUserAvatar(avatarURL, token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
