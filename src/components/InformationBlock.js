import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/InformationBlock.module.css'

export default function InformationBlock() {
  return (
    <section className={styles.InformationBlock}>
      <InformationLine name="Вид:" value="кот" />
      <InformationLine name="Порода:" value="беспородная" />
      <InformationLine name="Окрас:" value="чёрный" />
      <InformationLine name="Дата рождения:" value="01.09.2018" />
      <InformationLine name="Пол:" value="самка" />
      <InformationLine name="Чип:" value="000000000000000" />
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
