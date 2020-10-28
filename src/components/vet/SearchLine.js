import React from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/vet/SearchLine.module.css'
import { ReactComponent as SearchButton } from '../../icons/search.svg'

function SearchLine({ changeInputHandler }) {
  return (
    <div className={styles.SearchContainer}>
      <SearchButton className={styles.SearchButton} />
      <input type="text" onChange={changeInputHandler} className={styles.SearchLine} placeholder="Поиск" />
    </div>
  )
}

SearchLine.propTypes = {
  changeInputHandler: PropTypes.func.isRequired,
}

export default SearchLine
