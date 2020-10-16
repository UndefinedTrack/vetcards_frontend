import React from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/pet/Diary.module.css'
import HomeProcedure from './HomeProcedure'
import { ReactComponent as Search } from '../../icons/search.svg'
import { ReactComponent as Plus } from '../../icons/plus.svg'

function Reminders({ name }) {
  return (
    <section className={styles.DiaryBlocks}>
      <div className={styles.NameAndSearch}>
        <div className={styles.Name}>{name}</div>
        <div className={styles.Buttons}>
          <Search className={styles.Button} />
          <Plus className={styles.Button} />
        </div>
      </div>
      <hr className={styles.Line} />
      <section className={styles.Procedures}>
        <HomeProcedure />
        <HomeProcedure />
        <HomeProcedure />
        <HomeProcedure />
        <HomeProcedure />
        <HomeProcedure />
      </section>
    </section>
  )
}

Reminders.propTypes = {
  name: PropTypes.string.isRequired,
}

export default Reminders
