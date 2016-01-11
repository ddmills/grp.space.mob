var mirror = $('#video-local')[0];

var webrtc = new SimpleWebRTC({
  // the id/element dom element that will hold "our" video
  localVideoEl: 'video-local',
  // the id/element dom element that will hold remote videos
  remoteVideosEl: 'video-remotes',
  // immediately ask for camera access
  autoRequestMedia: true
});

// we have to wait until it's ready
webrtc.on('readyToCall', function () {
  // you can name it anything
  webrtc.joinRoom(env.room);
});

// var constraints = {
//     audio: false,
//     video: true
// };
//
// navigator.mediaDevices.getUserMedia(constraints)
//     .then(function(stream) {
//         mirror.srcObject = stream;
//     });

// var container = $('#conference');
//
// var pc = new RTCPeerConnection();
//
// pc.onaddstream = function(obj) {
//   var vid = $('<video>');
//   container.append(vid);
//   vid[0].srcObject = obj.stream;
// }
//
// // Helper functions
// function endCall() {
//   var videos = container.children();
//   for (var i = 0; i < videos.length; i++) {
//     videos[i][0].pause();
//   }
//
//   pc.close();
// }
//
// function error(err) {
//   endCall();
// }
