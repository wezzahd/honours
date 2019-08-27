//let capture
let modelsloaded = false;
let detecting = false;
//let detections = [];
let gender, genderprob, box_x, box_y, boxwidth, boxheight




//loads models for face detection
async function preload_facedetection() {
  console.log('loading models')
	await faceapi.nets.tinyFaceDetector.loadFromUri('models'),
  //await faceapi.nets.faceLandmark68TinyNet.loadFromUri('models'),
  //await faceapi.nets.ageGenderNet.loadFromUri('models')

  modelsloaded = true
  console.log(faceapi.nets)
  console.log('loaded models')
}



async function updateDetections() {
  console.log('awake')
	//if(detecting) return;
  if(!modelsloaded) return;
   if(!capture.elt) return;
  capture.elt.removeAttribute('crossorigin')
  capture.elt.setAttribute('autoplay', '')
  capture.elt.setAttribute('playsinline', '');

 detecting = true;

 const useTinyModel = true

 //const detections = await faceapi.detectAllFaces(capture.elt, new faceapi.TinyFaceDetectorOptions({ inputSize: 128 })).withAgeAndGender()
 const detections = await faceapi.detectAllFaces(capture.elt, new faceapi.TinyFaceDetectorOptions({ inputSize: 320 }))

 const canvas = document.getElementById('mycanvas')  //id required for p5 canvas
 const displaySize = { width: capture.width, height: capture.height }

 const resizedDetections = faceapi.resizeResults(detections, displaySize);

// console.log(resizedDetections)

 if(resizedDetections.length > 0){
   updateDetectRunning = true;
}


if (resizedDetections.length > 0 && main_animation == true){
  facedetected = true;
}else {
  facedetected = false;
}
//  console.log(facedetected)

 //for (var i = 0; i < resizedDetections.length; i++) {

// gender = resizedDetections[i].gender
 //genderprob = resizedDetections[i].genderProbability
// console.log(gender)
// console.log(genderprob)
// }

}
