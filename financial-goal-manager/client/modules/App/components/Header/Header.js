import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// Import Style
import styles from './Header.css'

export function Header (props, context) {
  const location = context.router.location.pathname
  return (
    <div className={styles.header}>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <ul className='navbar-nav mr-auto'>
          <li className={`nav-item ${location === '/' ? 'active' : ''}`}>
            <Link className='nav-link' to='/' >Dashboard</Link>
          </li>
          <li className={`nav-item ${location.match('survey') ? 'active' : ''}`}>
            <Link className='nav-link' to='/survey' >Survey</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

Header.contextTypes = {
  router: PropTypes.object
}

export default Header
