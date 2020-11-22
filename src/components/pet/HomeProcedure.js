/* eslint-disable react/prop-types */
import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getOwnerProcs } from '../../actions/procsList'
import { deleteOwnerProc } from '../../actions/procsUpdate'
import styles from '../../styles/pet/Diary.module.css'
import { ReactComponent as More } from '../../icons/mdi_more_vert.svg'

function HomeProcedure({ proc, uid, date, setCreateProcedureWindow, setProc, deleteOwnProc, setDeleteProc }) {
  const formatter = new Intl.DateTimeFormat('ru')
  const procDate = formatter.format(date)
  const token = localStorage.getItem('token')
  const [openMenu, setOpenMenu] = useState(false)
  if (proc === undefined) {
    return <></>
  }

  function EditProc() {
    setCreateProcedureWindow(true)
    setProc(proc)
  }

  function OpenMenu() {
    setOpenMenu(!openMenu)
  }

  function deleteProc() {
    deleteOwnProc(uid, proc.procId, token)
    setDeleteProc(true)
    setOpenMenu(false)
  }

  return (
    <div>
      <div className={styles.ProcedureBlock}>
        <div className={styles.ProcedurePhoto} />
        <div className={styles.InformationBlock}>
          <div>{proc.name}</div>
          <div>{procDate}</div>
          <div>{proc.description}</div>
        </div>
        <More className={styles.MoreButton} onClick={OpenMenu} />
      </div>
      {openMenu && (
        <div className={styles.MoreMenu} id="edit-and-delete">
          <button type="button" id="edit-menu" className={`${styles.Option} ${styles.EditOption}`} onClick={EditProc}>
            Редактировать
          </button>
          <hr className={styles.OptionLine} />
          <button
            type="button"
            id="delete-menu"
            className={`${styles.Option} ${styles.DeleteOption}`}
            onClick={deleteProc}
          >
            Удалить
          </button>
        </div>
      )}
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  deleteOwnProc: (uid, procId, token) => dispatch(deleteOwnerProc(uid, procId, token)),
  getProc: (pid, uid, name, token) => dispatch(getOwnerProcs(pid, uid, name, token)),
})

export default connect(null, mapDispatchToProps)(HomeProcedure)
