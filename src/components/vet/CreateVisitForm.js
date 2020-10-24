/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from '../../styles/vet/VisitsHistory.module.css'
import { createVetProc } from '../../actions/procsCreate'

class CreateVisitForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      date: '',
      purpose: 'Осмотр',
      symptoms: '',
      diagnosis: '',
      recomms: '',
      recipe: '',
    }

    this.createProc = props.createProc
  }

  submitHandler = (event) => {
    event.preventDefault()

    const { purpose, symptoms, diagnosis, recomms, recipe } = this.state

    // console.log(date, purpose, symptoms, diagnosis, recomms, recipe)

    this.createProc(3, 2, purpose, symptoms, diagnosis, recomms, recipe)
    this.setState({
      date: '',
      purpose: '',
      symptoms: '',
      diagnosis: '',
      recomms: '',
      recipe: '',
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
    return (
      <form onSubmit={this.submitHandler} className={styles.CreateVFContainer}>
        <div className={styles.DFlex}>
          <div className={styles.VisitInf}>
            <div>
              Цель визита <span className={styles.noteText}>*</span>
            </div>
            <Duration hangeInputHandler={this.changeInputHandler} />
          </div>
          <div className={styles.VisitInf}>
            <div>
              Дата визита <span className={styles.noteText}>*</span>
            </div>
            <Date changeInputHandler={this.changeInputHandler} />
          </div>
        </div>
        <div className={styles.DFlexColumn}>
          <div className={styles.FormName}>Симптомы</div>
          <TextAreaBlock changeInputHandler={this.changeInputHandler} placeholder="Опишите симптомы" name="symptoms" />
          <div className={styles.FormName}>Диагноз</div>
          <InputBlock changeInputHandler={this.changeInputHandler} placeholder="Поставьте диагноз" name="diagnosis" />
          <div className={styles.FormName}>Рекомендации по лечению</div>
          <TextAreaBlock
            changeInputHandler={this.changeInputHandler}
            placeholder="Укажите рекомендации по лечению"
            name="recomms"
          />
          <div className={styles.FormName}>Рецепт</div>
          <InputBlock changeInputHandler={this.changeInputHandler} placeholder="Выпишете рецепт" name="recipe" />
        </div>
        <p className={styles.noteText}>* - обязательные для заполнения поля</p>
        <button type="submit" className={styles.saveButton}>
          Добавить
        </button>
      </form>
    )
  }
}

function Duration() {
  return (
    <div className={styles.mybox}>
      <span className={styles.myarrow} />
      <select className={styles.SelectInput}>
        <option>Осмотр</option>
        {/* <option>Прививка</option>
        <option>Стерилизация</option> */}
      </select>
    </div>
  )
}

function Date({ changeInputHandler }) {
  return (
    <input
      required
      type="text"
      onChange={changeInputHandler}
      // pattern="[A-Za-zА-Яа-яЁё]{2,25}"
      className={styles.InputBlock}
      // onChange={handleNameChange}
      name="date"
      defaultValue="24.10.2020"
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
