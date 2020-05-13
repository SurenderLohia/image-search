import React from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const fetchImages = async (category) => {
    const query = `?qt=${category}`
    const url = `https://www.alamy.com/xml-search-results.asp${query}`;
    const images = await axios.get(url);
    console.log(images);
  }
  fetchImages('car');
  return (
    <div className="wrap">
      <h2>Image Search</h2>
      <div className="image-search-container">
        <input className="input-text input-text-search" type="text" defaultValue="Search" />
        <button className="button" type="submit">Search Image</button>
      </div>
    </div>
  );
}

export default App;
