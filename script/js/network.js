var pc = new RTCPeerConnection({iceServers :[{urls:"stun:stun.l.google.com:19302"}]});
var sendChannel = pc.createDataChannel('sendDataChannel')

function host(){
    pc.createOffer().then(offer =>
        pc.setLocalDescription(offer)).then(() => showOffer())
            .catch(error => console.log(error))
        .catch(error => console.log(error))
}

function setAnswer(){
    pc.setRemoteDescription(getAnswer()).catch(err => console.log(err))
}

function connect(data){
    pc.setRemoteDescription(data)
    pc.createAnswer().then(function(answer){
        pc.setLocalDescription(answer)
        showAnswer(answer)
    })    
}