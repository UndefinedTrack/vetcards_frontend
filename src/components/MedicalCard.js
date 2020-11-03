/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/MedicalCard.module.css'

export default function MedicalCard({ procs }) {
  if (procs !== undefined && procs.procDate !== undefined) {
    const year = procs.procDate.slice(0, 4)
    const month = procs.procDate.slice(5, 7)
    const day = procs.procDate.slice(8, 10)
    return (
      <section className={styles.MedicalCard}>
        <section className={styles.Card}>
          <div className={styles.VisitReason}>
            <div className={styles.NameAndDate}>
              <div className={styles.Name}>{procs.purpose}</div>
              <div className={styles.Date}>
                {day}.{month}.{year}
              </div>
            </div>
          </div>
        </section>
        <RecordName name="Симптомы:" value={procs.symptoms} />
        <RecordName name="Диагноз:" value={procs.diagnosis} />
        <RecordName name="Рекомендации:" value={procs.recomms} />
        <RecordName name="Рецепт:" value={procs.recipe} />
        <hr className={styles.Line} />
      </section>
    )
  }
  return <></>
}

export function RecordName({ name, value }) {
  return (
    <section className={styles.Card}>
      {value && (
        <div className={styles.DFlex}>
          <div className={styles.Name}>{name}</div>
          <div className={styles.Value}>{value}</div>
        </div>
      )}
    </section>
  )
}

RecordName.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}
