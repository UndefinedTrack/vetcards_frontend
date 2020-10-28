/* eslint-disable react/prop-types */
import React /* { useState } */ from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createPet } from '../actions/petOps'
import styles from '../styles/Profile.module.css'

class PetCreator extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      species: '',
      breed: '',
      color: '',
      birthDate: '2020',
      gender: '',
      chip: '',
      success: '',
    }

    this.createPet = props.createPet
  }

  submitHandler = (event) => {
    event.preventDefault()

    const { name, species, breed, color, birthDate, gender, chip } = this.state

    this.createPet(3, name, species, breed, color, birthDate, gender, chip)
    this.setState({
      name: '',
      species: '',
      breed: '',
      color: '',
      birthDate: '',
      gender: '',
      chip: '',
      success: 'Готово!',
    })
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
    const { success } = this.state
    return (
      <div className={styles.profileSpace}>
        <div className={styles.profileWrapper}>
          <form onSubmit={this.submitHandler}>
            <div className={styles.formSpace}>
              <ChangeAvatar />
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
            <div className={`${styles.noteText} ${styles.Success}`}>{success}</div>
          </form>
        </div>
      </div>
    )
  }
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
          pattern="[A-Za-zА-Яа-яЁё]{2,25}"
          className={styles.input}
          onChange={handleNameChange}
          name={name}
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

function Birthday({ handleNameChange, name, heading, placeholder }) {
  return (
    <div>
      <p className={styles.text}>{heading}</p>
      <div className={styles.BirthdayContainer}>
        <div className={styles.BirthdayInputAndText}>
          <input
            type="text"
            className={`${styles.input} ${styles.BirthdayDay}`}
            pattern="[0-9]{1,2}"
            maxLength="2"
            onChange={handleNameChange}
            name={name}
            placeholder="01"
          />
          <div className={styles.BirthdayText}>День</div>
        </div>
        <div className={styles.BirthdayInputAndText}>
          <input
            type="text"
            className={`${styles.input} ${styles.BirthdayDay}`}
            pattern="[0-9]{1,2}"
            maxLength="2"
            onChange={handleNameChange}
            name={name}
            placeholder="10"
          />
          <div className={styles.BirthdayText}>Месяц</div>
        </div>
        <div className={styles.BirthdayInputAndText}>
          <input
            type="text"
            className={`${styles.input} ${styles.BirthdayYear}`}
            pattern="[0-9]{4,4}"
            maxLength="4"
            onChange={handleNameChange}
            name={name}
            placeholder="2020"
          />
          <div className={styles.BirthdayText}>Год</div>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  createPet: (uid, name, species, breed, color, birthDate, gender, chip) =>
    dispatch(createPet(uid, name, species, breed, color, birthDate, gender, chip)),
})

export default connect(null, mapDispatchToProps)(PetCreator)
