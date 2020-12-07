/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { deleteVetProc } from '../actions/procsUpdate'
import styles from '../styles/MedicalCard.module.css'
import { ReactComponent as More } from '../icons/mdi_more_vert.svg'
import { getVetProcs } from '../actions/procsList'

function MedicalCard({ procs, isVet, setCurrentProc, deleteProc, uid, getProcs }) {
  const token = localStorage.getItem('token')

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
          <MoreWindow
            token={token}
            isVet={isVet}
            uid={uid}
            procs={procs}
            setCurrentProc={setCurrentProc}
            deleteProc={deleteProc}
            getProcs={getProcs}
          />
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

function MoreWindow({ isVet, uid, procs, token, setCurrentProc, deleteProc, getProcs }) {
  const [openMenu, setOpenMenu] = useState(false)

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

  const dropDown = React.useRef(null)

  function handleClickOutside(event) {
    if (openMenu) {
      if (!dropDown || !dropDown.current.contains(event.target)) {
        const openButton = document.querySelector('#moreButton')
        if (!event.path.includes(openButton)) {
          setOpenMenu(false)
        }
      }
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, false)
    return function cleanup() {
      document.removeEventListener('click', handleClickOutside, false)
    }
  })

  if (isVet && procs.userId === uid) {
    return(
      <div ref={dropDown} className={styles.MoreMenuWrapper}>
        <More id='moreButton' className={styles.MoreButton} onClick={openEditMenu} />
        <MoreMenu openMenu={openMenu} editProc={editProc} deleteThisProc={deleteThisProc} />
      </div>
    )
  }
  return null
}

MoreWindow.PropTypes ={
  isVet: PropTypes.bool.isRequired,
  uid: PropTypes.number.isRequired,
  setCurrentProc: PropTypes.func.isRequired,
  deleteProc: PropTypes.func.isRequired,
  getProcs: PropTypes.func.isRequired,
}

function MoreMenu({ openMenu, editProc, deleteThisProc }) {
  if (openMenu) {
    return (
      <div className={styles.MoreMenu} id='edit-and-delete'>
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
    )
  }
  return null
}

MoreMenu.propTypes = {
  openMenu: PropTypes.bool.isRequired,
  editProc: PropTypes.func.isRequired,
  deleteThisProc: PropTypes.func.isRequired,
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
