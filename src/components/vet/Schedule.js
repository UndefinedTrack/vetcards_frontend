import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from '../../styles/vet/Schedule.module.css'
import { ReactComponent as WeekBackButtonSvg } from '../../icons/arrow_back_week.svg'
import { ReactComponent as WeekForwardButtonSvg } from '../../icons/arrow_forward_week.svg'
import { ReactComponent as SettingsSvg } from '../../icons/settings.svg'

function Schedule() {
  const scheduleArray = []
  for (let i = 0; i < 7; i += 1) {
    scheduleArray.push(
      <DayColumn
        dayOfWeek='ПН'
        date='01.01.2020'
      />
    )
  }
  return (
    <div className={styles.scheduleSpace} >
      <WeekBackButtonSvg className={styles.arrows} />
      {scheduleArray}
      <div className={styles.arrowAndSettingsWrapper}>
        <Link to='/create-schedule' >
          <SettingsSvg className={styles.settings} />
        </Link>
        <WeekForwardButtonSvg className={styles.arrows} />
      </div>
    </div>
  )
}

function DayColumn({ dayOfWeek, date }) {
  const timeSlotArray = []
  for (let i = 0; i < 10; i += 1 ) {
    timeSlotArray.push(
    <TimeSlot
      isVacant={false}
      startTime='10:00'
      endTime='10:15'
      purpose='Осмотр'
    />
    )
  }
  return (
    <div className={styles.dayColumn} >
      <p className={styles.weekDayText} >{dayOfWeek}, {date}</p>
      <hr className={styles.hr} />
      {timeSlotArray}
    </div>
  )
}

DayColumn.propTypes = {
  dayOfWeek: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
}

function TimeSlot({ isVacant, purpose, startTime, endTime, patientId }) {
  if (isVacant) {
    return (
      <div className={styles.timeSlotVacant} >
        <p className={styles.text} >{startTime} - {endTime}</p>
      </div>
    )
  }
  return (
    <div className={styles.timeSlotTaken} >
      <p className={styles.text} >{startTime} - {endTime}</p>
      <p className={styles.text} >{purpose}</p>
    </div>
  )
}

TimeSlot.propTypes = {
  isVacant: PropTypes.bool.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  // eslint-disable-next-line
  purpose: PropTypes.string,
  // eslint-disable-next-line
  patientId: PropTypes.number,
}

export default Schedule
