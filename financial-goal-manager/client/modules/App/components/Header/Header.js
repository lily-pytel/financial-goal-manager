import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// Import Style
import styles from './Header.css'

export function Header (props, context) {
  return (
    <div className={styles.header}>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <Link to='/' >Financial Goal Planner</Link>
      </nav>
    </div>
  )
}

Header.contextTypes = {
  router: PropTypes.object
}

export default Header
