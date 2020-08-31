import React, { useState } from 'react';
import Axios from 'axios';
import ReactLoading from 'react-loading';
import './App.css';
import nopic from './No_Picture.jpg';

const API_KEY = 'd1603570';
const SEARCH_API = `http://www.omdbapi.com/`;

const App = () => {
  const [error, setError] = useState(false);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [results, setResults] = useState("");

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setResults(<ReactLoading type="balls" height={167} width={75} />)
      Axios.get(SEARCH_API + `?t=${title}&y=${year}&type=${type}&apikey=${API_KEY}`)
      .then(res => {
        if (res.data.Response === 'True' ) {
          const movie = res.data;
          setResults(
            <div className="results">
              <h1>{movie.Title} ({movie.Year})</h1>
              <h3>{movie.Released} | {movie.Runtime} | {movie.Genre} | {movie.Country}</h3>
              <div className="row">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <img src={movie.Poster === 'N/A' ? nopic : movie.Poster} height="400px" width="300"/>
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
            </div>
          )
          setError(false)
        }
        else {
          setError(true)
          setMessage(res.data.Error);
        }
      })
      .catch(err => {
        setError(true);
        setMessage('Something went wrong!');
      })
    }
  }

  return (
    <div className="container">
      <form className="search-box" noValidate>
        <h3>...Get some info about a film...</h3>
        <select name="type" onChange={e => setType(e.target.value)}>
          <option value="">which type?</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>
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
          min="1900"
          max="2020"
          placeholder="which year?"
          onChange={e => setYear(e.target.value)} 
          onKeyPress={handleSearch}
        />
        <input id="reset" type="reset" value="CLEAR"/>
      </form>
      {
        error ? <h2 className="title">{message}</h2> : results
      }
    </div>
  );
}

export default App;
