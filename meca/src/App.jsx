import "./App.css";
import React, { useEffect, useState, useMemo } from "react";
const imagesImports = import.meta.glob("./assets/cards/*.png");
const altsImports = import.meta.glob("./assets/alts/*.png");

function Cards({ score, highScore, setHighScore, setScore }) {
  const [images, setImages] = useState({});
  const [clicked, setClicked] = useState([]);

  useEffect(() => {
    console.log("Checking high score");
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore, setHighScore]);

  useEffect(() => {
    console.log("Loading images");
    const loadImages = async () => {
      const loadedImages = {};

      for (const path in imagesImports) {
        const mod = await imagesImports[path]();
        const name = path.split("/").pop().replace(".png", "");
        loadedImages[name] = { src: { normal: mod.default } };
      }

      for (const path in altsImports) {
        const mod = await altsImports[path]();
        const name = path.split("/").pop().replace(".png", "");
        if (loadedImages[name]) {
          loadedImages[name].src.alt = mod.default;
        }
      }

      setImages(loadedImages);
    };

    loadImages();
  }, []);

  const shuffledImages = useMemo(() => {
    console.log("Shuffling images");
    const keys = Object.keys(images);
    return keys
      .sort(() => Math.random() - 0.5)
      .map((name) => ({
        ...images[name],
        name,
      }));
  }, [images, score]);

  function handleClick(name) {
    if (clicked.includes(name)) {
      console.log("Already clicked", name);
      setClicked([]);
      setScore(0);
    } else {
      console.log("Clicked", name);
      setClicked([name, ...clicked]);
      setScore(score + 1);
    }
  }

  function handleMouseDown(name, e) {
    e.target.src = images[name].src.alt;
  }

  function handleMouseUp(name, e) {
    e.target.src = images[name].src.normal;
  }

  return (
    <div
      className="cards p-5 grid h-[calc(100vh-5rem)] 
          grid-cols-3
          grid-rows-4
          place-content-evenly
          gap-2
          md:grid-cols-4 md:grid-rows-3 md:gap-4
          lg:grid-cols-6 lg:grid-rows-2 lg:gap-6"
    >
      {shuffledImages.map(({ name, src }) => (
        <button
          className="card bg-rose-pine-foam flex flex-col 
                    justify-between items-stretch 
                    rounded-lg overflow-hidden
                    transition-transform duration-200 
                    active:bg-rose-pine-rose
                    active:transform active:scale-95"
          onClick={() => handleClick(name)}
          onMouseDown={(e) => handleMouseDown(name, e)}
          onMouseUp={(e) => handleMouseUp(name, e)}
          key={name}
        >
          <img
            src={src.normal}
            alt={`${name}'s shimji`}
            className="object-contain flex-grow p-2"
          />
          <p
            className="text-xs text-center 
                       bg-rose-pine-pine 
                       text-rose-pine-text
                       md:text-base md:py-1
                       lg:text-xl lg:py-2"
          >
            {name}
          </p>
        </button>
      ))}
    </div>
  );
}

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const cardParams = {
    score,
    highScore,
    setHighScore,
    setScore,
  };

  return (
    <div className="App bg-rose-pine-rose dark h-dvh overflow-hidden w-dvw">
      <header
        className="App-header py-4 bg-rose-pine-rose dark:bg-primary-dark text-center text-4xl
                font4-bold text-white dark:text-white dark:text-opacity-80
                font-serif flex justify-between items-center px-10"
      >
        <h1>Meca</h1>
        <div className="flex flex-col items-start">
          <p className="text-lg">Score: {score}</p>
          <p className="text-lg">High Score: {highScore}</p>
        </div>
      </header>
      <div className="bg-rose-pine-surface overflow-auto rounded-t-3xl h-full w-[calc(100% - 1.25rem)] mx-5">
        <Cards {...cardParams} />
      </div>
    </div>
  );
}

export default App;
