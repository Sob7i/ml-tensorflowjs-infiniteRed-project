import * as cocoSsd from '@tensorflow-models/coco-ssd';

const detectObjects = (video, model, setIsLoading, setPredictions) => {
    if (!video || !model) return;
    model.detect(video).then(predictions => {
        setPredictions(predictions);
        setIsLoading(false);
    });
    window.requestAnimationFrame(() => detectObjects(video, model));
};

export const loadModel = (video, setPredictions, setIsLoading) => {
    if (!video) return;
    setIsLoading(true);

    cocoSsd.load().then(model => detectObjects(video, model, setIsLoading, setPredictions))
        .catch(error => console.log('error in loadModel()', error));
};