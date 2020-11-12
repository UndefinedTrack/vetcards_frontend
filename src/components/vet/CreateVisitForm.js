/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from '../../styles/vet/VisitsHistory.module.css'
import { createVetProc } from '../../actions/procsCreate'
import DropDownList from '../DropDownList.js'

function CreateVisitForm({ createProc, uid }) {
  const { pid } = useParams()
  const today = new Date()
  const formatter = new Intl.DateTimeFormat('ru')
  const date = formatter.format(today)
  const token = localStorage.getItem('token')
  const [state, setState] = useState({
    date,
    purpose: 'Осмотр',
    symptoms: '',
    diagnosis: '',
    recomms: '',
    recipe: '',
  })

  function submitHandler(e) {
    e.preventDefault()

    const { purpose, symptoms, diagnosis, recomms, recipe } = state
    const procDate = state.date

    createProc(pid, uid, procDate, purpose, symptoms, diagnosis, recomms, recipe, token)
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
          <DropDownList changeInputHandler={changeInputHandler} options={visitPurposes} />
        </div>
        <div className={styles.VisitInf}>
          <div>
            Дата визита <span className={styles.noteText}>*</span>
          </div>
          <DateBlock changeInputHandler={changeInputHandler} date={state.date} />
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

function DateBlock({ changeInputHandler, date }) {
  return (
    <input
      required
      type="text"
      onChange={changeInputHandler}
      className={styles.InputBlock}
      name="date"
      title="Введите дату в формате дд.мм.гггг"
      pattern="([0][1-9]|[1-2][1-9]|[1-3][1-1]|[1-3][0])\.([0][1-9]|[1][0-2])\.([1][0-9][0-9][0-9]|[2][0][0-1][0-9]|[2][0][2][0])"
      defaultValue={date}
      placeholder={date}
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
  createProc: (pid, uid, date, purpose, symptoms, diagnosis, recomms, recipe, token) =>
    dispatch(createVetProc(pid, uid, date, purpose, symptoms, diagnosis, recomms, recipe, token)),
})

export default connect(null, mapDispatchToProps)(CreateVisitForm)
