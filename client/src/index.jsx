import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    axios.post('/repos', {term})
      .then(() =>
      this.renderFunc())
      .catch(err => {
        console.log(err)
      })
  }

  renderFunc () {
    axios.get('/repos')
    .then(res =>
      this.setState({
        repos: res.data
      }))
    .then(() =>
      console.log("finished render"))
    .catch (err =>
      console.log(err))
  }

  componentDidMount() {
    this.renderFunc()
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));