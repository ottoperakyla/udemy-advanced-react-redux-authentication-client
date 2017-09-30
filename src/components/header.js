import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <li className="nav-item">
          <Link to="/signout" className="nav-link">Sign Out</Link>
        </li>
      )
    } else {
      // React JSX also allows you to return an array of JSX.
      // You have to define keys here like per usual.
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/signin">Sign In</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
      ]
    }
    
  }

  render() {
    return (
    <nav className="navbar navbar-light">
      <Link to="/" className="navbar-brand">Redux Auth</Link>
      <ul className="nav navbar-nav">
        {this.renderLinks()}
      </ul>
    </nav>
    )
  }
}

export default connect((state) => {
  return {
    authenticated: state.auth.authenticated
  }
})(Header)
