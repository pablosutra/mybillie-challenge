import React, {useMemo, useState} from "react";
import axios from 'axios';
import { breedListUrl } from './config';
import "./App.scss";

import Puppies from "./components/Puppies";

const App = () =>{
  const [breeds, setBreeds] = useState([]);
  useMemo(()=>{
    axios.get(breedListUrl)
    .then(({data}) =>{
      const list = Object.entries(data.message);
      const breedList = list.reduce((prev, breed) => {
        const [cat, subcat] = breed;
        if(subcat.length === 0){
          return [cat, ...prev];
        }else{
          const subBreeds = [];
          for(breed of subcat){
            subBreeds.push(`${cat} ${breed}`)
          }
          return [...subBreeds, ...prev];
        }
      });
      setBreeds(breedList);
    })
  }, []);

  return (
    <div className="App">
      <Puppies 
        breeds={breeds}
      />
    </div>
  );
}

export default App;
