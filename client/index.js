import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import MovieList from './components/movie-list';
import MovieCreate from './components/movie-create';
import MovieDetail from './components/movie-detail';
import {Router, Route, hashHistory, IndexRedirect} from "react-router";
import "./style/style.css";

const client = new ApolloClient ({
  dataIdFromObject : o => o.id
});

const Root = () => {
  return (
  <ApolloProvider client={client}>

        <Router history= {hashHistory}>
        
            <Route path="/">
            
                  <IndexRedirect to="/movies/"/>
            </Route>

            <Route path="/movies" component={MovieList}/>
            <Route path="/movies/create" component={MovieCreate}/>
            <Route path="/movies/:id"  component={MovieDetail}/>
     
        </Router>
 
  </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
