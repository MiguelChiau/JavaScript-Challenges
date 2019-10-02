const video = document.getElementById("video");

//To run all the asyncronous calls the get the necessary modules
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("./models"),

  //   To register the different parts of the face (mouth, nose, etc)
  faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
  //   For the API to put the box around the face
  faceapi.nets.faceRecognitionNet.loadFromUri("./models"),
  //   To reconize expressions (happy, neutral, sad)
  faceapi.nets.faceExpressionNet.loadFromUri("./models")
]).then(startVideo);

function startVideo() {
  navigator.getUserMedia(
    //What we want to get, the video is an object
    { video: {} },
    //What comes the webcam goes here

    stream => (video.srcObject = stream),
    //in case we get an error
    err => console.error(err)
  );
}

video.addEventListener("play", () => {
  // create canvas from video element
  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);
  // Set an intervsl to detect all faces every 100 miliseconds
  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    //to clear the canvas and match it to the displaysize
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    faceapi.draw.drawDetections(canvas, resizedDetections);
  }, 100);
});
