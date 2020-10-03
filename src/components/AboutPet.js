import React from 'react'
import LinkButton from './LinkButton'
import InformationBlock from './InformationBlock'
import styles from '../styles/AboutPets.module.css'
import { ReactComponent as PhotoPet } from '../icons/photo_pet.svg'

function AboutPet() {
  return (
    <section className={styles.Container}>
      <div className={styles.PetName}>Ночка</div>
      <PhotoPet className={styles.PhotoPet} />
      <hr className={styles.Line} />
      <InformationBlock />
      <hr className={styles.Line} />
      <LinkButton nameButton="Записаться на приём" />
      <LinkButton nameButton="Дневник" />
    </section>
  )
}

export default AboutPet
