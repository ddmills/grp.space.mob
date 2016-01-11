var webrtc = new SimpleWebRTC({
  localVideoEl: 'video-local',
  remoteVideosEl: 'video-remotes',
  autoRequestMedia: true
});

webrtc.on('readyToCall', function () {
  webrtc.joinRoom(env.room);
});
