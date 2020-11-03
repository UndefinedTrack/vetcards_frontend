/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from '../../styles/vet/VisitsHistory.module.css'
import { createVetProc } from '../../actions/procsCreate'
import DropDownList from '../DropDownList.js'

function CreateVisitForm({ createProc }) {
  const { pid } = useParams()
  const [state, setState] = useState({
    date: '31.10.2020',
    purpose: 'Осмотр',
    symptoms: '',
    diagnosis: '',
    recomms: '',
    recipe: '',
  })

  function submitHandler(e) {
    e.preventDefault()

    const { date, purpose, symptoms, diagnosis, recomms, recipe } = state

    createProc(pid, 4, date, purpose, symptoms, diagnosis, recomms, recipe)
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

  const visitPurposes = ['Осмотр', 'Прививка', 'Стерилизация']

  return (
    <form onSubmit={submitHandler} className={styles.CreateVFContainer}>
      <div className={styles.DFlex}>
        <div className={styles.VisitInf}>
          <div>
            Цель визита <span className={styles.noteText}>*</span>
          </div>
          <DropDownList
            сhangeInputHandler={changeInputHandler}
            options={visitPurposes} />
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


function Date({ changeInputHandler }) {
  return (
    <input
      required
      type="text"
      onChange={changeInputHandler}
      // pattern=""
      className={styles.InputBlock}
      name="date"
      defaultValue="31.10.2020"
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
  createProc: (pid, uid, date, purpose, symptoms, diagnosis, recomms, recipe) =>
    dispatch(createVetProc(pid, uid, date, purpose, symptoms, diagnosis, recomms, recipe)),
})

export default connect(null, mapDispatchToProps)(CreateVisitForm)
