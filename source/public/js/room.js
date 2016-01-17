var webrtc = new SimpleWebRTC({
  localVideoEl: 'video-local-vid',
  remoteVideosEl: '',
  autoRequestMedia: true
});

webrtc.on('readyToCall', function () {
  webrtc.joinRoom(env.room);
});

var remotes = $('#video-remotes');

webrtc.on('videoAdded', function (video, peer) {
    console.log(peer.id + ' joined');

    var container = $('<div class="video-container">');
    container.attr('id', 'video-' + webrtc.getDomId(peer));
    container.append(video);

    video.oncontextmenu = function () { return false; };

    var vol = $('<div class="meter">');

    vol.append('<span class="meter-value">');
    container.append(vol);
    remotes.append(container);
});

webrtc.on('videoRemoved', function (video, peer) {
    console.log(peer.id + ' left');
    var el = $(peer ? '#video-' + webrtc.getDomId(peer) : '#video-local');
    el.remove();
});

webrtc.on('volumeChange', function (volume, threshold) {
    console.log('VOL CHANGE ', volume);
    showVolume('local', volume);
});

// remote volume has changed
webrtc.on('remoteVolumeChange', function (peer, volume) {
    console.log('VOL CHANGE ', volume);
    showVolume(peer.id, volume);
});

function showVolume(el, volume) {
    if (volume < -45) volume = -45;
    if (volume > -20) volume = -20;

    var prcnt = (65 / volume + 45) * 100;
    el.find('#video-' + id + ' .meter-value').css('height', prcnt + '%');
}
