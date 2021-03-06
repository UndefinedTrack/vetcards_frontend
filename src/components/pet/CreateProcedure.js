/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from '../../styles/pet/Diary.module.css'
import { createOwnerProc } from '../../actions/procsCreate'
import { updateOwnerProc } from '../../actions/procsUpdate'
import { getOwnerProcs } from '../../actions/procsList'
import { ReactComponent as BackButton } from '../../icons/mdi_keyboard_arrow_left.svg'

function CreateProcedure({ backClick, createProc, uid, proc, getProc, updateProc }) {
  const { pid } = useParams()
  const today = new Date()
  const formatter = new Intl.DateTimeFormat('ru')
  let defaultDate = formatter.format(today)
  const token = localStorage.getItem('token')
  let defaultProcName = ''
  let defaultRemark = ''

  if (proc !== undefined) {
    let day = proc.procDate.slice(8, 10)
    let month = Number(proc.procDate.slice(5, 7))
    const year = proc.procDate.slice(0, 4)
    if (String(month).length === 1) month = `0${month}`
    if (String(day).length === 1) day = `0${day}`
    defaultProcName = proc.name
    defaultDate = `${day}.${month}.${year}`
    defaultRemark = proc.description
  }

  const [state, setState] = useState({
    procedureName: defaultProcName,
    date: defaultDate,
    remark: defaultRemark,
  })

  return (
    <div className={styles.DiaryBlocks}>
      <div className={styles.NameAndSearch}>
        <BackButton className={styles.BackButton} onClick={backClick} />
        {!proc && <div className={`${styles.Name} ${styles.NewProcedureName}`}>Новая процедура</div>}
        {proc && <div className={`${styles.Name} ${styles.NewProcedureName}`}>Редактировать процедуру</div>}
      </div>
      <hr className={styles.Line} />
      <form className={styles.ProcedureContainer} onSubmit={submitHandler}>
        <div className={styles.ProcedureEntryBlock}>
          <div className={styles.ProcedureText}>Название процедуры</div>
          <span className={styles.noteText}>*</span>
        </div>
        <input
          type="text"
          className={styles.input}
          onChange={changeInputHandler}
          name="procedureName"
          required
          defaultValue={state.procedureName}
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
          placeholder={state.date}
          defaultValue={state.date}
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
          defaultValue={state.remark}
        />
        <p className={styles.noteText}>* - обязательные для заполнения поля</p>
        <button type="submit" className={styles.saveButton}>
          {!proc && <span>Добавить</span>}
          {proc && <span>Сохранить</span>}
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

    if (!proc) {
      createProc(pid, uid, state.procedureName, state.date, state.remark, token)
    } else {
      updateProc(uid, proc.procId, state.procedureName, state.date, state.remark, token)
    }
    setState({
      procedureName: '',
      date: '',
      remark: '',
    })

    getProc(pid, uid, '', token)
    backClick()
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
  getProc: (pid, uid, name, token) => dispatch(getOwnerProcs(pid, uid, name, token)),
  updateProc: (uid, procId, name, date, description, token) =>
    dispatch(updateOwnerProc(uid, procId, name, date, description, token)),
})

export default connect(null, mapDispatchToProps)(CreateProcedure)
