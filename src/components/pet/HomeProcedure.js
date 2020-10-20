/* eslint-disable react/prop-types */
import React from 'react'
// import PropTypes from 'prop-types'
import styles from '../../styles/pet/Diary.module.css'
import { ReactComponent as Photo } from '../../icons/photo.svg'
import { ReactComponent as More } from '../../icons/mdi_more_vert.svg'

function HomeProcedure({ proc }) {
  if (proc === undefined) {
    return <></>
  }
  console.log(proc)
  return (
    <div className={styles.ProcedureBlock}>
      <Photo />
      <div className={styles.InformationBlock}>
        <div>{proc.name}</div>
        <div>{proc.procDate}</div>
      </div>
      <More className={styles.MoreButton} />
    </div>
  )
}

export default HomeProcedure
