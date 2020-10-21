/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/vet/PatientsCard.module.css'
import { ReactComponent as Photo } from '../../icons/photo.svg'

function PatientCard({ patient }) {
  return (
    <div className={styles.PatientsContainer}>
      <Photo className={styles.Photo} />
      <Info sectionName="Пациент" value={patient.patient} />
      <Info sectionName="Владелец" value={patient.owner} />
      <Info sectionName="Номер карты" value={patient.card} />
      <HistoryButton />
    </div>
  )
}

function Info({ sectionName, value }) {
  let sectionData
  if (sectionName === 'Пациент') {
    sectionData = value
  } else if (sectionName === 'Владелец') {
    sectionData = value
  } else {
    sectionData = value
  }
  return (
    <div className={styles.InfoContainer}>
      <div className={`${styles.InfoName} ${styles.InfoText}`}>{sectionName}</div>
      <div className={`${styles.InfoData} ${styles.InfoText}`}>{sectionData}</div>
    </div>
  )
}

function HistoryButton() {
  return (
    <a href="/vetcards_frontend#/patient-history" type="button" className={styles.HistoryButton}>
      История приёмов
    </a>
  )
}

Info.propTypes = {
  sectionName: PropTypes.string.isRequired,
}

export default PatientCard
