import { Component } from 'react'

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super(); //calls the constructor of the underlying component

    this.state = {
      monsters:[], //array
    };
  }

 //componentDidMount runs only once when the component is mounted
  componentDidMount(){
    //fetch is a promise
     fetch('https://jsonplaceholder.typicode.com/users')
      .then((response)=> response.json()) //convert response to json
       .then((users) => { //from the resposne create user
        this.setState(
          () => {
            return {monsters: users}; //sets array to eq. user
          },
          () =>{
            console.log(this.state);
          }
        )
      }) 
  }
  
  render() {
    return (
      <div className="App">
        {this.state.monsters.map((monster)=>{ //maps it erated monsters object to monster object
          return ( //key is used by React to identify what component needs to be re-rendered
            <div key={monster.id}>
            <h1>{monster.name}</h1> 
            </div>
          )
        })}
      </div>
    );
  }
}

export default App;
