import React from 'react'
import styles from '../../styles/vet/MyPatients.module.css'
import SearchLine from './SearchLine'
import PatientCard from './PatientCard'

function MyPatients() {
  return (
    <div className={styles.PatientsContainer}>
      <SearchLine />
      <section>
        <PatientCard />
        <PatientCard />
        <PatientCard />
        <PatientCard />
        <PatientCard />
        <PatientCard />
        <PatientCard />
        <PatientCard />
        <PatientCard />
        <PatientCard />
      </section>
    </div>
  )
}

export default MyPatients
