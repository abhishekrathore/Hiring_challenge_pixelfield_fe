import React from 'react'
import { Formik } from 'formik'
import validate from './validate-spected'
import getValidationSchema from './getValidationSchema-spected'
import './SignUpForm.css'
import { defaultProps, compose, withState, withHandlers } from 'recompose'
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { withApollo } from 'react-apollo';
const enhance = compose(
  defaultProps({
    initialValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
      consent: false,
    }
  }),
  withState('counter', 'updateCounter', 0),
  withHandlers({
    submit: props => event => {
      const email = event.email;
      const password = event.password;
      props.client.query({
        query: gql`
        query register($email: String, $password: String, $name: String) {
          register(email: $email, password: $password, name: $name) {
            email
            password,
            name,
            _id,
            token
          }
        }
        `,
        variables: {
          "email": event.email, "password": event.password
        }
      }).then((data)=>{
         console.log(data)
         alert('user create Successfully')
      }).catch((error)=>{
        console.log(error)
        alert(error)
      });
    },
    LoginUser: props => {
      console.log('log in');
      props.history.push('/');
    }
  })
)

function SignUpFormContainer({ initialValues, submit, LoginUser }) {
  return (
    [
      <Formik
        initialValues={initialValues}
        validate={validate(getValidationSchema)}
        onSubmit={submit}
        render={SignUpForm}
      />,
      <p onClick={LoginUser}>Already A member</p>
    ]
  )
}

function SignUpForm(props) {
  const { isSubmitting, errors, handleChange, handleSubmit } = props

  return (
    <div className="form">
      <label className="form-field" htmlFor="email">
        <span>E-mail:</span>
        <input name="email" type="email" onChange={handleChange} />
      </label>
      <div className="form-field-error">{errors.email}</div>

      <label className="form-field" htmlFor="password">
        <span>Password:</span>
        <input name="password" type="password" onChange={handleChange} />
      </label>
      <div className="form-field-error">{errors.password}</div>

      <label className="form-field" htmlFor="passwordConfirmation">
        <span>Confirm password:</span>
        <input name="passwordConfirmation" type="password" onChange={handleChange} />
      </label>
      <div className="form-field-error">{errors.passwordConfirmation}</div>

      <label className="form-field" htmlFor="consent">
        <span>Consent:</span>
        <input name="consent" type="checkbox" onChange={handleChange} />
      </label>
      <div className="form-field-error">{errors.consent}</div>

      <button onClick={handleSubmit}>{isSubmitting ? 'Loading' : 'Sign Up'}</button>

    </div>
  )
}
export default withApollo(enhance(SignUpFormContainer));