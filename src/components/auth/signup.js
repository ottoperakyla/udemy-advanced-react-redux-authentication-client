import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import * as actions from '../../actions'
import { connect } from 'react-redux'

class Signup extends Component {
  render() {
    const { handleSubmit } = this.props 

    const renderField = ({
      input,
      type,
      meta: { touched, error }
    }) =>
      <div>
          <input className="form-control" {...input} type={type} />
          {touched &&
            ((error &&
              <span style={{color:'red'}}>
                {error}
              </span>) 
              )}
      </div>

    const submit = values => {
      this.props.signupUser(values)
    }

    const renderAlert = () => {
      if ( this.props.errorMessage ) {
        return (
          <div className="alert alert-danger">
            <strong>Oops!</strong> {this.props.errorMessage}
          </div>
        )
      }
    }

    return (
      <form onSubmit={handleSubmit(submit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <Field component={renderField} className="form-control" name="email" />
        </fieldset>

        <fieldset className="form-group">
          <label>Password:</label>
          <Field component={renderField} type="password" className="form-control" name="password" />
        </fieldset>

        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <Field component={renderField} type="password" className="form-control" name="passwordConfirm" />
        </fieldset>

        {renderAlert()}
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    )
  }
} 

function validate(values) {
  const errors = {}

  if ( !values.email ) {
    errors.email = 'Please enter an email.'
  } 
  
  if ( !values.password ) {
    errors.password = 'Please enter an password.'
  }

  if ( !values.passwordConfirm ) {
    errors.passwordConfirm = 'Please enter an password confirmation.'
  }

  if ( values.password !== values.passwordConfirm ) {
    errors.password = 'Passwords do not match.'
  }

  return errors
}

const form = reduxForm({
  form: 'signup',
  validate
})(Signup) 

export default connect((state) => {
 return {
   errorMessage: state.auth.error
 } 
}, actions)(form)