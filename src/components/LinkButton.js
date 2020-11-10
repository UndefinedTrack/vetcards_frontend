import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from '../styles/LinkButton.module.css'
import PopUpWindow from './PopUpWindow'

// eslint-disable-next-line
function LinkButton({ nameButton, href, closeSearchString }) {
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
        <a href={href} className={styles.Button}>
          {nameButton}
        </a>
        // <Link onClick={closeSearchString} to={href} className={styles.Button}>
        //   {nameButton}
        // </Link>
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
