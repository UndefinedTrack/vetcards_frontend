import React from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/pet/Diary.module.css'
import HomeProcedure from './HomeProcedure'
import { ReactComponent as Search } from '../../icons/search.svg'
import { ReactComponent as Plus } from '../../icons/plus.svg'

function Reminders({ name, search, plusClick }) {
  return (
    <section className={styles.DiaryBlocks}>
      <div className={styles.NameAndSearch}>
        <div className={styles.Name}>{name}</div>
        <div className={styles.Buttons}>
          {search && <Search className={styles.Button} />}
          <Plus className={styles.Button} onClick={plusClick} />
        </div>
      </div>
      <hr className={styles.Line} />
      <section className={styles.Procedures}>
        <HomeProcedure />
        <HomeProcedure />
      </section>
    </section>
  )
}

Reminders.defaultProps = {
  plusClick: () => {},
}

Reminders.propTypes = {
  name: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
  plusClick: PropTypes.func,
}

export default Reminders
