/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styles from '../styles/MedicalHistory.module.css'
import MedicalCard from './MedicalCard'
import { ReactComponent as Search } from '../icons/search.svg'
import { getVetProcs } from '../actions/procsList'
// eslint-disable-next-line
function MedicalHistory({ pet, procsList, getVetProcs, procs, input }) {
  const uid = 4
  const pid = pet.petId
  const [searchLine, setSearchLine] = useState(false)

  if (procsList[0] === undefined) {
    procsList[0] = []
  }

  useEffect(() => {
    setTimeout(() => getVetProcs(pid, uid, ''), 100)
    // eslint-disable-next-line
  }, [])

  if (pid === procsList[0].petId && procs[pid] === undefined) {
    procs[pid] = procsList
  }

  return (
    <div className={styles.Container}>
      <div className={styles.NameAndSearch}>
        {!searchLine && <div className={styles.Name}>История приёмов</div>}
        {!searchLine && <Search onClick={searchLineDisplay} className={styles.SearchButton} />}
        {searchLine &&
          procs.map((procedures, ind) => {
            if (pet.petId !== procedures[0].petId) {
              return <></>
            }
            return (
              // eslint-disable-next-line
              <div key={ind}>
                <div className={styles.SearchContainer}>
                  <Search className={styles.SearchButton} />
                  <input type="text" onChange={changeInputHandler} className={styles.SearchLine} placeholder="Поиск" />
                </div>
              </div>
            )
          })}
      </div>
      <hr className={styles.Line} />
      <section className={styles.MedicalCardContainer}>
        {procs.map((procedures, ind) => {
          if (pet.petId !== procedures[0].petId) {
            return <></>
          }
          return (
            // eslint-disable-next-line
            <div key={ind}>
              <LoadProcedures procedures={procedures} />
            </div>
          )
        })}
      </section>
    </div>
  )

  function searchLineDisplay() {
    setSearchLine(!searchLine)
  }

  function changeInputHandler(event) {
    input[pid] = event.target.value
    getVetProcs(pid, uid, input[pid])
  }
}

function LoadProcedures({ procedures }) {
  return (
    <div>
      {procedures.map((proc, ind) => (
        // eslint-disable-next-line
        <MedicalCard key={ind} procs={proc} />
      ))}
    </div>
  )
}

const mapStateToProps = (state) => ({
  procsList: state.procsList.vetProcs,
})

const mapDispatchToProps = (dispatch) => ({
  getVetProcs: (pid, uid, name) => dispatch(getVetProcs(pid, uid, name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MedicalHistory)
