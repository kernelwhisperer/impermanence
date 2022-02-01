import './App.css';
import { useEffect, useState } from 'react';

const baseUrl = "https://source.unsplash.com/1920x1080/?city"

function App () {
  const [imageSrc, setImageSrc] = useState()

  useEffect(() => {
    fetch(baseUrl)
      .then(response => response.blob())
      .then(URL.createObjectURL)
      .then(setImageSrc);
  }, [])

  return (
    <div className="App">
        {imageSrc && <img src={imageSrc} alt="logo" />}
    </div>
  );
}

export default App;
