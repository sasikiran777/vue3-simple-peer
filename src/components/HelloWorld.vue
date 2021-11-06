<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <button @click="createRoom">Create Room</button>&nbsp;&nbsp;
      <button @click="joinRoom">Join Room</button>
    </div>
    <div>
      <video playsinline autoplay id="local-stream"></video>&nbsp;&nbsp;
      <video playsinline autoplay id="remote-stream"></video>
    </div>
  </div>
</template>

<script>
import Peer from 'peerjs';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    async createRoom() {
      let _this = this
      let stream = ''
      let peer = new Peer('another-peers-id')
      peer.on('open', async () => {
        stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true})
        _this.setLocalStream(stream)
      })

      peer.on('call', (call) => {
        call.answer(stream);
        call.on('stream', (mediaStream) => {
          _this.setRemoteStream(mediaStream)
        })
      })
    },
    async joinRoom() {
      let _this = this
      let peer = new Peer()
      let stream
      peer.on('open', async () => {
        stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true})
        _this.setLocalStream(stream)
        let call = peer.call('another-peers-id', stream)
        call.on('stream', (stream) => {
          _this.setRemoteStream(stream)
        });
      })
    },
    setRemoteStream (remoteStream) {
      let video = document.getElementById('remote-stream')
      video.srcObject = remoteStream
      video.muted = true
      video.play();
    },
    setLocalStream (stream) {
      let video = document.getElementById('local-stream')
      video.srcObject = stream
      video.muted = true
      video.play();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
