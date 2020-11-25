import React, { useState, useRef, useEffect } from "react";
import * as cocoSsd from '@tensorflow-models/coco-ssd';

import './tf-models.css';

export default () => {
    const [videoSrcObj, setVideoSrcObj] = useState(null);
    const [predictions, setPredictions] = useState([]);
    const [loading, setIsLoading] = useState(false);

    const videoRef = useRef(null);

    const detectObjects = (video, model) => {
        if (!video || !model) return;

       else model.detect(video).then(predictions => {
            setPredictions(predictions);
            setIsLoading(false);
        });
        window.requestAnimationFrame(() => detectObjects(video, model));
    };

    const loadModel = () => {
        if (!videoRef.current) return;
        setIsLoading(true);

        cocoSsd.load().then(model => detectObjects(videoRef.current, model))
            .catch(error => console.log('error in loadModel()', error));
    };
 
    const startSteamedVideo = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const videoElem = videoRef.current;
            if (videoElem && stream) {
                videoElem.srcObject = stream
                setVideoSrcObj(stream);
            }

        } catch (error) {
            return console.log('error enabling webcam', error);
        }
    };

    const stopStreamedVideo = () => {
        const videoElem = videoRef.current;
        if (!videoElem || !videoElem.srcObject) return;

        const stream = videoElem.srcObject;
        const tracks = stream?.getTracks();

        if (tracks) tracks.forEach(function (track) {
            track.stop();
        });

        videoElem.srcObject = null;
        setVideoSrcObj(null);
    }

    useEffect(() => {
        return () => stopStreamedVideo();
    }, []);

    return (
        <>
            <h1>Object detection with Coco-ssd</h1>
            <div id='webcam-embed'>
                <video onLoadedData={loadModel} autoPlay={true} ref={videoRef} id='webcam' >
                </video>
            </div>
            {!videoSrcObj ?
                (<button id='enable-webcam' onClick={startSteamedVideo}> Enable webcam </button>)
                :
                (<button id='enable-webcam' onClick={stopStreamedVideo}> Disable webcam </button>)
            }
            {!!loading && <h3>Loading ...</h3>}
            {predictions && predictions.length > 0 &&
                (<div className='predictionsList'>
                    <h3>Predictions:</h3>
                    {
                        predictions.map((pred, i) =>
                            <li key={i}>Object : {pred.class}, probability : {pred.score}</li>
                        )
                    }
                </div>)
            }
        </>
    )
} 