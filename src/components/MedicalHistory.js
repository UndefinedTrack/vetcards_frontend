/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styles from '../styles/MedicalHistory.module.css'
import MedicalCard from './MedicalCard'
import { ReactComponent as Search } from '../icons/search.svg'
import { getVetProcs } from '../actions/procsList'
// eslint-disable-next-line
function MedicalHistory({ pet, procsList, getVetProcs, procs, input, setInput, searchString }) {
  const uid = 4
  const pid = pet.petId
  const [searchLine, setSearchLine] = useState(false)

  if (procsList[0] === undefined) {
    procsList[0] = []
  }

  useEffect(() => {
    if (searchString[pid] === undefined) {
      searchString[pid] = ''
    }
    setTimeout(() => getVetProcs(pid, uid, searchString[pid]), 100)
    // eslint-disable-next-line
  }, [getVetProcs, pid, input])

  if (pid === procsList[0].petId && procs[pid] === undefined) {
    procs[pid] = procsList
  }

  return (
    <div className={styles.Container}>
      <div className={styles.NameAndSearch}>
        {!searchLine && <div className={styles.Name}>История приёмов</div>}
        {!searchLine && <Search onClick={searchLineDisplay} className={styles.SearchButton} />}
        {searchLine && (
          <div className={styles.SearchContainer}>
            <Search className={styles.SearchButton} />
            <input type="text" onChange={changeInputHandler} className={styles.SearchLine} placeholder="Поиск" />
          </div>
        )}
      </div>
      <hr className={styles.Line} />
      <section className={styles.MedicalCardContainer}>
        {procs[pet.petId] === undefined && (
          <div className={styles.EmptyStoryContainer}>
            <div className={styles.EmptyStory}>Здесь будут появляться записи вашего ветеринара</div>
          </div>
        )}
        {procs.map((procedures) => {
          if (pet.petId !== procedures[0].petId) {
            return <div key={procedures[0].procId} />
          }
          return (
            <div key={procedures[0].procId}>
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
    searchString[pid] = event.target.value
    setInput(searchString[pid])
    getVetProcs(pid, uid, searchString[pid])
  }
}

function LoadProcedures({ procedures }) {
  return (
    <div>
      {procedures.map((proc) => (
        <MedicalCard key={proc.procId} procs={proc} />
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
