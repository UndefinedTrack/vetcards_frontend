import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/pet/Diary.module.css'
import Reminders from './Reminders'
import CreateReminder from './CreateReminder'
import CreateProcedure from './CreateProcedure'
import OwnerProcedures from './OwnerProcedures'
// import { ReactComponent as BackButton } from '../icons/back_button.svg'

function Diary({ uid }) {
  const [createProcedureWindow, setCreateProcedureWindow] = useState(false)
  const [createReminderWindow, setCreateReminderWindow] = useState(false)
  const [proc, setProc] = useState(undefined)
  const [notif, setNotif] = useState(undefined)

  return (
    <main className={styles.DiaryContainer}>
      {!createReminderWindow && (
        <Reminders
          className={styles.DiaryBlocks}
          name="Напоминания"
          search={false}
          uid={uid}
          plusClick={openCreateReminderWindow}
          setCreateReminderWindow={setCreateReminderWindow}
          setNotif={setNotif}
        />
      )}
      {createReminderWindow && <CreateReminder uid={uid} backClick={openCreateReminderWindow} notif={notif} />}
      {!createProcedureWindow && (
        <OwnerProcedures
          className={styles.DiaryBlocks}
          name="Домашние процедуры"
          uid={uid}
          search
          plusClick={openCreateProcedureWindow}
          setCreateProcedureWindow={setCreateProcedureWindow}
          setProc={setProc}
        />
      )}
      {createProcedureWindow && <CreateProcedure uid={uid} backClick={openCreateProcedureWindow} proc={proc} />}
    </main>
  )

  function openCreateProcedureWindow() {
    setCreateProcedureWindow(!createProcedureWindow)
    setProc(undefined)
  }

  function openCreateReminderWindow() {
    setCreateReminderWindow(!createReminderWindow)
    setNotif(undefined)
  }
}

Diary.propTypes = {
  uid: PropTypes.number.isRequired,
}

export default Diary
