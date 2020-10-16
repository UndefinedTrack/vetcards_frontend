import React from 'react'
// import PropTypes from 'prop-types'
import styles from '../../styles/pet/Diary.module.css'
import Reminders from './Reminders'
// import { ReactComponent as BackButton } from '../icons/back_button.svg'

function Diary() {
  return (
    <main className={styles.DiaryContainer}>
      <Reminders className={styles.DiaryBlocks} name="Напоминания" />
      <Reminders className={styles.DiaryBlocks} name="Домашние процедуры" />
    </main>
  )
}

export default Diary
