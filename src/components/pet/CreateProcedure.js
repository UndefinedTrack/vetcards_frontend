import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from '../../styles/pet/Diary.module.css'
import { createOwnerProc } from '../../actions/procsCreate'
import { ReactComponent as BackButton } from '../../icons/mdi_keyboard_arrow_left.svg'

function CreateProcedure({ backClick, createProc, uid }) {
  const { pid } = useParams()
  const today = new Date()
  const formatter = new Intl.DateTimeFormat('ru')
  const date = formatter.format(today)
  const token = localStorage.getItem('token')
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
          required
          pattern=".{3,}"
          title="Название процедуры должно содержать не менее 3 символов"
          maxLength="25"
          placeholder="Назовите процедуру"
        />
        <div className={styles.ProcedureEntryBlock}>
          <div className={styles.ProcedureText}>Дата проведения</div>
          <span className={styles.noteText}>*</span>
        </div>
        <input
          type="text"
          className={styles.input}
          onChange={changeInputHandler}
          required
          name="date"
          title="Введите дату в формате дд.мм.гггг"
          pattern="([0][1-9]|[1-2][1-9]|[1-3][1-1]|[1-3][0])\.([0][1-9]|[1][0-2])\.([1][0-9][0-9][0-9]|[2][0][0-1][0-9]|[2][0][2][0])"
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
        <button type="submit" className={styles.saveButton}>
          Добавить
        </button>
      </form>
    </div>
  )

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

    createProc(pid, uid, state.procedureName, state.date, state.remark, token)

    setState({
      procedureName: '',
      date: '',
      remark: '',
    })

    backClick()
    setTimeout(() => window.location.reload(), 100)
  }
}

CreateProcedure.propTypes = {
  backClick: PropTypes.func.isRequired,
  createProc: PropTypes.func.isRequired,
  uid: PropTypes.number.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  createProc: (pid, uid, name, date, description, token) =>
    dispatch(createOwnerProc(pid, uid, name, date, description, token)),
})

export default connect(null, mapDispatchToProps)(CreateProcedure)
