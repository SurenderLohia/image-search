import React, {useState} from 'react';
import axios from 'axios';
import convert from 'xml-js';

import './App.css';

function App() {
  const [imagesCategory, setImagesCategory] = useState('');
  const [images, setImages] = useState([]);

  const getImageUrl = (baseUrl, ar, caption) => {
    const formatedCaption = caption.toLowerCase().replace(/\s/g, '-');
    //https://c8.alamy.com/comp/{ar}/{Caption}-{AF}.jpg
    const url =  `${baseUrl}${ar}/${formatedCaption}-${ar}.jpg`;

    return url;
  }

  const fetchImages = async (category) => {
    const query = `?qt=${category}`
    const url = `https://www.alamy.com/xml-search-results.asp${query}`;
    const resoponse = await axios.get(url);
    const imagesXml = resoponse.data;
    const imagesJson = convert.xml2json(imagesXml, {compact: true, spaces: 2});
    
    const images = JSON.parse(imagesJson).IMAGES.I;
    
    const formatedImages = images.map(image => {
      const baseUrl = 'https://c8.alamy.com/comp/';
      const {AR, CAPTION, ID} = image._attributes;
      const url = getImageUrl(baseUrl, AR, CAPTION);
      const formatedImage = {
        url,
        caption: CAPTION
      }

      return formatedImage;
    });

    setImages(formatedImages);

    console.log(formatedImages);
  }

  const handleChange = (e) => {
    setImagesCategory(e.target.value);
  }

  const onSearch = (e) => {
    e.preventDefault();
    fetchImages(imagesCategory);
  }

  //fetchImages('car');
  return (
    <div className="wrap">
      <h2>Image Search</h2>
      <div className="image-search-container">
        <input 
          className="input-text input-text-search" 
          type="text" 
          value={imagesCategory}
          onChange={(e) => handleChange(e)}
        />
        <button className="button" type="submit" onClick={(e) => onSearch(e)}>Search Image</button>
      </div>
      <div>
        {images.map(image => {
          return (
            <div className="image-thumb" key={image.id}>
              <img src={image.url} alt={image.caption} />
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
