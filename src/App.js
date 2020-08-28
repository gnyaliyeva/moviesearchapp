import React, { useState } from 'react';
import Axios from 'axios';
import ReactLoading from 'react-loading';
import './App.css';

const API_KEY = 'd1603570';
const SEARCH_API = `http://www.omdbapi.com/`;

const App = () => {
  const [isEmpty, setisEmpty] = useState(true);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("");
  const [movie, setMovie] = useState({});

  const requestCall = () => {
    Axios.get(SEARCH_API + `?t=${title}&y=${year}&type=${type}&apikey=${API_KEY}`)
    .then(res => {
      if (res.data.Response === 'True' )
        setMovie(res.data)
      else {
        setMovie({})
        setisEmpty(true)
        window.alert(res.data.Error)
      }
    })
    .catch(err => (
      alert('Something went wrong!')
    ))
    setisEmpty(false)
  }

  const selectHandler = (value) => {
    setType(value);
    requestCall();
  }

  const handleSearch = (e) => {
    if (e.key === 'Enter')
      requestCall()
  }

  return (
    <div className="container">
      <form className="search-box" noValidate>
        <h3>...Get some info about a film...</h3>
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
        <select name="type" onChange={e => selectHandler(e.target.value)}>
          <option>which type?</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>
        <input id="reset" type="reset" value="CLEAR"/>
      </form>
      {
        isEmpty ? 
          <ReactLoading type="balls" height={167} width={75} />
        :
        <div className="results">
          <h1>{movie.Title} ({movie.Year})</h1>
          <h3>{movie.Released} | {movie.Runtime} | {movie.Genre} | {movie.Country}</h3>
          <table>
            <tbody>
              <tr>
                <td>
                  <img src={movie.Poster} height="400px"/>
                </td>
                <td className="information">
                  <p><span className="title">Director:</span> {movie.Director}</p>
                  <p><span className="title">Writer:</span> {movie.Writer}</p>
                  <p><span className="title">Actors:</span> {movie.Actors}</p>
                  <p><span className="title">Production:</span> {movie.Production}</p>
                  <p className="plot">{movie.Plot}</p>
                  <p><span className="title">Type:</span> {movie.Type}</p>
                  <p><span className="title">Language:</span> {movie.Language}</p>
                  <p><span className="title">Box Office:</span> {movie.BoxOffice}</p>
                  <p><span className="title">Awards:</span> {movie.Awards}</p>
                  <p><span className="title">IMDB Rating:</span> {movie.imdbRating}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      }
    </div>
  );
}

export default App;
