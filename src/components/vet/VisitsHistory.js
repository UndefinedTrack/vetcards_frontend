import React from 'react'
import styles from '../../styles/vet/VisitsHistory.module.css'
import CreateVisitForm from './CreateVisitForm'
import MedivalHistoryForVet from './MedicalHistoryForVet'

function VisitsHistory() {
  return (
    <main className={styles.VHContainer}>
      <div className={styles.VHContent}>
        <CreateVisitForm />
        <div className={styles.VLine} />
        <MedivalHistoryForVet />
      </div>
    </main>
  )
}

export default VisitsHistory
