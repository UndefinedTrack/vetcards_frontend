import React from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/vet/VisitsHistory.module.css'
import CreateVisitForm from './CreateVisitForm'
import MedicalHistoryForVet from './MedicalHistoryForVet'

function VisitsHistory({ uid }) {
  return (
    <main className={styles.VHContainer}>
      <div className={styles.VHContent}>
        <CreateVisitForm uid={uid} />
        <div className={styles.VLine} />
        <MedicalHistoryForVet uid={uid} />
      </div>
    </main>
  )
}

VisitsHistory.propTypes = {
  uid: PropTypes.number.isRequired,
}

export default VisitsHistory
