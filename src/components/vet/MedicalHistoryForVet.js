/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from '../../styles/vet/VisitsHistory.module.css'
import MedicalCard from '../MedicalCard'
import { ReactComponent as SearchButton } from '../../icons/search.svg'
import { getVetProcs } from '../../actions/procsList'
// eslint-disable-next-line
function MedicalHistoryForVet({ procsList, getVetProcs }) {
  const uid = 4
  const { pid } = useParams()
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    setTimeout(() => getVetProcs(pid, uid, searchInput), 100)
  }, [getVetProcs, pid, searchInput])
  return (
    <div className={styles.CreateVFContainer}>
      <SearchLine changeInputHandler={changeInputHandler} />
      <section className={styles.CardsSection}>
        {procsList.map((procs) => <MedicalCard key={procs.procId} procs={procs} />).reverse()}
      </section>
    </div>
  )

  function changeInputHandler(event) {
    setSearchInput(event.target.value)
    getVetProcs(pid, uid, searchInput)
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
})

const mapDispatchToProps = (dispatch) => ({
  getVetProcs: (pid, uid, name) => dispatch(getVetProcs(pid, uid, name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MedicalHistoryForVet)
