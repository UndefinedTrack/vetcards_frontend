import React from 'react'
// import PropTypes from 'prop-types'
import styles from '../../styles/pet/Diary.module.css'
import { ReactComponent as Photo } from '../../icons/photo.svg'
import { ReactComponent as More } from '../../icons/mdi_more_vert.svg'

function HomeProcedure() {
  return (
    <div className={styles.ProcedureBlock}>
      <Photo />
      <div className={styles.InformationBlock}>
        <div>Обработка от блох</div>
        <div>14.10.2020</div>
      </div>
      <More className={styles.MoreButton} />
    </div>
  )
}

export default HomeProcedure
