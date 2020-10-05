import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/MedicalCard.module.css'

export default function MedicalCard() {
  return (
    <section className={styles.MedicalCard}>
      <RecordName name="Осмотр" value="" />
      <RecordName name="Диагноз:" value="Пациент здоров" />
      <RecordName name="Рецепт:" value="Витаминки" />
      <hr className={styles.Line} />
    </section>
  )
}

export function RecordName({ name, value }) {
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
