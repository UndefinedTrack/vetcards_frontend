/* eslint-disable react/prop-types */
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from '../../styles/vet/PatientsCard.module.css'
import { getPetAvatar } from '../../actions/avatar'

function PatientCard({ patient, getAvatar }) {
  const token = localStorage.getItem('token')

  let avatarFullURL = ''
  if (patient.avatar !== '') {
    avatarFullURL = getAvatar(patient.avatar, token)
  }

  return (
    <div className={styles.PatientsContainer}>
      <AvatarImage avatarFullURL={avatarFullURL} />
      <div className={styles.PatientInfo}>
        <div className={styles.Column}>
          <Info sectionName="Пациент" value={patient.patient} />
          <Info sectionName="Владелец" value={patient.owner} />
          <Info sectionName="Номер карты" value={patient.card} />
        </div>
        {/* <Info sectionName="Окрас" value="Окрас" /> */}
        <div className={styles.Column}>
          <Info sectionName="Пол" value={patient.gender} />
          <Info sectionName="Дата рождения" value={patient.birthDate} />
          <Info sectionName="Чип" value={patient.chip} />
        </div>
      </div>
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
      {value && <div className={`${styles.InfoName} ${styles.InfoText}`}>{sectionName}</div>}
      <div className={`${styles.InfoData} ${styles.InfoText}`}>{sectionData}</div>
    </div>
  )
}

function HistoryButton({ pet }) {
  return (
    <Link to={`./visits-history/${pet.card}`} className={styles.HistoryLink}>
      <button type="button" className={styles.HistoryButton}>
        История приёмов
      </button>
    </Link>
  )
}

Info.propTypes = {
  sectionName: PropTypes.string.isRequired,
}

function AvatarImage({ avatarFullURL }) {
  console.log(avatarFullURL)
  if (avatarFullURL !== '') {
    return (
      <img src={avatarFullURL} alt='' className={styles.avatarShape} />
    )
  }
  return <div className={`${styles.avatarShape} ${styles.avatarSample}`} />
}


const mapDispatchToProps = (dispatch) => ({
  getAvatar: (avatarURL, token) => dispatch(getPetAvatar(avatarURL, token)),
})

export default connect(null, mapDispatchToProps)(PatientCard)
