/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from '../../styles/vet/VisitsHistory.module.css'
import MedicalCard from '../MedicalCard'
import { ReactComponent as SearchButton } from '../../icons/search.svg'
import { getVetProcs } from '../../actions/procsList'

// eslint-disable-next-line
function MedicalHistoryForVet({ procsList, getVetProcs, uid, isVet, setCurrentProc }) {
  const { pid } = useParams()
  const [searchInput, setSearchInput] = useState('')
  const token = localStorage.getItem('token')

  if (procsList[pid] === undefined) {
    procsList[pid] = []
  }

  useEffect(() => {
    setTimeout(() => getVetProcs(pid, uid, searchInput, token), 10)
    // eslint-disable-next-line
  }, [getVetProcs, pid, searchInput])

  return (
    <div className={styles.CreateVFContainer}>
      <SearchLine changeInputHandler={changeInputHandler} />
      <section className={styles.CardsSection}>
        {procsList.length === 0 && (
          <div className={styles.EmptyStoryContainer}>
            <div className={styles.EmptyStory}>История приёмов пуста</div>
          </div>
        )}
        {procsList[pid]
          .map((procs) => {
            const day = procs.procDate.slice(8, 10)
            const month = Number(procs.procDate.slice(5, 7)) - 1
            const year = procs.procDate.slice(0, 4)
            const date = new Date(year, month, day)
            return (
              <MedicalCard
                key={procs.procId}
                uid={uid}
                procs={procs}
                date={date}
                isVet={isVet}
                setCurrentProc={setCurrentProc}
              />
            )
          })
          .reverse()
          .sort((a, b) => {
            return b.props.date - a.props.date
          })}
      </section>
    </div>
  )

  function changeInputHandler(event) {
    setSearchInput(event.target.value)
    // getVetProcs(pid, uid, searchInput, token)
  }
}

function SearchLine({ changeInputHandler }) {
  return (
    <div className={styles.SearchContainer}>
      <SearchButton className={styles.SearchButton} />
      <input type="text" onChange={changeInputHandler} className={styles.SearchLine} placeholder="Поиск" />
      <Duration />
    </div>
  )
}

function Duration() {
  return (
    <div className={styles.MyBoxFilter}>
      <span className={styles.MyArrowFilter} />
      <select className={styles.SelectInputFilter}>
        <option>Фильтры</option>
      </select>
    </div>
  )
}

const mapStateToProps = (state) => ({
  procsList: state.procsList.vetProcs,
  loading: state.procsList.loading,
})

const mapDispatchToProps = (dispatch) => ({
  getVetProcs: (pid, uid, name, token) => dispatch(getVetProcs(pid, uid, name, token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MedicalHistoryForVet)
