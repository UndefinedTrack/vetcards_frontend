/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createPet } from '../actions/petOps'
import { uploadPetAvatar } from '../actions/avatar'
import styles from '../styles/Profile.module.css'

class PetCreator extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      species: '',
      breed: '',
      color: '',
      gender: '',
      chip: '',
      day: '',
      month: '',
      year: '',
    }

    this.createPet = props.createPet
    this.uploadAvatar = props.uploadAvatar
    this.uid = props.uid
    this.token = localStorage.getItem('token')
  }

  submitHandler = (event) => {
    // const { petInfo } = this.props

    event.preventDefault()
    let birthDate = ''

    const { name, species, breed, color, gender, chip, year } = this.state
    let { day, month } = this.state
    if (day.length === 1) {
      day = `0${day}`
    }
    if (month.length === 1) {
      month = `0${month}`
    }
    if (day === '') {
      if (month !== '') {
        if (year !== '') {
          birthDate = `${month}.${year}`
        } else {
          birthDate = `${year}`
        }
      } else {
        birthDate = `${year}`
      }
    } else if (month !== '' && year !== '') {
      birthDate = `${day}.${month}.${year}`
    } else {
      birthDate = `${year}`
    }
    this.createPet(this.uid, name, species, breed, color, birthDate, gender, chip, this.token)
    this.setState({
      name: '',
      species: '',
      breed: '',
      color: '',
      birthDate: '',
      gender: '',
      chip: '',
    })

    // this.uploadAvatar(this.uid, petInfo.petId, this.token, avatar)

    setTimeout(() => {
      window.location.href = '#/my-acc'
    }, 100)
  }

  handleAvatarChange = (image) => {
    this.setState((prev) => ({
      ...prev,
      ...{
        avatar: image,
      }
    }))
  }

  changeInputHandler = (event) => {
    event.persist()
    this.setState((prev) => ({
      ...prev,
      ...{
        [event.target.name]: event.target.value,
      },
    }))
  }

  render() {
    return (
      <div className={styles.profileSpace}>
        <div className={styles.profileWrapper}>
          <form onSubmit={this.submitHandler}>
            <div className={styles.formSpace}>
              <Avatar handleAvatarChange={this.handleAvatarChange}
              />
              <div className={styles.fieldsColumn}>
                <Name
                  handleNameChange={this.changeInputHandler}
                  heading="Кличка"
                  placeholder="Мурзик"
                  name="name"
                  rec
                />
                <Name handleNameChange={this.changeInputHandler} heading="Вид" placeholder="Кот" name="species" rec />
                <Name
                  handleNameChange={this.changeInputHandler}
                  heading="Порода"
                  placeholder="Беспородный"
                  name="breed"
                />
                <Name handleNameChange={this.changeInputHandler} heading="Окрас" placeholder="Чёрный" name="color" />
              </div>
              <div className={styles.fieldsColumn}>
                <Birthday handleNameChange={this.changeInputHandler} heading="Дата рождения" name="birthDate" />
                <Name handleNameChange={this.changeInputHandler} heading="Пол" placeholder="Самец" name="gender" />
                <Chip
                  handleNameChange={this.changeInputHandler}
                  heading="Чип"
                  placeholder="000000000000000"
                  name="chip"
                />
                <p className={styles.noteText}>* - обязательные для заполнения поля</p>
              </div>
            </div>
            <button type="submit" className={styles.saveButton}>
              Сохранить
            </button>
          </form>
        </div>
      </div>
    )
  }
}

function Avatar({ handleAvatarChange, avatarURL }) {
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

// Avatar.propTypes = {
//   handleAvatarChange: PropTypes.func.isRequired,
//   avatarURL: PropTypes.string.isRequired,
// }

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

// AvatarImage.propTypes = {
//   previewURL: PropTypes.string.isRequired,
//   avatarURL: PropTypes.string.isRequired,
// }

function Name({ handleNameChange, name, heading, placeholder, rec }) {
  return (
    <div>
      <p className={styles.text}>
        {heading}
        {rec && <span className={styles.noteText}>*</span>}
      </p>
      {!rec && (
        <input
          type="text"
          pattern="([A-Za-zА-Яа-яЁё]| |-){2,25}"
          className={styles.input}
          onChange={handleNameChange}
          name={name}
          title="При заполнении данного поля вы можете использовать буквы, пробелы и дефисы"
          placeholder={placeholder}
        />
      )}
      {rec && (
        <input
          type="text"
          required
          pattern="[A-Za-zА-Яа-яЁё]{2,15}"
          className={styles.input}
          onChange={handleNameChange}
          name={name}
          placeholder={placeholder}
        />
      )}
    </div>
  )
}

Name.propTypes = {
  handleNameChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
}

function Chip({ handleNameChange, name, heading, placeholder }) {
  return (
    <div>
      <p className={styles.text}>{heading}</p>
      <input
        type="text"
        className={styles.input}
        maxLength="15"
        pattern="[0-9]{15,15}"
        onChange={handleNameChange}
        name={name}
        placeholder={placeholder}
      />
    </div>
  )
}

function Birthday({ handleNameChange, heading, placeholder }) {
  const today = new Date()
  const formatter = new Intl.DateTimeFormat('ru')
  const date = formatter.format(today)
  const day = date.slice(0, 2)
  const month = date.slice(3, 5)
  const year = date.slice(6, 10)
  return (
    <div>
      <p className={styles.text}>{heading}</p>
      <div className={styles.BirthdayContainer}>
        <div className={styles.BirthdayInputAndText}>
          <input
            type="text"
            className={`${styles.input} ${styles.BirthdayDay}`}
            pattern="[0][1-9]|[1-2]?[1-9]|[1-3]?[1-1]|[1-3][0]"
            maxLength="2"
            onChange={handleNameChange}
            name="day"
            placeholder={day}
          />
          <div className={styles.BirthdayText}>День</div>
        </div>
        <div className={styles.BirthdayInputAndText}>
          <input
            type="text"
            className={`${styles.input} ${styles.BirthdayDay}`}
            pattern="[0]?[1-9]|[1]?[1-2]|[1][0]"
            maxLength="2"
            onChange={handleNameChange}
            name="month"
            placeholder={month}
          />
          <div className={styles.BirthdayText}>Месяц</div>
        </div>
        <div className={styles.BirthdayInputAndText}>
          <input
            type="text"
            className={`${styles.input} ${styles.BirthdayYear}`}
            pattern="[1][0-9][0-9][0-9]|[2][0][0-1][0-9]|[2][0][2][0]"
            maxLength="4"
            onChange={handleNameChange}
            name="year"
            placeholder={year}
          />
          <div className={styles.BirthdayText}>Год</div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  petInfo: state.petInfo.pet,
})

const mapDispatchToProps = (dispatch) => ({
  createPet: (uid, name, species, breed, color, birthDate, gender, chip, token) =>
    dispatch(createPet(uid, name, species, breed, color, birthDate, gender, chip, token)),
  uploadAvatar: (uid, pid, token, image) => dispatch(uploadPetAvatar(uid, pid, token, image))
})

export default connect(mapStateToProps, mapDispatchToProps)(PetCreator)
