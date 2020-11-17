/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styles from '../styles/MedicalHistory.module.css'
import MedicalCard from './MedicalCard'
import { ReactComponent as Search } from '../icons/search.svg'
import { getVetProcs } from '../actions/procsList'

// eslint-disable-next-line
function MedicalHistory({ pet, uid, procsList, ind, searchLine, setSearchLine, getVetProcs, loading }) {
  const pid = pet.petId
  const [input, setInput] = useState('')
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (uid !== -1) {
      setTimeout(() => getVetProcs(pid, uid, input, token), 100)
    }
  }, [input, getVetProcs, pid, token, uid])

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
        {procsList && procsList[pid] && procsList[pid].map((proc) => <MedicalCard key={proc.procId} procs={proc} />)}
        {procsList[pid] && procsList[pid].length === 0 && (
          <div className={styles.EmptyStoryContainer}>
            <div className={styles.EmptyStory}>Здесь будут появляться записи вашего ветеринара</div>
          </div>
        )}
      </section>
    </div>
  )

  function searchLineDisplay() {
    setSearchLine(ind)
  }

  function changeInputHandler(event) {
    setInput(event.target.value)
  }
}

const mapStateToProps = (state) => ({
  procsList: state.procsList.vetProcs,
  loading: state.procsList.loading,
})

const mapDispatchToProps = (dispatch) => ({
  getVetProcs: (pid, uid, name, token) => dispatch(getVetProcs(pid, uid, name, token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MedicalHistory)
