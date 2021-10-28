import React from 'react';
import './App.css';
import MovieTable from '../MovieTable/MovieTable'

function App() {

  return (
    <div className="App" >
      {/* Div to contain our table component, and a title */}
      <h1 className="ContainerTitle">Favorite Movie List</h1>
      <div className="movieContainer">
        <MovieTable />
      </div>
    </div>
  );
}

export default App;
