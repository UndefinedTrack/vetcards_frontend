/* eslint-disable react/prop-types */
import React from 'react'
import { connect } from 'react-redux'
import styles from '../../styles/vet/MyPatients.module.css'
import SearchLine from './SearchLine'
import PatientCard from './PatientCard'
import { getPatientsList } from '../../actions/profile'

function MyPatients({ patientsList, getPatients }) {
  return (
    <div className={styles.PatientsContainer}>
      <SearchLine />
      <section>
        <PatientCard />
        <PatientCard />
        <PatientCard />
        <PatientCard />
        <PatientCard />
        <PatientCard />
        <PatientCard />
        <PatientCard />
        <PatientCard />
        <PatientCard />
      </section>
    </div>
  )
}

const mapStateToProps = (state) => ({
  patientsList: state.profile.petsList,
})

const mapDispatchToProps = (dispatch) => ({
  getPatients: (uid) => dispatch(getPatientsList(uid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyPatients)
