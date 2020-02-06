import React, { useEffect, useState } from "react";
import { array } from "prop-types";
import axios from "axios";
import { apiUrlRandomPuppie, PuppyByBreedUrl } from "../../config";

import Loader from "../common/Loader";
import ColoredText from "../common/ColoredText";

const Puppies = ({ breeds }) => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [breed, setBreed] = useState("");

  useEffect(() => {
    _loadImage();
  }, []);

  useEffect(() => {
    _loadImage();
  }, [breed]);

  const _loadImage = () => {
    setIsLoading(true);
    setImage(null);
    if (!breed) {
      axios.get(apiUrlRandomPuppie).then(({ data }) => {
        setIsLoading(false);
        setImage(data.message);
      });
    } else {
      const urlBreed = breed.split(" ").join("/");
      const endpoint = `${PuppyByBreedUrl}${urlBreed}/images/random`;
      axios.get(endpoint).then(({ data }) => {
        setIsLoading(false);
        setImage(data.message);
      });
    }
  };

  const _selectBreed = ({ target }) => {
    setBreed(target.value);
  };
  return (
    <section className="section">
      <div className="container">
        <ColoredText text="We ❤ our pups!" />
        <div className="card">
          <div className="card-content">
            <div className="content">
              <div className="columns">
                <div className="column is-three-quarters">
                  <label>Filter by breed</label>
                  <div className="select">
                    <select onChange={_selectBreed} value={breed}>
                      <option value="">Select Breed</option>
                      {breeds.map(breed => (
                        <option value={breed} key={Math.random()}>
                          {breed}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="column is-one-quarter">
                  <button
                    className="button is-primary is-fullwidth"
                    onClick={() => _loadImage()}
                  >
                    Load another{" "}
                    <span role="img" aria-label="puppy">
                      🐶
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {isLoading && <Loader />}
          {!isLoading && image && (
            <div className="card-image">
              <figure className="image ">
                <img src={image} alt="puppies!" />
              </figure>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

Puppies.propTypes = {
  breeds: array
};
Puppies.defaultProps = {
  breeds: []
};

export default Puppies;
