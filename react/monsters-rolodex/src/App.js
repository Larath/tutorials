import { Component } from 'react'

import CardList from './components/card-list/card-list.component'
import './App.css';

class App extends Component {
  constructor(){
    super(); //calls the constructor of the underlying component

    this.state = {
      monsters:[], //array
      searchString: ''
    };
  }

 //componentDidMount runs only once when the component is mounted
  componentDidMount(){
    //fetch is a promise
     fetch('https://jsonplaceholder.typicode.com/users')
      .then((response)=> response.json()) //convert response to json
       .then((users) => { //from the response create user
        this.setState(
          () => {
            return {monsters: users}; //sets array to eq. user
          }
        )
      }) 
  }
  
  onSearchChange = (event) => {
    const searchString = event.target.value.toLowerCase();
    this.setState(()=>{
      return {searchString} //do not need to explicitly use searchString: searchString. The name of the variable matches the name of the state property
    })
  }

  render() {
    //cast this.state to in scope variables
    const { monsters, searchString } = this.state 
    const { onSearchChange }= this
    const filteredMonsters = monsters.filter((monster)=>{
      return monster.name.toLowerCase().includes(searchString); //create a new list of monsters to allow us to get back to the original list of monsters
    });

    return (
      <div className="App">
        <input className='search-box' type='search' placeholder='Search Monster' onChange={onSearchChange} />
{/* 
        {filteredMonsters.map((monster)=>{ //maps iterated monsters object to monster object
          return ( //key is used by React to identify what component needs to be re-rendered
            <div key={monster.id}>
            <h1>{monster.name}</h1> 
            </div>
          )
        })} */}
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
