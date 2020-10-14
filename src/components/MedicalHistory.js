/* eslint-disable react/prop-types */
import React from 'react'
import { connect } from 'react-redux'
import styles from '../styles/MedicalHistory.module.css'
import MedicalCard from './MedicalCard'
import { ReactComponent as Search } from '../icons/search.svg'
import { getVetProcs } from '../actions/procsList'

function MedicalHistory({ pet, procsList }) {
  return (
    <div className={styles.Container}>
      <div className={styles.NameAndSearch}>
        <div className={styles.Name}>История приёмов</div>
        <Search className={styles.SearchButton} />
      </div>
      <hr className={styles.Line} />
      <section className={styles.MedicalCardContainer}>
        {procsList.map((procs) => {
          return <MedicalCard pet={pet} key={`u${procsList.userId}p${procsList.petId}`} procsList={procsList} />
        })}
      </section>
    </div>
  )
}

const mapStateToProps = (state) => ({
  procsList: state.procsList.vetProcs,
})

const mapDispatchToProps = (dispatch) => ({
  getProcs: (pid, uid) => dispatch(getVetProcs(pid, uid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MedicalHistory)
