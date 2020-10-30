/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from '../../styles/vet/VisitsHistory.module.css'
import { createVetProc } from '../../actions/procsCreate'

function CreateVisitForm({ createProc }) {
  const { pid } = useParams()
  const [state, setState] = useState({
    date: '',
    purpose: 'Осмотр',
    symptoms: '',
    diagnosis: '',
    recomms: '',
    recipe: '',
  })

  function submitHandler(e) {
    e.preventDefault()

    const { purpose, symptoms, diagnosis, recomms, recipe } = state

    createProc(pid, 4, purpose, symptoms, diagnosis, recomms, recipe)
    setState({
      date: '',
      purpose: '',
      symptoms: '',
      diagnosis: '',
      recomms: '',
      recipe: '',
    })
    setTimeout(() => window.location.reload(), 100)
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
    <form onSubmit={submitHandler} className={styles.CreateVFContainer}>
      <div className={styles.DFlex}>
        <div className={styles.VisitInf}>
          <div>
            Цель визита <span className={styles.noteText}>*</span>
          </div>
          <VisitPurpose hangeInputHandler={changeInputHandler} />
        </div>
        <div className={styles.VisitInf}>
          <div>
            Дата визита <span className={styles.noteText}>*</span>
          </div>
          <Date changeInputHandler={changeInputHandler} />
        </div>
      </div>
      <div className={styles.DFlexColumn}>
        <div className={styles.FormName}>Симптомы</div>
        <TextAreaBlock changeInputHandler={changeInputHandler} placeholder="Опишите симптомы" name="symptoms" />
        <div className={styles.FormName}>Диагноз</div>
        <InputBlock changeInputHandler={changeInputHandler} placeholder="Поставьте диагноз" name="diagnosis" />
        <div className={styles.FormName}>Рекомендации по лечению</div>
        <TextAreaBlock
          changeInputHandler={changeInputHandler}
          placeholder="Укажите рекомендации по лечению"
          name="recomms"
        />
        <div className={styles.FormName}>Рецепт</div>
        <InputBlock changeInputHandler={changeInputHandler} placeholder="Выпишете рецепт" name="recipe" />
      </div>
      <p className={styles.noteText}>* - обязательные для заполнения поля</p>
      <button type="submit" className={styles.saveButton}>
        Добавить
      </button>
    </form>
  )
}

// function Duration() {
//   return (
//     <div className={styles.mybox}>
//       <span className={styles.myarrow} />
//       <select className={styles.SelectInput}>
//         <option>Осмотр</option>
//         {/* <option>Прививка</option>
//         <option>Стерилизация</option> */}
//       </select>
//     </div>
//   )
// }

function VisitPurpose() {
  const [isVisible, setIsVisible] = useState(false)

  const labels = ['Осмотр', 'Прививка']

  const [chosenVisitPurpose, setChosenVisitPurpose] = useState(labels[0])

  function handleOptionClick(optionName) {
    setChosenVisitPurpose(optionName)
    setIsVisible(false)
  }

  return (
    <div className={styles.select}>
      <div className={styles.selectTitle}>{chosenVisitPurpose}</div>
      <OptionsList
        isVisible={isVisible}
        handleOptionClick={handleOptionClick}
        labels={labels}
      />
    </div>
  )
}

function OptionsList({ isVisible, handleOptionClick, labels }) {
  if (isVisible) {
    return (
      <div className={styles.selectContent} >
        <Option name={labels[0]} handleLabelClick={handleOptionClick} />
        <Option name={labels[1]} handleLabelClick={handleOptionClick} />
      </div>
   )
  }
  return null
}

function Option({ name, handleOptionClick }) {
  return (
    <div>
      <input
        id={name}
        type='checkbox'
        value='0'
        name='selectName'
        className={styles.selectInput}
        onClick={() => handleOptionClick(name)}
      />
      <label htmlFor={name}>{name}</label>
    </div>
  )
}

function Date({ changeInputHandler }) {
  return (
    <input
      required
      type="text"
      onChange={changeInputHandler}
      // pattern=""
      className={styles.InputBlock}
      name="date"
      defaultValue="28.10.2020"
      maxLength="10"
    />
  )
}

function TextAreaBlock({ placeholder, name, changeInputHandler }) {
  return (
    <textarea
      type="text"
      name={name}
      onChange={changeInputHandler}
      placeholder={placeholder}
      className={`${styles.InputBlock} ${styles.Input} ${styles.TextArea}`}
    />
  )
}

function InputBlock({ placeholder, name, changeInputHandler }) {
  return (
    <input
      type="text"
      name={name}
      onChange={changeInputHandler}
      placeholder={placeholder}
      className={`${styles.InputBlock} ${styles.Input}`}
    />
  )
}

TextAreaBlock.propTypes = {
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

InputBlock.propTypes = {
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  createProc: (pid, uid, purpose, symptoms, diagnosis, recomms, recipe) =>
    dispatch(createVetProc(pid, uid, purpose, symptoms, diagnosis, recomms, recipe)),
})

export default connect(null, mapDispatchToProps)(CreateVisitForm)
