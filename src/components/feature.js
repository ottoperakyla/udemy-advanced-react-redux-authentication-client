import React, { Component } from 'react'
import * as actions from '../actions'
import { connect } from 'react-redux'

class Feature extends Component {
  componentWillMount() {
    this.props.fetchMessage()
  }
  
  render() {
    return (
      <div><em>{this.props.message}</em></div>
    )
  }
}
 
export default connect((state) => {
  return {
    message: state.auth.message
  }
}, actions)(Feature)
