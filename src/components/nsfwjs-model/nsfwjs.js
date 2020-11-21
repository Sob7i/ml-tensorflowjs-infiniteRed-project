import React, { useEffect, useState, useRef } from "react"
// import * as ts from "@tensorflow/tfjs";
import * as nsfwjs from "nsfwjs";

const acceptedImgFormat = "image/gif, image/jpeg, image/png";

export default () => {
  const [imgSrc, setImgSrc] = useState(null);
  const [predictions, setPredictions] = useState([]);

  const imgRef = useRef(null);

  const handleChange = async (event) => {
    if (event.target.files[0]) setImgSrc(URL.createObjectURL(event.target.files[0]));

    const nsfwjsModel = await nsfwjs.load();
    const predictions = await nsfwjsModel.classify(imgRef.current);
    if (!!predictions && predictions.length > 0) setPredictions(predictions)
  };

  useEffect(() => {

    return () => {
      setPredictions([])
    }
  }, []);

  return (
    <div>
      <label htmlFor='uploaded-img-input'>Select a file:</label>
      <input type="file" accept={acceptedImgFormat} id="uploaded-img" name="uploaded-img-input" onChange={handleChange} />
      {!!imgSrc && <img ref={imgRef} src={imgSrc} alt='tensorflow-img-recognition' id="outputImg" width="400" />}
      <ul id="predections-list">
        {!!predictions && predictions.length > 0 &&
          predictions.map((pred, index) =>
            <li key={pred.className + index}>
              {pred.className} : {pred.probability}
            </li>
          )
        }
      </ul>
    </div>
  )
}

