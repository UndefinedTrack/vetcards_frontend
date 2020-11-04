/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/vet/VisitsHistory.module.css'
import { ReactComponent as ArrowDown } from '../icons/arrow_down_square.svg'
import { ReactComponent as ArrowUp } from '../icons/arrow_up.svg'

export default function DropDownList({ changeInputHandler, options }) {
  const [isVisible, setIsVisible] = useState(false)

  const [chosenOption, setChosenOption] = useState(options[0])

  function handleOptionClick(optionName) {
    setChosenOption(optionName)
    setIsVisible(false)
  }

  function handleArrowClick() {
    setIsVisible(!isVisible)
  }

  return (
    <div>
      <div className={styles.purposeBlock}>
        {chosenOption}
        <Arrow
          isVisible={isVisible}
          handleArrowClick={handleArrowClick}
        />
        <OptionsList
          isVisible={isVisible}
          handleOptionClick={handleOptionClick}
          options={options}
          changeInputHandler={changeInputHandler}
        />
      </div>
    </div>
  )
}

DropDownList.propTypes = {
  changeInputHandler: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
}

function Arrow({ isVisible, handleArrowClick }) {
  if (!isVisible) {
    return (
      <button
        type='button'
        onClick={handleArrowClick}
        className={styles.purposeArrowButton}
      >
        <ArrowDown />
      </button>
    )
  }
  return (
    <button
        type='button'
        onClick={handleArrowClick}
        className={styles.purposeArrowButton}
      >
        <ArrowUp />
      </button>
  )
}

Arrow.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  handleArrowClick: PropTypes.func.isRequired,
}

function OptionsList({ isVisible, handleOptionClick, options, changeInputHandler }) {
  const optionsComponents = []
  for (let i = 0; i < options.length; i += 1) {
    optionsComponents.push(
      <Option
        key={i}
        name={options[i]}
        handleOptionClick={handleOptionClick}
        changeInputHandler={changeInputHandler}
      />
    )
  }
  if (isVisible) {
    return (
      <div className={styles.purposeOptionsBox} >
        {optionsComponents}
      </div>
   )
  }
  return null
}

OptionsList.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  handleOptionClick: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  changeInputHandler: PropTypes.func.isRequired,
}

function Option({ name, handleOptionClick, changeInputHandler }) {
  return (
    <div className={styles.purposeOption}>
      <input
        id={name}
        type='checkbox'
        value={name}
        name='purpose'
        className={styles.purposeOptionInput}
        onClick={() => handleOptionClick(name)}
        onChange={changeInputHandler}
      />
      <label className={styles.purposeLabel} htmlFor={name}>{name}</label>
    </div>
  )
}

Option.propTypes = {
  name: PropTypes.string.isRequired,
  handleOptionClick: PropTypes.func.isRequired,
  changeInputHandler: PropTypes.func.isRequired,
}
