/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from '../styles/Profile.module.css'
import { getUserProfileInfo } from '../actions/profile'
import { uploadUserAvatar } from '../actions/avatar'
import PopUpWindow from './PopUpWindow'

function Profile({ uid, profileInfo, getProfileInfo, uploadAvatar }) {
  const [popUpDispl, setPopUpDispl] = useState(false)

  if (profileInfo === undefined) {
    profileInfo = []
    getProfileInfo(uid)
  }
  const [patronymic, setPatronymic] = useState('')

  useEffect(() => {
    if (profileInfo.userId === -1) {
      getProfileInfo(uid)
    }
    // eslint-disable-next-line
  }, [getProfileInfo])

  function handlePatronymicChange(event) {
    setPatronymic(event.target.value)
  }

  function handleAvatarChange(event) {
    uploadAvatar(uid, event.target.files)
  }

  function handleSubmit(event) {
    event.preventDefault()
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
        <form onSubmit={handleSubmit} className={styles.formSpace}>
          <ChangeAvatar handleAvatarChange={handleAvatarChange} popUpOpen={popUpOpen} />
          <div className={styles.fieldsColumn}>
            <LastName handleSubmit={handleSubmit} lastName={profileInfo.lastName} />
            <FirstName handleSubmit={handleSubmit} firstName={profileInfo.firstName} />
            <Patronymic
              handlePatronymicChange={handlePatronymicChange}
              handleSubmit={handleSubmit}
              patronymic={patronymic}
            />
          </div>
          <div className={styles.fieldsColumn}>
            <MobilePhone handleSubmit={handleSubmit} mobilePhone={profileInfo.phone} />
            <Email handleSubmit={handleSubmit} email={profileInfo.email} />
            <p className={styles.noteText}>* - обязательные для заполнения поля</p>
          </div>
        </form>
        <button type="button" className={styles.saveButton} onClick={popUpOpen}>
          Сохранить
        </button>
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
        Номер телефона <span className={styles.noteText}>*</span>
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
        Электронная почта
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
  avatar: state.avatar.avatar,
})

const mapDispatchToProps = (dispatch) => ({
  getProfileInfo: (uid) => dispatch(getUserProfileInfo(uid)),
  uploadAvatar: (uid, files) => dispatch(uploadUserAvatar(uid, files)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
