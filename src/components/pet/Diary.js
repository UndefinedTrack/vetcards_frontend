import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import styles from '../../styles/pet/Diary.module.css'
import Reminders from './Reminders'
import CreateReminder from './CreateReminder'
import CreateProcedure from './CreateProcedure'
import PopUpWindow from '../PopUpWindow'
import OwnerProcedures from './OwnerProcedures'
// import { ReactComponent as BackButton } from '../icons/back_button.svg'

function Diary() {
  const [createProcedureWindow, setCreateProcedureWindow] = useState(false)
  const [createReminderWindow, setCreateReminderWindow] = useState(false)
  const [popUpDispl, setPopUpDispl] = useState(false)

  return (
    <main className={styles.DiaryContainer}>
      {!createReminderWindow && (
        <Reminders
          className={styles.DiaryBlocks}
          name="Напоминания"
          search={false}
          plusClick={openCreateReminderWindow}
        />
      )}
      {createReminderWindow && <CreateReminder backClick={openCreateReminderWindow} />}
      {!createProcedureWindow && (
        <OwnerProcedures
          className={styles.DiaryBlocks}
          name="Домашние процедуры"
          search
          plusClick={openCreateProcedureWindow}
        />
      )}
      <PopUpWindow displ={popUpDispl} />
      {createProcedureWindow && <CreateProcedure backClick={openCreateProcedureWindow} />}
    </main>
  )

  function openCreateProcedureWindow() {
    setCreateProcedureWindow(!createProcedureWindow)
  }

  function openCreateReminderWindow() {
    if (!createReminderWindow) {
      setPopUpDispl(true)
      setTimeout(() => {
        setPopUpDispl(false)
      }, 2000)
    }
    setCreateReminderWindow(!createReminderWindow)
  }
}

export default Diary
