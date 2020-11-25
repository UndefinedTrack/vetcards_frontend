/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from '../../styles/vet/PatientsCard.module.css'
import { ReactComponent as PhotoPet } from '../../icons/photo_pet.svg'
import { getPetAvatar } from '../../actions/avatar'

function PatientCard({ patient, getAvatar, avatarFullURL }) {
  const token = localStorage.getItem('token')
  const pid = patient.card

  useEffect(() => {
    if (patient.avatar) {
      getAvatar(pid, patient.avatar, token)
    }
  })

  return (
    <div className={styles.PatientsContainer}>
      <AvatarImage avatarFullURL={avatarFullURL} pid={pid}/>
      <div className={styles.PatientInfo}>
        <div className={styles.Column}>
          <Info sectionName="Пациент" value={patient.patient} />
          <Info sectionName="Владелец" value={patient.owner} />
          <Info sectionName="Номер карты" value={patient.card} />
        </div>
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
  return (
    <div className={styles.InfoContainer}>
      {value && <div className={`${styles.InfoName} ${styles.InfoText}`}>{sectionName}</div>}
      <div className={`${styles.InfoData} ${styles.InfoText}`}>{value}</div>
    </div>
  )
}

function HistoryButton({ pet }) {
  return (
    <div className={styles.Buttons}>
      <Link to={`./visits-history/${pet.card}`} className={styles.HistoryLink}>
        <button type="button" className={styles.HistoryButton}>
          История приёмов
        </button>
      </Link>
      <Link to={`./edit-client-information/${pet.ownerId}`} className={styles.HistoryLink}>
        <button type="button" className={styles.HistoryButton}>
          О клиенте
        </button>
      </Link>
    </div>
  )
}

Info.propTypes = {
  sectionName: PropTypes.string.isRequired,
}

function AvatarImage({ avatarFullURL, pid }) {
  if (avatarFullURL[pid]) {
    return <img src={avatarFullURL[pid]} alt="" className={styles.avatarShape} />
  }
  return <PhotoPet className={styles.avatarShape} />
}

AvatarImage.propTypes = {
  avatarFullURL: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
  avatarFullURL: state.avatar.avatar,
})

const mapDispatchToProps = (dispatch) => ({
  getAvatar: (pid, avatarURL, token) => dispatch(getPetAvatar(pid, avatarURL, token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PatientCard)
