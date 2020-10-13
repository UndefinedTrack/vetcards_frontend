import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/Profile.module.css'

function PetCreator(props) {
  const [name, setName] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
  }

  function handleNameChange(event) {
    setName(event.target.value)
  }

  return (
    <div className={styles.profileSpace}>
      <div className={styles.profileWrapper}>
        <form onSubmit={handleSubmit} className={styles.formSpace}>
          <ChangeAvatar />
          <div className={styles.fieldsColumn}>
            <Name
              handleSubmit={handleSubmit}
              handleNameChange={handleNameChange}
              heading="Кличка"
              placeholder="Мурзик"
              lastName={name}
            />
            <Name
              handleSubmit={handleSubmit}
              handleNameChange={handleNameChange}
              heading="Вид"
              lastName={name}
              placeholder="Кот"
            />
            <Name
              handleSubmit={handleSubmit}
              handleNameChange={handleNameChange}
              heading="Порода"
              lastName={name}
              placeholder="Беспородный"
            />
            <Name
              handleSubmit={handleSubmit}
              handleNameChange={handleNameChange}
              heading="Окрас"
              lastName={name}
              placeholder="Чёрный"
            />
          </div>
          <div className={styles.fieldsColumn}>
            <Name
              handleSubmit={handleSubmit}
              handleNameChange={handleNameChange}
              heading="Дата рождения"
              placeholder="01.09.2018"
              lastName={name}
            />
            <Name
              handleSubmit={handleSubmit}
              handleNameChange={handleNameChange}
              heading="Пол"
              lastName={name}
              placeholder="Самец"
            />
            <Name
              handleSubmit={handleSubmit}
              handleNameChange={handleNameChange}
              heading="Чип"
              lastName={name}
              placeholder="000000000000000"
            />
          </div>
        </form>
        <button type="button" className={styles.saveButton}>
          Сохранить
        </button>
      </div>
    </div>
  )
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
        className={styles.input}
        onChange={handleNameChange}
        defaultValue={name}
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

export default PetCreator
