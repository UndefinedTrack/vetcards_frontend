/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { deleteVetProc } from '../actions/procsUpdate'
import styles from '../styles/MedicalCard.module.css'
import { ReactComponent as More } from '../icons/mdi_more_vert.svg'
import { getVetProcs } from '../actions/procsList'

function MedicalCard({ procs, isVet, setCurrentProc, deleteProc, uid, getProcs }) {
  const [openMenu, setOpenMenu] = useState(false)
  const token = localStorage.getItem('token')

  function openEditMenu() {
    setOpenMenu(!openMenu)
  }

  function editProc() {
    setCurrentProc(procs)
    setOpenMenu(false)
  }

  function deleteThisProc() {
    deleteProc(uid, procs.procId, token)
    setOpenMenu(false)
    setTimeout(() => getProcs(procs.petId, uid, '', token), 100)
  }

  if (procs !== undefined && procs.procDate !== undefined) {
    const year = procs.procDate.slice(0, 4)
    const month = procs.procDate.slice(5, 7)
    const day = procs.procDate.slice(8, 10)

    return (
      <section className={styles.MedicalCard}>
        <section className={styles.Card}>
          <div className={styles.VisitReason}>
            <div className={styles.NameAndDate}>
              <div className={styles.Name}>
                {procs.purpose}
                {procs.name !== '' && `,`} {procs.name}
              </div>
              <div className={styles.Date}>
                {day}.{month}.{year}
              </div>
            </div>
          </div>
          {isVet && procs.userId === uid && <More className={styles.MoreButton} onClick={openEditMenu} />}
          {openMenu && (
            <div className={styles.MoreMenu} id="edit-and-delete">
              <button
                type="button"
                id="edit-menu"
                className={`${styles.Option} ${styles.EditOption}`}
                onClick={editProc}
              >
                Редактировать
              </button>
              <hr className={styles.OptionLine} />
              <button
                type="button"
                id="delete-menu"
                className={`${styles.Option} ${styles.DeleteOption}`}
                onClick={deleteThisProc}
              >
                Удалить
              </button>
            </div>
          )}
        </section>
        <RecordName name="Симптомы:" value={procs.symptoms} />
        <RecordName name="Диагноз:" value={procs.diagnosis} />
        <RecordName name="Рекомендации:" value={procs.recomms} />
        <RecordName name="Рецепт:" value={procs.recipe} />
        <hr className={styles.Line} />
      </section>
    )
  }
  return <></>
}

export function RecordName({ name, value }) {
  return (
    <section className={styles.Card}>
      {value && (
        <div className={styles.DFlex}>
          <div className={styles.Name}>{name}</div>
          <div className={styles.Value}>{value}</div>
        </div>
      )}
    </section>
  )
}

RecordName.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  deleteProc: (uid, procId, token) => dispatch(deleteVetProc(uid, procId, token)),
  getProcs: (pid, uid, name, token) => dispatch(getVetProcs(pid, uid, name, token)),
})

export default connect(null, mapDispatchToProps)(MedicalCard)
