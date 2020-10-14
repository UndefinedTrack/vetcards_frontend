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
      birthDate: '',
      gender: '',
      chip: '',
      success: '',
    }

    this.createPet = props.createPet
  }

  submitHandler = (event) => {
    event.preventDefault()

    const { name, species, breed, color, birthDate, gender, chip } = this.state

    this.createPet(2, name, species, breed, color, birthDate, gender, chip)
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
                <Name handleNameChange={this.changeInputHandler} heading="Кличка" placeholder="Мурзик" name="name" />
                <Name handleNameChange={this.changeInputHandler} heading="Вид" placeholder="Кот" name="species" />
                <Name
                  handleNameChange={this.changeInputHandler}
                  heading="Порода"
                  placeholder="Беспородный"
                  name="breed"
                />
                <Name handleNameChange={this.changeInputHandler} heading="Окрас" placeholder="Чёрный" name="color" />
              </div>
              <div className={styles.fieldsColumn}>
                <Name
                  handleNameChange={this.changeInputHandler}
                  heading="Дата рождения"
                  placeholder="01.09.2018"
                  name="birthDate"
                />
                <Name handleNameChange={this.changeInputHandler} heading="Пол" placeholder="Самец" name="gender" />
                <Name
                  handleNameChange={this.changeInputHandler}
                  heading="Чип"
                  placeholder="000000000000000"
                  name="chip"
                />
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

function Name({ handleNameChange, name, heading, placeholder }) {
  return (
    <div>
      <p className={styles.text}>
        {heading} <span className={styles.noteText}>*</span>
      </p>
      <input
        type="text"
        required
        className={styles.input}
        onChange={handleNameChange}
        name={name}
        placeholder={placeholder}
      />
    </div>
  )
}

Name.propTypes = {
  handleNameChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  createPet: (uid, name, species, breed, color, birthDate, gender, chip) =>
    dispatch(createPet(uid, name, species, breed, color, birthDate, gender, chip)),
})

export default connect(null, mapDispatchToProps)(PetCreator)
