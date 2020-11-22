import React, { useEffect, useState, useRef } from "react"
import * as nsfwjs from "nsfwjs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-solid-svg-icons'

import './nsfwjs.css';

const acceptedImgFormat = "image/gif, image/jpeg, image/png";

export default () => {
  const [imgSrc, setImgSrc] = useState(null);
  const [predictions, setPredictions] = useState([]);

  const inputRef = useRef(null);
  const imgRef = useRef(null);

  const handleChange = async (event) => {
    const uploadedImgBlobUrl = URL.createObjectURL(event?.target?.files[0]);
    if (uploadedImgBlobUrl) setImgSrc(uploadedImgBlobUrl);

    const loadNsfwjsModel = await nsfwjs.load();
    const predictions = await loadNsfwjsModel.classify(imgRef.current);
    if (!!predictions && predictions.length > 0) setPredictions(predictions)
  };

  const handleClick = () => !!inputRef.current && inputRef.current.click();

  useEffect(() => {
    return () => setPredictions([])
  }, []);

  return (
    <div className='container'>
      <h1> NSFW JS</h1>
      <p> <a href='https://www.npmjs.com/package/nsfwjs' target='__blank'>nsfwjs </a>
      is simple JavaScript library to help you quickly identify unseemly images; all in the client's browser.
       Try to upload an image and it will identify its type.</p>
      <input
        type="file"
        name="uploaded-img-input"
        className="uploadImgInput"
        accept={acceptedImgFormat}
        ref={inputRef}
        onChange={handleChange}
      />
      {!!imgSrc ?
        (<img
          ref={imgRef}
          src={imgSrc}
          alt='tensorflow-img-recognition'
          id="outputImg"
        />)
        :
        <div id='uploadImgInputRef' onClick={handleClick}>
          <div>
            <FontAwesomeIcon icon={faImages} id='uploadImgIcon' />
            <p className='uploadImgTxt'>Click here to upload an image</p>
          </div>
        </div>
      }
      <ul id="predictionsList">
        {!!predictions && predictions.length > 0 &&
          predictions.map((pred, index) =>
            <li className='predictionsListItem' key={index}>
              {pred.className} : {pred.probability}
            </li>
          )
        }
      </ul>
    </div>
  )
}

