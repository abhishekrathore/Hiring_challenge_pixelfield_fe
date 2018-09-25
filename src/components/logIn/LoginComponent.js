import React from 'react';
import { Formik } from 'formik';
import { defaultProps, compose, withState, withHandlers } from 'recompose'
import { Query } from "react-apollo";
import gql from "graphql-tag";
import "./LoginComponent.css"
import { withApollo } from 'react-apollo';
const enhance = compose(
  defaultProps({
    counter: 0
  }),
  withState('counter', 'updateCounter', 0),
  withHandlers({
    submit: props => event => {
      console.log(props, event)
      const $email = event.email;
      const $password = event.password;
      props.client.query({
        query: gql`
        query login($email: String, $password: String) {
          login(email: $email, password: $password) {
            email
            password,
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
         alert('Looged In Successfully')
      }).catch((error)=>{
        console.log(error)
        alert(error)
      });
    },
    RegisterUser: props => {
      props.history.push('/register');
    }
  })
)

const LoginComponent = ({ submit, RegisterUser }) => (
  <div className="login-page">
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        let errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        if (!values.password) {
          errors.password = 'Required';
        } else if (
          values.password.length < 5
        ) {
          errors.password = 'Invalid password';
        }
        return errors;
      }}
      onSubmit={submit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <div className="red">
              {errors.email && touched.email && errors.email}
            </div>
            <br />
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <div className="red">
              {errors.password && touched.password && errors.password}
            </div>
            <br />
            <button type="submit">
              Submit
          </button>
          </form>

        )}
    </Formik>
    <p onClick={RegisterUser}>Create new user</p>
  </div>
);

export default withApollo(enhance(LoginComponent));