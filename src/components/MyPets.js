import React from 'react'
import AboutPet from './AboutPet'
import MedicalHistory from './MedicalHistory'
import styles from '../styles/MyPets.module.css'

function MyPets() {
  const userHasPet = false
  return (
    <div>
      {!userHasPet && (
        <div className={styles.NotPet}>
          <div className={styles.NotPetText}>У вас нет ни одного питомца :(</div>
          <a href="create-pet" className={styles.NotPetButton}>
            Добавить!
          </a>
        </div>
      )}
      {userHasPet && (
        <div className={styles.Container}>
          <AboutPet />
          <MedicalHistory />
        </div>
      )}
    </div>
  )
}

export default MyPets
