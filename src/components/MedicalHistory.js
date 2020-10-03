import React from 'react'
import styles from '../styles/MedicalHistory.module.css'
import MedicalCard from './MedicalCard'
import { ReactComponent as Search } from '../icons/search.svg'

function MedicalHistory() {
  return (
    <div className={styles.Container}>
      <div className={styles.NameAndSearch}>
        <div className={styles.Name}>История приёмов</div>
        <Search className={styles.SearchButton} />
      </div>
      <hr className={styles.Line} />
      <section className={styles.MedicalCardContainer}>
        <MedicalCard />
        <MedicalCard />
        <MedicalCard />
        <MedicalCard />
        <MedicalCard />
        <MedicalCard />
        <MedicalCard />
        <MedicalCard />
        <MedicalCard />
      </section>
    </div>
  )
}

export default MedicalHistory
