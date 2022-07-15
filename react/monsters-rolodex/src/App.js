import { useState, useEffect } from 'react';

import CardList from './components/card-list/card-list.component'
import SearchBox from './components/search-box/search-box.component';
import './App.css';

const App = () => {
  console.log('render')
  //useState is an array of [value,setValue]
  const [searchField, setSearchField] = useState(''); //useState replaces the setState from class components. This is an array destructure
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilterMonsters] = useState(monsters);
  
  useEffect(() => {
    //console.log('monster list render')
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response)=> response.json()) //convert response to json
     .then((users) => setMonsters(users))
  }, []);  //runs on first mount or if the array values have changed. In this case an empty array is used to only load 1 time when it is mounted.

  useEffect(() => {
    //console.log('searching...')
    const newFilteredMonsters = monsters.filter((monster)=>{
      return monster.name.toLowerCase().includes(searchField); //create a new list of monsters to allow us to get back to the original list of monsters
    });

    setFilterMonsters(newFilteredMonsters)
  }, [monsters, searchField]) //runs on first mount or if either monsters or searchfield changes
  
  const onSearchChange = (event) => {
    console.log("searching")
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString)  
  }

  return(
    <div className="App">
    <h1 className="app-title">Monsters Rolodex</h1>
    <SearchBox 
      className="monsters-search-box" 
      placeholder="Search Monsters" 
      onChangeHandler={ onSearchChange }  
    />
     <CardList monsters={filteredMonsters} />
  </div>
  )
}

export default App;
