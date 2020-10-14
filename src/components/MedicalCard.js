/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/MedicalCard.module.css'

export default function MedicalCard({ pet, procsList }) {
  return (
    <section className={styles.MedicalCard}>
      <RecordName name="Осмотр" value="" />
      <RecordName name="Диагноз:" value={procsList[0].diagnosis} />
      <RecordName name="Рекомендации:" value={procsList[0].recomms} />
      <hr className={styles.Line} />
    </section>
  )
}

export function RecordName({ name, value = '' }) {
  return (
    <section className={styles.Card}>
      <div className={styles.Name}>{name}</div>
      <div className={styles.Value}>{value}</div>
    </section>
  )
}

RecordName.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}
