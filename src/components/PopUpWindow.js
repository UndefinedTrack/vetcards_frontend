import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/PopUpWindow.module.css'

function PopUpWindow({ displ, page }) {
  let styleDisplay = 'none'
  let message = 'Это демо-версия сервиса, поэтому на данный момент эта функция не реализована'
  if (displ === true) {
    styleDisplay = 'block'
  }
  if (page === true) {
    message = 'Это демо-версия сервиса, поэтому на данный момент эта страница отображается некорректно'
  }
  return (
    <div className={styles.Container} style={{ display: styleDisplay }}>
      {message}
    </div>
  )
}

PopUpWindow.defaultProps = {
  page: false,
}

PopUpWindow.propTypes = {
  displ: PropTypes.bool.isRequired,
  page: PropTypes.bool,
}

export default PopUpWindow
