import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import styles from '../../styles/pet/Diary.module.css'
import Reminders from './Reminders'
import CreateReminder from './CreateReminder'
import CreateProcedure from './CreateProcedure'
import OwnerProcedures from './OwnerProcedures'
// import { ReactComponent as BackButton } from '../icons/back_button.svg'

function Diary() {
  const [createProcedureWindow, setCreateProcedureWindow] = useState(false)
  const [createReminderWindow, setCreateReminderWindow] = useState(false)

  return (
    <main className={styles.DiaryContainer}>
      {!createReminderWindow && (
        <Reminders className={styles.DiaryBlocks} name="Напоминания" search={false} plusClick={openCreateReminderWindow} />
      )}
      {createReminderWindow && <CreateReminder backClick={openCreateReminderWindow} />}
      {!createProcedureWindow && (
        <OwnerProcedures className={styles.DiaryBlocks} name="Домашние процедуры" search plusClick={openCreateProcedureWindow} />
      )}
      {createProcedureWindow && <CreateProcedure backClick={openCreateProcedureWindow} />}
    </main>
  )

  function openCreateProcedureWindow() {
    setCreateProcedureWindow(!createProcedureWindow)
  }

  function openCreateReminderWindow() {
    setCreateReminderWindow(!createReminderWindow)
  }
}

export default Diary
