import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from '../styles/LinkButton.module.css'
import PopUpWindow from './PopUpWindow'

function LinkButton({ nameButton, href }) {
  const [popUpDispl, setPopUpDispl] = useState(false)
  return (
    <div>
      <PopUpWindow displ={popUpDispl} />
      {nameButton === 'Записаться на приём' && (
        <Link to={href} className={styles.Button} onClick={popUpWindow}>
          {nameButton}
        </Link>
      )}
      {nameButton !== 'Записаться на приём' && (
        <Link to={href} className={styles.Button}>
          {nameButton}
        </Link>
      )}
    </div>
  )

  function popUpWindow() {
    setPopUpDispl(true)
    setTimeout(() => {
      setPopUpDispl(false)
    }, 2000)
  }
}

LinkButton.propTypes = {
  nameButton: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
}

export default LinkButton
