/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from '../../styles/vet/PatientsCard.module.css'
import { ReactComponent as Photo } from '../../icons/photo.svg'

function PatientCard({ patient }) {
  console.log(patient)
  return (
    <div className={styles.PatientsContainer}>
      <Photo className={styles.Photo} />
      <Info sectionName="Пациент" value={patient.patient} />
      <Info sectionName="Окрас" value='Окрас' />
      <Info sectionName="Дата рождения" value='1970-01-01' />
      <Info sectionName="Пол" value='male' />
      <Info sectionName="Чип" value='000000000000000' />
      <Info sectionName="Владелец" value={patient.owner} />
      <Info sectionName="Номер карты" value={patient.card} />
      <HistoryButton pet={patient} />
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

function HistoryButton({ pet }) {
  return (
    <Link to="./visits-history" className={styles.HistoryLink}>
      <button type="button" className={styles.HistoryButton}>
        История приёмов
      </button>
    </Link>
  )
}

Info.propTypes = {
  sectionName: PropTypes.string.isRequired,
}

export default PatientCard
