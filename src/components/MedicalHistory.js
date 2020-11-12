/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styles from '../styles/MedicalHistory.module.css'
import MedicalCard from './MedicalCard'
import { ReactComponent as Search } from '../icons/search.svg'
import { getVetProcs } from '../actions/procsList'

function MedicalHistory({
  pet,
  procsList,
  // eslint-disable-next-line
  getVetProcs,
  procs,
  input,
  setInput,
  searchString,
  ind,
  searchLine,
  setSearchLine,
}) {
  const uid = 4
  const pid = pet.petId
  const token = localStorage.getItem('token')

  if (procsList[0] === undefined) {
    procsList[0] = []
  }

  useEffect(() => {
    if (searchString[pid] === undefined) {
      searchString[pid] = ''
    }
    setTimeout(() => {
      getVetProcs(pid, uid, searchString[pid], token)
      if (procs[pid] !== procsList) {
        procs[pid] = procsList
      }
    }, 100)
    // eslint-disable-next-line
  }, [getVetProcs, searchString[pid]])

  if (pid === procsList[0].petId && procs[pid] !== procsList) {
    procs[pid] = procsList
  }
  return (
    <div className={styles.Container}>
      <div className={styles.NameAndSearch}>
        {!(pet.petId === searchLine) && <div className={styles.Name}>История приёмов</div>}
        {!(pet.petId === searchLine) && <Search onClick={searchLineDisplay} className={styles.SearchButton} />}
        {pet.petId === searchLine && (
          <div className={styles.SearchContainer}>
            <Search className={styles.SearchButton} />
            <input
              type="text"
              // eslint-disable-next-line
              autoFocus
              onChange={changeInputHandler}
              id="search-input"
              className={styles.SearchLine}
              placeholder="Поиск"
            />
          </div>
        )}
      </div>
      <hr className={styles.Line} />
      <section className={styles.MedicalCardContainer}>
        {procs.map((procedures) => {
          if (pet.petId !== procedures[0].petId) {
            return <div key={procedures[0].procId} />
          }
          return (
            <div key={procedures[0].procId} className={procedures[0].procId}>
              <LoadProcedures
                procedures={procedures}
                searchString={searchString}
                pid={pid}
                uid={uid}
                getVetProcs={getVetProcs}
                procsList={procsList}
                procs={procs}
              />
            </div>
          )
        })}
        {(procs[pid] === undefined || procs[pid][0].length === 0) && (
          <div className={styles.EmptyStoryContainer}>
            <div className={styles.EmptyStory}>Здесь будут появляться записи вашего ветеринара</div>
          </div>
        )}
      </section>
    </div>
  )

  function searchLineDisplay() {
    setInput('')
    getVetProcs(searchLine, uid, '', token)
    setSearchLine(ind)
    getVetProcs(pid, uid, '', token)
    getVetProcs(ind, uid, '', token)
  }

  function changeInputHandler(event) {
    searchString[pid] = event.target.value
    setInput(searchString[pid])
  }
}
// eslint-disable-next-line
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
  getVetProcs: (pid, uid, name, token) => dispatch(getVetProcs(pid, uid, name, token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MedicalHistory)
