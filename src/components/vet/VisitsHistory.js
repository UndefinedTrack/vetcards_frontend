import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/vet/VisitsHistory.module.css'
import CreateVisitForm from './CreateVisitForm'
import MedicalHistoryForVet from './MedicalHistoryForVet'
import AboutPatient from './AboutPatient'

function VisitsHistory({ uid, isVet }) {
  const [currentProc, setCurrentProc] = useState(undefined)
  return (
    <main className={styles.VHContainer}>
      <div className={styles.VisitsHistoryWindow}>
        <AboutPatient uid={uid} />
        <div className={styles.VHContent}>
          <CreateVisitForm uid={uid} currentProc={currentProc} setCurrentProc={setCurrentProc} />
          <div className={styles.VLine} />
          <MedicalHistoryForVet uid={uid} isVet={isVet} setCurrentProc={setCurrentProc} />
        </div>
      </div>
    </main>
  )
}

VisitsHistory.propTypes = {
  uid: PropTypes.number.isRequired,
  isVet: PropTypes.bool.isRequired,
}

export default VisitsHistory
