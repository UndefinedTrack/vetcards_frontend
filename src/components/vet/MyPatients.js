/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styles from '../../styles/vet/MyPatients.module.css'
import SearchLine from './SearchLine'
import PatientCard from './PatientCard'
import { searchPets } from '../../actions/petSearch'

function MyPatients({ patientsList, getPatients, uid }) {
  let searchInput = ''
  const token = localStorage.getItem('token')

  if (patientsList === undefined) {
    patientsList = []
    getPatients(uid, searchInput, token)
  }

  useEffect(() => {
    if (!patientsList.length) {
      getPatients(uid, searchInput, token)
    }

    setTimeout(() => getPatients(uid, searchInput, token), 100)
    // eslint-disable-next-line
  }, [getPatients, uid])

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
    getPatients(uid, searchInput, token)
  }
}

const mapStateToProps = (state) => ({
  patientsList: state.petSearch.petsList,
})

const mapDispatchToProps = (dispatch) => ({
  getPatients: (uid, name, token) => dispatch(searchPets(uid, name, token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyPatients)
