import React from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/vet/PatientsCard.module.css'
import { ReactComponent as Photo } from '../../icons/photo.svg'

function PatientCard() {
  return (
    <div className={styles.PatientsContainer}>
      <Photo className={styles.Photo} />
      <Info sectionName="Пациент" />
      <Info sectionName="Владелец" />
      <Info sectionName="Номер карты" />
      <HistoryButton />
    </div>
  )
}

function Info({ sectionName }) {
  let sectionData
  if (sectionName === 'Пациент') {
    sectionData = 'Имя пациента'
  } else if (sectionName === 'Владелец') {
    sectionData = 'Имя владельца'
  } else {
    sectionData = '№ 666'
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
