import React, { useState, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import './Attendance.scss';
import axios from "axios";

let faceMatcher;
function Attendance() {
  const videoHeight = 480;
  const videoWitdh = 640;

  const [inittializing, setInitializing] = useState(false);
  const videoRef = useRef();
  const canvasRef = useRef();
  async function loadFaceData(){
    const data = await axios.get(
      "http://localhost:5227/api/people"
    );
    console.log(data);
  }
  async function loadTrainingData() {
    const faceDescriptors = [];
    const descriptors = [];
    for (let i = 1; i <= 3; i++) {
      const image = await faceapi.fetchImage(`http://localhost:3000/imgphuc/${i}.jpg`);
      const detection = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor();
      //console.log(JSON.stringify(detection.descriptor));
      descriptors.push(detection.descriptor);
    }
    
    faceDescriptors.push(new faceapi.LabeledFaceDescriptors("Phuc", descriptors));
    return faceDescriptors;
  }

  useEffect(() => {
    const loadModels = async () => {
      // const MODEL_URL = process.env.PUBLIC_URL + '/models';
      // setInitializing(true);
      // await Promise.all([
      //   faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      //   faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      //   faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      //   faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      //   faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL)
      // ]).then(startVideo)

      // const trainingData = await loadTrainingData();
      // //console.log(trainingData);
      // faceMatcher = await new faceapi.FaceMatcher(trainingData, 0.6)
      // console.log(faceMatcher);

      const MODEL_URL = process.env.PUBLIC_URL + '/models';
      setInitializing(true);
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
      const trainingData = await loadTrainingData();
      loadFaceData();
      //console.log(trainingData);
      faceMatcher = await new faceapi.FaceMatcher(trainingData, 0.6);

      //console.log(faceMatcher.labeledDescriptors[0].descriptors[2].toString());
      startVideo();
    }
    loadModels();


  }, [])

  const startVideo = () => {
    // navigator.mediaDevices.getUserMedia({
    //   video: {}
    // }, stream => videoRef.current.srcObject = stream)
    var constraints = { video: true, audio: true };

    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => videoRef.current.srcObject = stream)
      .catch(e => console.error(e));
  }
  const handleVideoOnPlay = () => {
    setInterval(async () => {
      if (inittializing) {
        setInitializing(false);
      }
      canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
      const displaySize = {
        width: videoWitdh,
        height: videoHeight
      }
      faceapi.matchDimensions(canvasRef.current, displaySize);
      const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions().withFaceDescriptors();
      const resizeDetections = faceapi.resizeResults(detections, displaySize);
      canvasRef.current.getContext('2d').clearRect(0, 0, videoWitdh, videoHeight);
      faceapi.draw.drawDetections(canvasRef.current, resizeDetections);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resizeDetections);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resizeDetections);
      //faceapi.draw.drawBox()
      for (const detection of detections) {
        if (detection) {
          //console.log(faceMatcher.findBestMatch(detection.descriptor));
          const box = detection.detection.box;
          const drawBox = new faceapi.draw.DrawBox(box, {
            label: faceMatcher.findBestMatch(detection.descriptor)
          })
          drawBox.draw(canvasRef.current);
          //console.log(faceMatcher.findBestMatch(detection.descriptor));
        }

      }
      //console.log(detections);
    }, 100)
  }
  return (
    <div className="App">
      <span>{inittializing ? 'Initializing' : 'Ready'}</span>
      <div className="display-flex justify-conten-center">
        <video ref={videoRef} autoPlay muted height={videoHeight} width={videoWitdh} onPlay={handleVideoOnPlay} />
        <canvas ref={canvasRef} className="position-absolute"></canvas>
      </div>
    </div>
  );
}

export default Attendance;