import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from '../styles/HeaderButton.module.css'

function HeaderButton({ header }) {
  let nameHeader
  if (header === 'Мои питомцы') nameHeader = 'mypets'
  else nameHeader = 'profile'
  return (
    <Link to={`${nameHeader}`} className={styles.HeaderButton}>
      {header}
    </Link>
  )
}

HeaderButton.propTypes = {
  header: PropTypes.string.isRequired,
}

export default HeaderButton
