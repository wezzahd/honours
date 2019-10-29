const video = document.getElementById('video')
let predictedAges = []

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('models'),
  faceapi.nets.faceExpressionNet.loadFromUri('models'),
  faceapi.nets.ageGenderNet.loadFromUri('models'),

]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

function interpolateAgePredictions(age) {
      predictedAges = [age].concat(predictedAges).slice(0, 30)
      const avgPredictedAge = predictedAges.reduce((total, a) => total + a) / predictedAges.length
      return avgPredictedAge
    }

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions().withAgeAndGender()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)

    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)




    resizedDetections.forEach(resizedDetections => {
           const { age, gender, genderProbability } = resizedDetections

           const interpolatedAge = interpolateAgePredictions(age)

           const text = [
             `${faceapi.round(interpolatedAge, 0)} years`,
             `${gender} (${faceapi.round(genderProbability)})`
           ]
           const anchor = resizedDetections.detection.box.bottomLeft
           // see DrawTextField below
           const drawOptions = {
             anchorPosition: 'BOTTOM_LEFT',
             backgroundColor: 'rgba(0, 0, 0, 0.5)'
           }
           const drawBox = new faceapi.draw.DrawTextField(text, anchor, drawOptions)
           drawBox.draw(canvas)

         })
  }, 1000)
})
