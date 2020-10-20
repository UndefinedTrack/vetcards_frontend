/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from '../../styles/pet/Diary.module.css'
import HomeProcedure from './HomeProcedure'
import { getOwnerProcs } from '../../actions/procsList'
import { ReactComponent as Search } from '../../icons/search.svg'
import { ReactComponent as Plus } from '../../icons/plus.svg'

// eslint-disable-next-line
function OwnerProcedures({ name, search, plusClick, procsList, getOwnerProcs }) {
  const uid = 2
  const pid = 5

  useEffect(() => {
    if (!procsList.length) {
      getOwnerProcs(pid, uid)
    }

    setTimeout(() => getOwnerProcs(pid, uid), 1000)
    // eslint-disable-next-line
  }, [getOwnerProcs, procsList])

  return (
    <section className={styles.DiaryBlocks}>
      <div className={styles.NameAndSearch}>
        <div className={styles.Name}>{name}</div>
        <div className={styles.Buttons}>
          {search && <Search className={styles.Button} />}
          <Plus className={styles.Button} onClick={plusClick} />
        </div>
      </div>
      <hr className={styles.Line} />
      <section className={styles.Procedures}>
        {procsList.map((proc) => <HomeProcedure key={proc.procId} proc={proc} />).reverse()}
      </section>
    </section>
  )
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
  getOwnerProcs: (pid, uid) => dispatch(getOwnerProcs(pid, uid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(OwnerProcedures)
