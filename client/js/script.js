("use strict");

const callbackfunc = "./callbackfunc";
let videosArray = [
  "./videos/cover.mp4",
  "./videos/videodog.mp4",
  "./videos/clean.mp4"
]; //  videos array.
let videoHidden = document.getElementById("videoHidden"); // ml5 input video 227px
let videoLive = document.getElementById("videoLive"); // ux video, to use custom sizes.
let videoTeach = document.getElementById("videoTraining"); // video tag for training
let prediction = document.getElementById("prediction"); // prediction output.

document.addEventListener("DOMContentLoaded", function() {
  let knn = new ml5.KNNImageClassifier(loopVideos, 2, 1);
  let index = 0;
  let trainingTime = 10;
  let startPred = false;

  // Loop for videos in the array as soon as the page loads.
  function loopVideos() {
    if (!startPred) {
      let times = 0;
      videoTeach.src = videosArray[index];

      videoTeach.onloadeddata = function() {
        let startTrain = setInterval(function() {
          knn.addImage(videoTeach, index + 1);
          prediction.innerText = `Training video # ${index + 1}`;

          times++;
          stopTraining();
        }, 150);

        function stopTraining() {
          if (times === trainingTime) {
            clearInterval(startTrain);
            index++;

            if (index < videosArray.length) {
              loopVideos();
            } else {
              startPrediction();
            }
          }
        }
      };
    }
  }

  // After looping, start prediction.

  function startPrediction() {
    console.log("start predicting");

    startPred = true;
    window.startPred = startPred;

    setInterval(function() {
      knn.predict(videoHidden, async function(data) {
        let state = data.classIndex;

        if (state === 2) {
          prediction.innerText = `ATTENTION!!!! THERE IS MOUSE IN YOUR APARTMENT!!!`;
          await axios.post("http://localhost:1338/api/messages", {
            mouse: true
          });
        } else if (state === 1) {
          prediction.innerText = `Something is covering the camera - please make sure there is visibility`;
        } else {
          prediction.innerText = `House is clean from mice`;
        }
      });
    }, 250);
  }

  // Camera Access.
  navigator.getUserMedia = navigator.getUserMedia;

  if (navigator.getUserMedia) {
    navigator.getUserMedia(
      {
        audio: false,
        video: true
      },
      function(stream) {
        videoHidden.srcObject = stream;
        videoLive.srcObject = stream;

        videoHidden.onloadedmetadata = function(e) {
          videoHidden.play();
          videoLive.play();
        };
      },
      function(err) {
        console.log("The following error occurred: " + err.name);
      }
    );
  } else {
    console.log("getUserMedia not supported");
  }
});
