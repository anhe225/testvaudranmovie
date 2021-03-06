import React, { Component } from 'react'
import { graphql } from "react-apollo";
import createMovieMutation from "../query/createMovies";
import readMovieQuery from "../query/readMovies";
import { hashHistory } from "react-router";


class MovieCreate extends Component {
    constructor(props){
        super(props);
        this.state = { terms : "", errors: []};
    }
  render() {
    return (
      <div>
        <h1>Ajouter un film</h1>
        <form className="input-field col s6">
        <input 
        type="text"
        className="validate"
        onChange={e => this.setState({terms : e.target.value})}
        onKeyPress={this.handleSubmitForm.bind(this)}
        />
        <label className="active">Titre</label>
        </form>

        <div className="row errors">
          {this.renderErrors()}
        </div>
      </div>
    )
  }

  handleSubmitForm(e){
    if(e.key ==="Enter"){
      e.preventDefault();
      this.props.mutate({
        variables: {
          title:this.state.terms
        },
        refetchQueries: [{query : readMovieQuery}]
      }).then( () => {
        hashHistory.push("/movies");
      }).catch( (errors) => {
        const errorMessages = errors.graphQLErrors.map( err => err.message);
        this.setState({errors:errorMessages});
      })
    }
  };

  renderErrors (){
    return this.state.errors.map( m => m);
  }

}
export default graphql(createMovieMutation)(MovieCreate);