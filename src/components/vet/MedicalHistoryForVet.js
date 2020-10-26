/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from '../../styles/vet/VisitsHistory.module.css'
import MedicalCard from '../MedicalCard'
import { ReactComponent as SearchButton } from '../../icons/search.svg'
import { getVetProcs } from '../../actions/procsList'
// eslint-disable-next-line
function MedicalHistoryForVet({ procsList, getVetProcs }) {
  const uid = 2
  const { pid } = useParams()

  useEffect(() => {
    setTimeout(() => getVetProcs(pid, uid), 100)
    // eslint-disable-next-line
  }, [getVetProcs, procsList])
  return (
    <div className={styles.CreateVFContainer}>
      <SearchLine />
      <section className={styles.CardsSection}>
        {procsList
          .map((procs, ind) => (
            // eslint-disable-next-line
            <MedicalCard key={ind} procs={procs} />
          ))
          .reverse()}
      </section>
    </div>
  )
}

function SearchLine() {
  return (
    <div className={styles.SearchContainer}>
      <SearchButton className={styles.SearchButton} />
      <input type="text" className={styles.SearchLine} placeholder="Поиск" />
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
  getVetProcs: (pid, uid) => dispatch(getVetProcs(pid, uid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MedicalHistoryForVet)
