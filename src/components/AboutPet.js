/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import LinkButton from './LinkButton'
import InformationBlock from './InformationBlock'
import styles from '../styles/AboutPets.module.css'
// import { ReactComponent as PhotoPet } from '../icons/photo_pet.svg'
import { uploadPetAvatar } from '../actions/avatar'

function AboutPet({ pet, closeSearchString, uploadAvatar }) {
  const token = localStorage.getItem('token')

  function handleAvatarChange(image) {
    uploadAvatar(pet.userId, pet.petId, token, image)
  }

  return (
    <section className={styles.Container}>
      <div className={styles.PetName}>{pet.name}</div>
      <Avatar handleAvatarChange={handleAvatarChange} />
      <hr className={styles.Line} />
      <InformationBlock pet={pet} />
      <hr className={styles.Line} />
      <LinkButton nameButton="Записаться на приём" href="./my-acc" />
      <LinkButton closeSearchString={closeSearchString} nameButton="Дневник" href={`#/diary/${pet.petId}`} />
    </section>
  )
}

function Avatar({ handleAvatarChange }) {
  const [previewURL, setPreviewURL] = useState('')

  const imageInput = React.useRef(null)

  function handleButtonClick() {
    if (imageInput.current) {
      imageInput.current.click()
    }
  }

  function handleImageInput(event) {
    const image = event.target.files[0]
    if (image) {
      handleAvatarChange(image)
      setPreviewURL(URL.createObjectURL(image))
    }
  }

  return (
    <div>
      <div className={styles.avatarWrapper}>
        <AvatarImage previewURL={previewURL} />
        <button type="button" className={styles.changeAvatar} onClick={handleButtonClick}>
          Изменить фото
        </button>
        <input
          id="image"
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageInput}
          ref={imageInput}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  )
}

Avatar.propTypes = {
  handleAvatarChange: PropTypes.func.isRequired,
}

function AvatarImage({ previewURL }) {
  // if (avatarURL !== '') {
  //   return (
  //     <img src={avatarURL} alt='' className={styles.avatarShape} />
  //   )
  // }
  if (previewURL !== '') {
    return <img src={previewURL} alt="" className={styles.avatarShape} />
  }
  return <div className={`${styles.avatarShape} ${styles.avatarSample}`} />
}

AvatarImage.propTypes = {
  previewURL: PropTypes.string.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  uploadAvatar: (uid, pid, token, image) => dispatch(uploadPetAvatar(uid, pid, token, image)),
})

export default connect(null, mapDispatchToProps)(AboutPet)
