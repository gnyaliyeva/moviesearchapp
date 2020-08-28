import React, { useState } from 'react';
import Axios from 'axios';
import './App.css';

const API_KEY = 'd1603570';
const SEARCH_API = `http://www.omdbapi.com/`;

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("");

  const handleSearch = (e) => {
    console.log(e.key)
    if (e.key === 'Enter')
    {
      setIsLoading(true);
      Axios.get(SEARCH_API + `?t=${title}&y=${year}&type=${type}&apikey=${API_KEY}`)
      .then(res => 
        console.log(res.data)
      )
      setIsLoading(false)
    }
  }
  

  return (
    <div className="container">
      <form className="search-box" noValidate="false">
        <h3>...Get some info about a movie...</h3>
        <input
          id="title" 
          name="title"
          placeholder="type name*" 
          onChange={e => setTitle(e.target.value)} 
          onKeyPress={handleSearch} 
          required
        />
        <input
          id="year"
          name="year"
          type="number"
          placeholder="which year?"
          onChange={e => setYear(e.target.value)} 
          onKeyPress={handleSearch}
        />
        <select name="type" onChange={e => setType(e.target.value)}>
          <option>which type?</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>
        <input id="reset" type="reset" value="CLEAR"/>
      </form>
    </div>
  );
}

export default App;
