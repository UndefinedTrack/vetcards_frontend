import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/LinkButton.module.css'

function LinkButton({ nameButton }) {
  return <div className={styles.Button}>{nameButton}</div>
}

export default LinkButton

LinkButton.propTypes = {
  nameButton: PropTypes.string.isRequired,
}
