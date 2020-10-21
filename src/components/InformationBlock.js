/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/InformationBlock.module.css'

export default function InformationBlock({ pet }) {
  return (
    <section className={styles.InformationBlock}>
      <InformationLine name="Вид:" value={pet.species} />
      {pet.breed && <InformationLine name="Порода:" value={pet.breed} />}
      {pet.color && <InformationLine name="Окрас:" value={pet.color} />}
      {pet.birthDate && <InformationLine name="Дата рождения:" value={pet.birthDate} />}
      {pet.gender && <InformationLine name="Пол:" value={pet.gender} />}
      {pet.chip && <InformationLine name="Чип:" value={pet.chip} />}
    </section>
  )
}

export function InformationLine({ name, value }) {
  return (
    <section className={styles.InformationLine}>
      <div className={styles.Name}>{name}</div>
      <div className={styles.Value}>{value}</div>
    </section>
  )
}

InformationLine.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}
