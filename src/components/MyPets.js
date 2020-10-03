import React from 'react'
import AboutPet from './AboutPet'
import MedicalHistory from './MedicalHistory'
import styles from '../styles/MyPets.module.css'

function MyPets() {
  return (
    <div className={styles.Container}>
      <AboutPet />
      <MedicalHistory />
    </div>
  )
}

export default MyPets
