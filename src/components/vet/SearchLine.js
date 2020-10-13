import React from 'react'
import styles from '../../styles/vet/SearchLine.module.css'
import { ReactComponent as SearchButton } from '../../icons/search.svg'

function SearchLine() {
  return (
    <div className={styles.SearchContainer}>
      <SearchButton className={styles.SearchButton} />
      <input type="text" className={styles.SearchLine} placeholder="Поиск" />
    </div>
  )
}

export default SearchLine
