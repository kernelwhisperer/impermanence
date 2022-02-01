import "./App.css";
import React, { useEffect, useState } from "react";

const baseUrl = "https://source.unsplash.com/1920x1080/?moon";

function App() {
  const [imageSrc, setImageSrc] = useState();

  useEffect(() => {
    fetch(baseUrl)
      .then((response) => response.blob())
      .then(URL.createObjectURL)
      .then(setImageSrc);
  }, []);

  return (
    <div className="app" style={{ background: `url(${imageSrc})` }}>
      <h1>Hello</h1>
    </div>
  );
}

export default App;
