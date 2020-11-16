/* eslint-disable react/prop-types */
import React from 'react'
import LinkButton from './LinkButton'
import InformationBlock from './InformationBlock'
import styles from '../styles/AboutPets.module.css'
import { ReactComponent as PhotoPet } from '../icons/photo_pet.svg'

function AboutPet({ pet, closeSearchString }) {
  return (
    <section className={styles.Container}>
      <div className={styles.PetName}>{pet.name}</div>
      <PhotoPet className={styles.PhotoPet} />
      <hr className={styles.Line} />
      <InformationBlock pet={pet} />
      <hr className={styles.Line} />
      <LinkButton nameButton="Записаться на приём" href="./my-acc" />
      <LinkButton closeSearchString={closeSearchString} nameButton="Дневник" href={`#/diary/${pet.petId}`} />
    </section>
  )
}

export default AboutPet
