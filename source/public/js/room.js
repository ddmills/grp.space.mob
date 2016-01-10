var elem = $('#vid-self')[0];

var constraints = {
    audio: false,
    video: true
};

navigator.mediaDevices.getUserMedia(constraints)
    .then(function(stream) {
        var videoTracks = stream.getVideoTracks();
        trace('Got stream with constraints: ', constraints);
        trace('Using video device: ' + videoTracks[0].label);
        stream.onended = function() {
            trace('Stream ended');
        };
        window.stream = stream; // make variable available to browser console
        elem.srcObject = stream;
    });
