/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import LinkButton from './LinkButton'
import InformationBlock from './InformationBlock'
import styles from '../styles/AboutPets.module.css'
import { ReactComponent as PhotoPet } from '../icons/photo_pet.svg'
import { uploadPetAvatar, getPetAvatar } from '../actions/avatar'

function AboutPet({ pet, closeSearchString, uploadAvatar, getAvatar, avatarFullURL }) {
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (pet.avatar) {
      getAvatar(pet.petId, pet.avatar, token)
    }
    // eslint-disable-next-line
  }, [pet.avatar])

  function handleAvatarChange(image) {
    uploadAvatar(pet.userId, pet.petId, token, image)
  }

  return (
    <section className={styles.Container}>
      <div className={styles.Block}>
        <div className={styles.AvatarAndName}>
          <div className={styles.PetName}>{pet.name}</div>
          <Avatar handleAvatarChange={handleAvatarChange} avatarFullURL={avatarFullURL} pid={pet.petId} />
        </div>
        <hr className={styles.Line} />
        <InformationBlock pet={pet} />
      </div>
      <hr className={styles.Line} />
      <div className={styles.LinkButton}>
        <LinkButton closeSearchString={closeSearchString} nameButton="Дневник" href={`#/diary/${pet.petId}`} />
      </div>
    </section>
  )
}

function Avatar({ handleAvatarChange, avatarFullURL, pid }) {
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
        <AvatarImage previewURL={previewURL} avatarFullURL={avatarFullURL} pid={pid} />
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
  // avatarFullURL: PropTypes.array.isRequired,
  handleAvatarChange: PropTypes.func.isRequired,
}

function AvatarImage({ previewURL, avatarFullURL, pid }) {
  if (avatarFullURL && avatarFullURL[pid]) {
    return <img src={avatarFullURL[pid]} alt="" className={styles.avatarShape} />
  }
  if (previewURL !== '') {
    return <img src={previewURL} alt="" className={styles.avatarShape} />
  }
  return <PhotoPet className={styles.avatarShape} />
}

AvatarImage.propTypes = {
  avatarFullURL: PropTypes.array.isRequired,
  previewURL: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  avatarFullURL: state.avatar.avatar,
})

const mapDispatchToProps = (dispatch) => ({
  getAvatar: (pid, avatarURL, token) => dispatch(getPetAvatar(pid, avatarURL, token)),
  uploadAvatar: (uid, pid, token, image) => dispatch(uploadPetAvatar(uid, pid, token, image)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AboutPet)
