/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { createPet } from '../actions/petOps'
import styles from '../styles/Profile.module.css'

function PetCreator({ uid, createNewPet }) {
  const token = localStorage.getItem('token')
  const { cid } = useParams()
  const [state, setState] = useState({
    name: '',
    species: '',
    breed: '',
    color: '',
    gender: '',
    chip: '',
    day: '',
    month: '',
    year: '',
  })

  function submitHandler(event) {
    event.preventDefault()
    let birthDate = ''

    const { name, species, breed, color, gender, chip, year } = state
    let { day, month } = state
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

    if (uid !== 0) {
      createNewPet(uid, name, species, breed, color, birthDate, gender, chip, token)
    } else {
      createNewPet(cid, name, species, breed, color, birthDate, gender, chip, token)
    }
    setState({
      name: '',
      species: '',
      breed: '',
      color: '',
      birthDate: '',
      gender: '',
      chip: '',
    })

    setTimeout(() => {
      window.location.href = '#/my-acc'
    }, 100)
  }

  function changeInputHandler(event) {
    event.persist()
    setState((prev) => ({
      ...prev,
      ...{
        [event.target.name]: event.target.value,
      },
    }))
  }

  return (
    <div className={styles.profileSpace}>
      <div className={styles.profileWrapper}>
        <form onSubmit={submitHandler}>
          <div className={styles.formSpace}>
            <div className={styles.fieldsColumn}>
              <Name handleNameChange={changeInputHandler} heading="Кличка" placeholder="Мурзик" name="name" rec />
              <Name handleNameChange={changeInputHandler} heading="Вид" placeholder="Кот" name="species" rec />
              <Name handleNameChange={changeInputHandler} heading="Порода" placeholder="Беспородный" name="breed" />
              <Name handleNameChange={changeInputHandler} heading="Окрас" placeholder="Чёрный" name="color" />
            </div>
            <div className={styles.fieldsColumn}>
              <Birthday handleNameChange={changeInputHandler} heading="Дата рождения" name="birthDate" />
              <Name handleNameChange={changeInputHandler} heading="Пол" placeholder="Самец" name="gender" />
              <Chip handleNameChange={changeInputHandler} heading="Чип" placeholder="000000000000000" name="chip" />
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
  createNewPet: (uid, name, species, breed, color, birthDate, gender, chip, token) =>
    dispatch(createPet(uid, name, species, breed, color, birthDate, gender, chip, token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PetCreator)
