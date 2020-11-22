import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import * as mobilenet from '@tensorflow-models/mobilenet';

import '../nsfwjs-model/nsfwjs.css';

const acceptedImgFormat = "image/gif, image/jpeg, image/png";

export default () => {
    const [imgSrc, setImgSrc] = useState(null);
    const [predictions, setPredictions] = useState([]);
    const [error, setError] = useState(null);

    const inputRef = useRef(null);
    const imgRef = useRef(null);

    const handleChange = (event) => {
        const uploadedImgBlobUrl = URL.createObjectURL(event?.target?.files[0]);
        if (uploadedImgBlobUrl) setImgSrc(uploadedImgBlobUrl);

        mobilenet.load().then(net => {
            if (imgRef.current) net.classify(imgRef.current).then(result => {
                if (!result) return;
                setPredictions(result);
            }).catch(error => setError(error))
        })
    };

    const handleClick = () => !!inputRef.current && inputRef.current.click();

    useEffect(() => {
        return () => setPredictions([])
    }, []);

    const probabNum = predictions[0]?.probability;
    const probabAsPerce = probabNum?.toFixed(2) * 100 + '%';

    const result = !!predictions[0] ? `
    Detected: ${predictions[0].className}, 
    Probability: ${probabAsPerce}
    ` : null;

    return (
        <div className='container'>
            <h1>MobileNet</h1>
            <p>
                <a href='https://www.npmjs.com/package/@tensorflow-models/mobilenet' target='__blank'>nsfwjs </a>
                TensorFlow.js model
            </p>
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
                    crossOrigin='anonymous'
                />)
                :
                <div id='uploadImgInputRef' onClick={handleClick}>
                    <div>
                        <FontAwesomeIcon icon={faImages} id='uploadImgIcon' />
                        <p className='uploadImgTxt'>Click here to upload an image</p>
                    </div>
                </div>
            }
            {!!result && <h1 id="result">{result}</h1>}
            {!!error && <h1 id="error">{error}</h1>}
        </div>
    )
}

