import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from '../styles/LinkButton.module.css'

// eslint-disable-next-line
function LinkButton({ nameButton, href, closeSearchString }) {
  return (
    <div>
      {nameButton === 'Записаться на приём' && (
        <Link to={href} className={styles.Button}>
          {nameButton}
        </Link>
      )}
      {nameButton !== 'Записаться на приём' && (
        <a href={href} className={styles.Button}>
          {nameButton}
        </a>
      )}
    </div>
  )
}

LinkButton.propTypes = {
  nameButton: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
}

export default LinkButton
