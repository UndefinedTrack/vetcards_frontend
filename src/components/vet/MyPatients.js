/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styles from '../../styles/vet/MyPatients.module.css'
import SearchLine from './SearchLine'
import PatientCard from './PatientCard'
import { searchPets } from '../../actions/petSearch'

function MyPatients({ patientsList, getPatients }) {
  const uid = 4
  let searchInput = ''

  if (patientsList === undefined) {
    patientsList = []
    getPatients(uid, searchInput)
  }

  useEffect(() => {
    if (!patientsList.length) {
      getPatients(uid, searchInput)
    }

    setTimeout(() => getPatients(uid, searchInput), 100)
    // eslint-disable-next-line
  }, [getPatients])

  return (
    <div className={styles.PatientsContainer}>
      <SearchLine changeInputHandler={changeInputHandler} />
      <section>
        {patientsList.map((patient) => (
          <PatientCard key={patient.card} patient={patient} />
        ))}
      </section>
    </div>
  )

  function changeInputHandler(event) {
    searchInput = event.target.value
    getPatients(uid, searchInput)
  }
}

const mapStateToProps = (state) => ({
  patientsList: state.petSearch.petsList,
})

const mapDispatchToProps = (dispatch) => ({
  getPatients: (uid, name) => dispatch(searchPets(uid, name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyPatients)
