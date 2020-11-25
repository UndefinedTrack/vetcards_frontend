/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from '../../styles/vet/EditClientInformation.module.css'
import { getClientProfileInfo, updateClientProfileInfo } from '../../actions/clientProfile'
import { uploadUserAvatar, getUserAvatar } from '../../actions/avatar'

function EditClientInformation({
  uid,
  profileInfo,
  getProfileInfo,
  // eslint-disable-next-line
  updateProfileInfo,
  uploadAvatar,
  getAvatar,
  avatarFullURL,
}) {
  const token = localStorage.getItem('token')
  const { cid } = useParams()
  const [flag, setFlag] = useState(true)

  if (profileInfo === undefined) {
    profileInfo = []
  }

  const avatarURL = profileInfo.avatar
  if (avatarURL !== '') {
    getAvatar(avatarURL, token)
  }

  useEffect(() => {
    getProfileInfo(cid, token)
  }, [getProfileInfo, cid, token])

  const [state, setState] = useState({
    firstName: profileInfo.firstName,
    patronymic: profileInfo.patronymic || '',
    lastName: profileInfo.lastName || '',
    phone: profileInfo.phone || '',
    email: profileInfo.email || '',
    address: profileInfo.address || '',
    paid: profileInfo.paidService || '',
  })

  function changeInputHandler(event) {
    event.persist()
    setState((prev) => ({
      ...prev,
      ...{
        [event.target.name]: event.target.value,
      },
    }))
  }

  const checkbox = window.document.getElementById('check-box')
  if (state.paid && checkbox) checkbox.checked = 'checked'

  function changeCheckbox(e) {
    if (state.paid) {
      setState((prev) => ({
        ...prev,
        ...{
          paid: false,
        },
      }))
    } else {
      setState((prev) => ({
        ...prev,
        ...{
          paid: true,
        },
      }))
    }
  }

  if (state.firstName !== profileInfo.firstName && flag) {
    setState({
      firstName: profileInfo.firstName || '',
      patronymic: profileInfo.patronymic || '',
      lastName: profileInfo.lastName || '',
      phone: profileInfo.phone || '',
      email: profileInfo.email || '',
      address: profileInfo.address || '',
      paid: profileInfo.paidService || '',
    })
    setFlag(false)
  }

  function submitHandler(event) {
    event.preventDefault()
    updateProfileInfo(
      cid,
      state.firstName,
      state.patronymic,
      state.lastName,
      state.phone,
      state.email,
      state.address,
      state.paid,
      token,
    )
  }

  function handleAvatarChange(image) {
    // uploadAvatar(uid, token, image)
  }

  return (
    <div className={styles.profileSpace}>
      <div className={styles.profileWrapper}>
        <form onSubmit={submitHandler}>
          <div className={styles.formSpace}>
            <Avatar handleAvatarChange={handleAvatarChange} avatarFullURL={avatarFullURL} getAvatar={getAvatar} />
            <div className={styles.fieldsColumn}>
              <LastName changeInputHandler={changeInputHandler} lastName={state.lastName} />
              <FirstName changeInputHandler={changeInputHandler} firstName={state.firstName} />
              <Patronymic
                name="patronymic"
                changeInputHandler={changeInputHandler}
                handlePatronymicChange={changeInputHandler}
                patronymic={state.patronymic}
              />
            </div>
            <div className={styles.fieldsColumn}>
              <MobilePhone changeInputHandler={changeInputHandler} mobilePhone={state.phone} />
              <Email changeInputHandler={changeInputHandler} email={state.email} />
              <Address changeInputHandler={changeInputHandler} address={state.address} />
              <p className={styles.noteText}>* - обязательные для заполнения поля</p>
              <PaidServise changeCheckbox={changeCheckbox} />
            </div>
          </div>
          <div className={styles.Test}>
            <a href={`#/new-pet/${cid}`} className={`${styles.saveButton} ${styles.NewPet}`}>
              <span className={styles.Plus}>+</span> Новый питомец
            </a>
            <button type="submit" className={styles.saveButton}>
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Avatar({ handleAvatarChange, avatarFullURL }) {
  const [previewURL, setPreviewURL] = useState('')

  const imageInput = React.useRef(null)

  // function handleButtonClick() {
  //   if (imageInput.current) {
  //     imageInput.current.click()
  //   }
  // }

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
        {/* <button type="button" className={styles.changeAvatar} onClick={handleButtonClick}>
          Изменить фото
        </button> */}
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
  avatarFullURL: PropTypes.string.isRequired,
}

function AvatarImage({ previewURL, avatarFullURL }) {
  if (avatarFullURL !== '') {
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

function LastName({ lastName, changeInputHandler }) {
  return (
    <div>
      <p className={styles.text}>
        Фамилия <span className={styles.noteText}>*</span>
      </p>
      <input
        type="text"
        required
        name="lastName"
        title="Фамилия может содержать только буквы и должна быть длиннее 2 символов"
        pattern="[A-Za-zА-Яа-яЁё]{2,30}"
        onChange={changeInputHandler}
        className={styles.input}
        value={lastName}
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
        required
        name="firstName"
        title="Имя может содержать только буквы и должно быть длиннее 2 символов"
        pattern="[A-Za-zА-Яа-яЁё]{2,30}"
        onChange={changeInputHandler}
        className={styles.input}
        value={firstName}
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
        title="Отчество может содержать только буквы и должно быть длиннее 2 символов"
        pattern="[A-Za-zА-Яа-яЁё]{2,30}"
        onChange={changeInputHandler}
        className={styles.input}
        value={patronymic}
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
        required
        onChange={changeInputHandler}
        className={styles.input}
        value={mobilePhone}
        maxLength="11"
        placeholder="89990000000"
        pattern="8[0-9]{10}"
        title="Введите номер телефона в формате 8хххххххххх"
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
        type="email"
        required
        name="email"
        onChange={changeInputHandler}
        className={styles.input}
        value={email}
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

function Address({ address, changeInputHandler }) {
  return (
    <div>
      <p className={styles.text}>Адрес</p>
      <input
        type="text"
        name="address"
        onChange={changeInputHandler}
        className={styles.input}
        value={address}
        placeholder="Введите адрес"
      />
    </div>
  )
}

function PaidServise({ changeCheckbox }) {
  return (
    <div>
      <div className={styles.CheckName}>
        <input
          type="checkbox"
          className={styles.CustomCheckBox}
          id="check-box"
          name="check-box"
          onChange={changeCheckbox}
        />
        {/* eslint-disable-next-line */}
        <label htmlFor="check-box">
          <span className={styles.Paid}>Согласие на платные услуги</span>
        </label>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  profileInfo: state.clientProfile.clientProfile,
  avatarFullURL: state.avatar.avatar,
})

const mapDispatchToProps = (dispatch) => ({
  getProfileInfo: (uid, token) => dispatch(getClientProfileInfo(uid, token)),
  updateProfileInfo: (uid, firstName, patronymic, lastName, phone, email, address, paid, token) =>
    dispatch(updateClientProfileInfo(uid, firstName, patronymic, lastName, phone, email, address, paid, token)),
  uploadAvatar: (uid, token, image) => dispatch(uploadUserAvatar(uid, token, image)),
  getAvatar: (avatarURL, token) => dispatch(getUserAvatar(avatarURL, token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditClientInformation)
