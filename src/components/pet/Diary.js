import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import styles from '../../styles/pet/Diary.module.css'
import Reminders from './Reminders'
import CreateProcedure from './CreateProcedure'
import OwnerProcedures from './OwnerProcedures'
// import { ReactComponent as BackButton } from '../icons/back_button.svg'

function Diary() {
  const [createWindow, setCreateWindow] = useState(false)
  return (
    <main className={styles.DiaryContainer}>
      <Reminders className={styles.DiaryBlocks} name="Напоминания" search={false} />
      {!createWindow && (
        <OwnerProcedures className={styles.DiaryBlocks} name="Домашние процедуры" search plusClick={openCreateWindow} />
      )}
      {createWindow && <CreateProcedure backClick={openCreateWindow} />}
    </main>
  )

  function openCreateWindow() {
    setCreateWindow(!createWindow)
  }
}

export default Diary
