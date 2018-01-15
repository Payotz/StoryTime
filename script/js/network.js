var pc = new RTCPeerConnection({iceServers :[{urls:"stun:stun.l.google.com:19302"}]});
var dataChannel = pc.createDataChannel("DataChannel")

function initializeHost(){
    pc.createOffer().then(offer => pc.setLocalDescription(offer))
    pc.onicecandidate = (function(event){
        if (event.candidate)
            return
        window.alert("Send this invitation text:\n" + JSON.stringify(pc.localDescription))
        pc.setRemoteDescription(JSON.parse(window.prompt("Insert answer text here : ")))
    });
}

pc.onsignalingstatechange = function(event){
    if(pc.connectionState == "connected"){
        console.log("Fully connected")
    }else{
        console.log("Not connected")
    }
}

function initializeMember(data){
    pc.setRemoteDescription(JSON.parse(data))
    .then(() => pc.createAnswer())
        .then(answer => pc.setLocalDescription(answer))
            .then(function(){
                if(pc.localDescription)
                    window.alert("Send this answer text: \n" + JSON.stringify(pc.localDescription))
            }).catch(event => console.log(event))
}