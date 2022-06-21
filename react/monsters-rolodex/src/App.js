import { Component } from 'react'

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super(); //calls the constructor of the underlying component

    this.state = {
      name:{firstName:'John',lastName:'Doe'},
      company:'McDonalds'
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Hi, {this.state.name.firstName} {this.state.name.lastName} from {this.state.company}</p>
          <button onClick={() => {
            this.setState({name:{firstName:'Jimmie', lastName:'2Shoes'}});
            console.log(this.state)
          }}>Click to Change</button>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
