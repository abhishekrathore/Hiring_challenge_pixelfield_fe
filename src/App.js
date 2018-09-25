import React from 'react';
import { defaultProps } from 'recompose'
import { BrowserRouter, Route } from 'react-router-dom'
// const { withStateHandlers } = Recompose;
import LoginComponent from '../src/components/logIn/LoginComponent'
import SignUpForm from '../src/components/SignUpForm/SignUpForm'
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://192.168.1.7:4000/graphql"
});
const enhance = defaultProps({
  counter: 0
})




function App({ counter, ...rest }) {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div>

          <Route exact path="/register" component={SignUpForm} />
          <Route exact path="/" component={LoginComponent} />
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default enhance(App);
