/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styles from '../../styles/vet/MyPatients.module.css'
import SearchLine from './SearchLine'
import PatientCard from './PatientCard'
import { getPatientsList } from '../../actions/profile'

function MyPatients({ patientsList, getPatients }) {
  const uid = 1

  if (patientsList === undefined) {
    patientsList = []
    getPatients(uid)
  }

  useEffect(() => {
    if (!patientsList.length) {
      getPatients(uid)
    }

    setTimeout(() => getPatients(uid), 100)
    // eslint-disable-next-line
  }, [getPatients])

  console.log(patientsList)

  return (
    <div className={styles.PatientsContainer}>
      <SearchLine />
      <section>
        {patientsList.map((patient) => (
          <PatientCard key={patient.card} patient={patient} />
        ))}
      </section>
    </div>
  )
}

const mapStateToProps = (state) => ({
  patientsList: state.profile.patientsList,
})

const mapDispatchToProps = (dispatch) => ({
  getPatients: (uid) => dispatch(getPatientsList(uid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyPatients)
