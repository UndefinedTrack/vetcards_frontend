import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from '../../styles/pet/Diary.module.css'
import { createOwnerProc } from '../../actions/procsCreate'
import { ReactComponent as BackButton } from '../../icons/mdi_keyboard_arrow_left.svg'

function CreateProcedure({ backClick, createProc }) {
  const { pid } = useParams()
  const today = new Date()
  const formatter = new Intl.DateTimeFormat('ru')
  const date = formatter.format(today)
  const [state, setState] = useState({
    procedureName: '',
    date,
    remark: '',
  })

  return (
    <div className={styles.DiaryBlocks}>
      <div className={styles.NameAndSearch}>
        <BackButton className={styles.BackButton} onClick={backClick} />
        <div className={`${styles.Name} ${styles.NewProcedureName}`}>Новая процедура</div>
      </div>
      <hr className={styles.Line} />
      <form className={styles.ProcedureContainer} onSubmit={submitHandler}>
        <div className={styles.ProcedureEntryBlock}>
          <div className={styles.ProcedureText}>Тип процедуры</div>
          <span className={styles.noteText}>*</span>
        </div>
        <input
          type="text"
          className={styles.input}
          onChange={changeInputHandler}
          name="procedureName"
          placeholder="Выберите процедуру"
        />
        <div className={styles.ProcedureEntryBlock}>
          <div className={styles.ProcedureText}>Дата проведения</div>
          <span className={styles.noteText}>*</span>
        </div>
        <input
          type="text"
          className={styles.input}
          onChange={changeInputHandler}
          name="date"
          placeholder={date}
          defaultValue={date}
        />
        <div className={styles.ProcedureEntryBlock}>
          <div className={styles.ProcedureText}>Примечание</div>
        </div>
        <textarea
          type="text"
          className={styles.input}
          onChange={changeInputHandler}
          name="remark"
          placeholder="Оставьте примечание"
        />
        <p className={styles.noteText}>* - обязательные для заполнения поля</p>
        <button type="submit" onClick={update} className={styles.saveButton}>
          Добавить
        </button>
      </form>
    </div>
  )

  function update() {
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

  function submitHandler(event) {
    event.preventDefault()

    createProc(pid, 3, state.procedureName, state.date, state.remark)

    setState({
      procedureName: '',
      date: '',
      remark: '',
    })

    backClick()
  }
}

CreateProcedure.propTypes = {
  backClick: PropTypes.func.isRequired,
  createProc: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  createProc: (pid, uid, name, date, description) => dispatch(createOwnerProc(pid, uid, name, date, description)),
})

export default connect(null, mapDispatchToProps)(CreateProcedure)
