/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/InformationBlock.module.css'

export default function InformationBlock({ pet }) {
  return (
    <section className={styles.InformationBlock}>
      <InformationLine name="Вид:" value={pet.species} />
      <InformationLine name="Порода:" value="беспородная" />
      <InformationLine name="Окрас:" value={pet.color} />
      <InformationLine name="Дата рождения:" value={pet.birthDate} />
      <InformationLine name="Пол:" value={pet.gender} />
      <InformationLine name="Чип:" value={pet.chip} />
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
