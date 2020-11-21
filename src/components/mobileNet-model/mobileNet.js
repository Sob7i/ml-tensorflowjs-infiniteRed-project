import React,{ useEffect, useState, useRef }  from 'react'
import * as mobilenet from '@tensorflow-models/mobilenet'
import * as ts from "@tensorflow/tfjs";

export default () => {
    console.log('ts', ts);
    console.log('mobilenet', mobilenet);

    const [predictions, setPredictions] = useState([]);
    const imgRef = useRef(null);

    const result = !!predictions[0] ? `
    Detected: ${predictions[0].className}
    Probability: ${predictions[0].probability}
    ` : null;

    useEffect(() => {
        mobilenet.load().then(net => {
          if(imgRef.current) net.classify(imgRef.current).then(result => {
                // Step 3: Print top result
                console.log('result', result);
                if (result) setPredictions(result)
            })
        })

        // return () => {
        //     setPredictions([])
        // }
    }, [])

    return (
        <div>
            {!!result && <h1 id="message">{result}</h1>}
            <img id="img" ref={imgRef} crossOrigin='anonymous' src="https://i.insider.com/5df126b679d7570ad2044f3e?width=1100&format=jpeg&auto=webp" />
        </div>
    )
}
