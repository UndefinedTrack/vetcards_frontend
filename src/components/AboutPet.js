/* eslint-disable react/prop-types */
import React from 'react'
import { connect } from 'react-redux'
import LinkButton from './LinkButton'
import InformationBlock from './InformationBlock'
import styles from '../styles/AboutPets.module.css'
import { ReactComponent as PhotoPet } from '../icons/photo_pet.svg'
import { getPetInfo } from '../actions/petInfo'

function AboutPet({ pet }) {
  return (
    <section className={styles.Container}>
      <div className={styles.PetName}>{pet.name}</div>
      <PhotoPet className={styles.PhotoPet} />
      <hr className={styles.Line} />
      <InformationBlock pet={pet} />
      <hr className={styles.Line} />
      <LinkButton nameButton="Записаться на приём" href="./" />
      <LinkButton nameButton="Дневник" href={`./diary/${pet.petId}`} />
    </section>
  )
}

const mapStateToProps = (state) => ({
  petInfo: state.petInfo.pet,
})

const mapDispatchToProps = (dispatch) => ({
  getInfo: (pid, uid) => dispatch(getPetInfo(pid, uid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AboutPet)
