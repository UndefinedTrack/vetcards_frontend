import React from 'react'
import { HashLink } from 'react-router-hash-link'
import PropTypes from 'prop-types'
import styles from '../../styles/mainPage/MainPageHeader.module.css'

function HeaderButton({ buttonName, buttonStyles, header }) {
  const hashLink = React.useRef(null)
  
  function handleButtonClick() {
    if (hashLink.current) {
      hashLink.current.click()
    }
  }

  return (
    <div>
      {buttonStyles === 'enabled' && (
        <div>
          <button
            type='button'
            className={`${styles.Enabled} ${styles.Button}`}
            onClick={handleButtonClick}
          >
            <p>{buttonName}</p>
          </button>
          <HashLink smooth to='#top' ref={hashLink} />
        </div>
      )}
      {buttonStyles === 'disabled' && (
        <div>
          <button
            type='button'
            className={`${styles.Disabled} ${styles.Button}`}
            onClick={handleButtonClick}
          >
            <p>{buttonName}</p>
          </button>
          <HashLink to={`${header}#`} ref={hashLink} />
        </div>
      )}
    </div>
  )
}

HeaderButton.propTypes = {
  buttonName: PropTypes.string.isRequired,
  buttonStyles: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
}

export default HeaderButton
