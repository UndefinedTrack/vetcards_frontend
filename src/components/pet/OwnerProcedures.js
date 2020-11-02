/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from '../../styles/pet/Diary.module.css'
import HomeProcedure from './HomeProcedure'
import { getOwnerProcs } from '../../actions/procsList'
import { ReactComponent as Search } from '../../icons/search.svg'
import { ReactComponent as Plus } from '../../icons/plus.svg'

// eslint-disable-next-line
function OwnerProcedures({ name, search, plusClick, procsList, getOwnerProcs }) {
  const uid = 3
  const { pid } = useParams()
  const [searchLine, setSearchLine] = useState(false)
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    if (!procsList.length) {
      getOwnerProcs(pid, uid, searchInput)
    }

    setTimeout(() => getOwnerProcs(pid, uid, searchInput), 100)
    // eslint-disable-next-line
  }, [searchInput, pid])

  return (
    <section className={styles.DiaryBlocks}>
      <div className={styles.NameAndSearch}>
        {!searchLine && <div className={styles.Name}>{name}</div>}
        {searchLine && (
          <div className={styles.SearchContainer}>
            <Search className={styles.SearchButton} />
            <input type="text" onChange={changeInputHandler} className={styles.SearchLine} placeholder="Поиск" />
          </div>
        )}
        <div className={styles.Buttons}>
          {search && !searchLine && <Search onClick={searchLineDisplay} className={styles.Button} />}
          <Plus className={styles.Button} onClick={plusClick} />
        </div>
      </div>
      <hr className={styles.Line} />
      <section className={styles.Procedures}>
        {procsList.length === 0 && (
          <div className={styles.EmptyStoryContainer}>
            <div className={styles.EmptyStory}>Не проведено ни одной процедуры</div>
          </div>
        )}
        {procsList
          .map((proc) => {
            // console.log(<HomeProcedure key={proc.procId} proc={proc} date={proc.procDate} />)
            const day = proc.procDate.slice(8, 10)
            const month = Number(proc.procDate.slice(5, 7)) - 1
            const year = proc.procDate.slice(0, 4)
            const date = new Date(year, month, day)
            return <HomeProcedure key={proc.procId} proc={proc} date={date} />
          })
          .sort((a, b) => {
            return b.props.date - a.props.date
          })}
      </section>
    </section>
  )

  function searchLineDisplay() {
    setSearchLine(!searchLine)
  }

  function changeInputHandler(event) {
    setSearchInput(event.target.value)
    getOwnerProcs(pid, uid, searchInput)
  }
}

OwnerProcedures.defaultProps = {
  plusClick: () => {},
}

OwnerProcedures.propTypes = {
  name: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
  plusClick: PropTypes.func,
}

const mapStateToProps = (state) => ({
  procsList: state.procsList.ownerProcs,
})

const mapDispatchToProps = (dispatch) => ({
  getOwnerProcs: (pid, uid, name) => dispatch(getOwnerProcs(pid, uid, name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(OwnerProcedures)
