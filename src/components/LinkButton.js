import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from '../styles/LinkButton.module.css'

function LinkButton({ nameButton, href }) {
  return (
    <Link to={href} className={styles.Button}>
      {nameButton}
    </Link>
  )
}

LinkButton.propTypes = {
  nameButton: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
}

export default LinkButton
