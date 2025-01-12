<template>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <!-- <Kalender_2></Kalender_2> -->

        <!-- <kalender></kalender> -->


        <!-- single lihat jadwal konsultasi

        {{session_id}} -->

        <div class="all_view_session">
            <div class="session" id="left">

                <div class="video_on_connected">


                    <div class="video">
                        <div id="controls">
                            <select id="videoSource"></select>
                            <select id="audioSource"></select>
                        </div>
                        <div id="localVideoContainer" class="video-container">
                            <video id="localVideo" autoplay muted playsinline></video>
                            <div id="localUsername" class="username"></div>
                        </div>
                        <div id="remoteVideoContainer" class="video-container">
                            <video id="remoteVideo" autoplay playsinline></video>
                            <div id="remoteUsername" class="username"></div>
                        </div>
                    </div>

                     

                </div>

            </div>
            <div class="session" id="right">
                <div class="top_section">

                </div>
                <div class="video_desc">

                    <div class="atas">

                        <div class="image_dokter">

                        </div>

                        <div class="dokter_detail">
                            <p id="nama">Budi didid</p>
                            <p id="jenis_ahli">Dokter spesialis</p>
                        </div>

                        <div class="call_detail">
                            duration
                        </div>


 

                    </div>

                    <div class="video_control">

                        <div class="mic" @click="handle_toogle_mic">
                            <ion-icon name="mic-outline" v-if="toogle.mic"></ion-icon>
                            <ion-icon name="mic-off-outline" v-else></ion-icon>
                        </div>
                        
                        <div class="camera" @click="handle_toogle_camera">
                            <ion-icon name="videocam-outline" v-if="toogle.camera"></ion-icon>
                            <ion-icon name="videocam"v-else></ion-icon>
                        </div>

                        <div class="end_call">
                            <ion-icon name="call"></ion-icon>
                        </div>


                    </div>

                </div>
            </div>

        </div>

        <!-- {{userId}} -->
    </div>
</template>
<script>
import { io } from 'socket.io-client';
import kalender from '@/components/kalender/kalender.vue';
import { usetelecos_session_detailsStore } from '@/components/logic/API/save_session';
import { get_session_by_session_Id, get_session_by_user_Id } from '@/components/logic/API/session/session';
import { get_experts_byID } from '@/components/logic/API/experts';
import { always_scroll_on_top } from '@/components/logic/tools/handle_always_scroll_on_top';
import { get_user_data } from '@/components/logic/API/user';

export default {
    mounted() {
        always_scroll_on_top();
        this.try_get_session();
        this.get_session_by_id();
        this.initializeWebRTC();
    },
    components: {
        kalender,
    },
    data() {
        return {
            userId: '',
            session: {},
            session_id: "3",
            toogle:{
                camera:false,
                mic:true
            },
            socket: null,
            localStream: null,
            peerConnection: null,
            remoteUserId: null,
            currentVideoDeviceId: null,
            currentAudioDeviceId: null,
            isMuted: false,
            username: null,
            localName: null,
            remoteConnected: false,
            human: {
                user: '', 
                user_id:"09b6a658-ce99-11ef-8c34-00505656def3",
                expert : "",
                expert_id: "09b6a658-ce99-11ef-8c34-00505656def3",
                jenis_expert: ""
            }

        }
    },
    methods: {

        async try_get_session() {
            try {
                const sessionStore = usetelecos_session_detailsStore();
                const sessionDetails = await sessionStore.loadtelecos_session_details();

                if (sessionDetails === false) {
                    this.$router.push({ name: 'akun' });
                } else {
                    if (sessionDetails.phase == 1) {
                        this.userId = sessionDetails.userid;

                        console.log(await get_user_data(this.userId));

                        // await this.get_session_by_id();

                        // const data_user = await get_user_data(this.userId);
                        // this.user.name = data_user.user.name;
                        // this.user.wallet = data_user.user.wallet;
                        // this.validasi_loading_data.user_api = true;
                        // console.log(data_user);
                        // console.log("wallet : "+this.user.wallet)
                    }
                }
            } catch (error) {
                console.error('Failed to load session details:', error);
            } finally {
                this.isLoading = false;
            }
        },
        async get_session_by_id() {
            console.log(await get_session_by_session_Id(this.session_id));
        },
        async get_expert_details(){
             console.log(await get_experts_byID(this.human.expert_id));
        },
        handle_toogle_camera(){
            this.toogle.camera = !this.toogle.camera;
            if (this.localStream) {
                this.localStream.getVideoTracks().forEach(track => {
                    track.enabled = this.toogle.camera;
                });
            }
        },

        handle_toogle_mic(){
            this.toogle.mic = !this.toogle.mic;
            if (this.localStream) {
                this.localStream.getAudioTracks().forEach(track => {
                    track.enabled = this.toogle.mic;
                });
            }
        },
        initializeWebRTC() {
            this.socket = io("https://claudio.codes", {
                transports: ["websocket"],
                withCredentials: true,
            });

            // Add signal event handler
            this.socket.on('signal', async (data) => {
                if (!this.peerConnection) this.setupPeerConnection();

                try {
                    if (data.description.type === 'offer') {
                        this.remoteUserId = data.sender;
                        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(data.description));
                        const answer = await this.peerConnection.createAnswer();
                        await this.peerConnection.setLocalDescription(answer);
                        this.socket.emit('signal', { target: data.sender, description: answer });
                    } else if (data.description.type === 'answer') {
                        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(data.description));
                    } else if (data.description.candidate) {
                        await this.peerConnection.addIceCandidate(new RTCIceCandidate(data.description));
                    }
                } catch (error) {
                    console.error('Error handling signal:', error);
                }
            });

            // Initialize media elements
            const localVideo = document.getElementById('localVideo');
            const remoteVideo = document.getElementById('remoteVideo');
            const videoSourceSelect = document.getElementById('videoSource');
            const audioSourceSelect = document.getElementById('audioSource');

            // Socket event handlers
            this.socket.on('user-detail', (data) => {
                this.sessionId = data.sessionId;
                this.userId = data.userId;
                this.username = data.username;
                document.getElementById('localUsername').textContent = this.username;
            });

            this.socket.on('existing-users', async (users) => {
                if (Object.keys(users).length > 1) {
                    this.remoteConnected = true;
                    const firstUserId = Object.keys(users)[0];
                    const secondUserId = Object.keys(users)[1];
                    this.remoteUserId = firstUserId;

                    if (this.localName === null) {
                        this.localName = this.username === users[firstUserId] ? 
                            users[secondUserId] : users[firstUserId];
                    }

                    document.getElementById('remoteUsername').textContent = this.localName;
                    await this.initMedia();
                    this.setupPeerConnection();
                    
                    const offer = await this.peerConnection.createOffer();
                    await this.peerConnection.setLocalDescription(offer);
                    this.socket.emit('signal', { 
                        target: this.remoteUserId, 
                        description: this.peerConnection.localDescription 
                    });
                }
            });

            // Initialize media devices
            this.getMediaSources().then(() => {
                const defaultVideoDeviceId = videoSourceSelect.value;
                const defaultAudioDeviceId = audioSourceSelect.value;
                this.initMedia(defaultVideoDeviceId, defaultAudioDeviceId);
                
                // Join with fixed session and expert IDs
                this.socket.emit('join-room', { 
                    sessionId: this.session_id,
                    userId: this.human.user_id
                });
            });
        },

        async getMediaSources() {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoSourceSelect = document.getElementById('videoSource');
            const audioSourceSelect = document.getElementById('audioSource');
            
            videoSourceSelect.innerHTML = '';
            audioSourceSelect.innerHTML = '';

            devices.forEach(device => {
                const option = document.createElement('option');
                option.value = device.deviceId;
                option.text = device.label || `Device ${device.kind}`;
                
                if (device.kind === 'videoinput') {
                    videoSourceSelect.appendChild(option);
                } else if (device.kind === 'audioinput') {
                    audioSourceSelect.appendChild(option);
                }
            });
        },

        async initMedia(videoDeviceId, audioDeviceId) {
            const constraints = {
                video: videoDeviceId ? { deviceId: { exact: videoDeviceId } } : true,
                audio: audioDeviceId ? { deviceId: { exact: audioDeviceId } } : true
            };

            if (this.localStream) {
                this.localStream.getTracks().forEach(track => track.stop());
            }

            this.localStream = await navigator.mediaDevices.getUserMedia(constraints);
            document.getElementById('localVideo').srcObject = this.localStream;
        },

        setupPeerConnection() {
            this.peerConnection = new RTCPeerConnection();

            this.localStream.getTracks().forEach(track => {
                this.peerConnection.addTrack(track, this.localStream);
            });

            this.peerConnection.ontrack = (event) => {
                if (event.streams && event.streams[0]) {
                    document.getElementById('remoteVideo').srcObject = event.streams[0];
                }
            };

            this.peerConnection.onicecandidate = (event) => {
                if (event.candidate && this.remoteUserId) {
                    this.socket.emit('signal', { 
                        target: this.remoteUserId, 
                        description: event.candidate 
                    });
                }
            };
        }

    },


}
</script>
<style scoped>
.all_view_session {
    display: flex;
    justify-content: center;
    gap: 15px;
}

.session {
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06),
        0 10px 15px -3px rgba(0, 0, 0, 0.05);
    background-color: white;
}

.session#left{
    width: 75%;
}

.session#right{
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* align-items: center; */
}

.video{
    width: 100%;
    padding-top: 56.25%; 
    position: relative;
    background-color: rgb(139, 139, 139);
    border-radius: 0.5rem;
}

.top_section {
    width: 100%;
    position: relative;
    padding-top: 56.25%; /* This creates 16:9 aspect ratio */
    background-color: rgb(139, 139, 139);
    border-radius: 0.5rem;
}

.end_call{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    background-color: red;
    cursor: pointer;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;


    box-shadow: 
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06),
        0 10px 15px -3px rgba(0, 0, 0, 0.05);
}

.end_call ion-icon{
    font-size: 2rem;
    color: white;
}

.camera{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    background-color: white;
    
    box-shadow: 
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06),
        0 10px 15px -3px rgba(0, 0, 0, 0.05);

    cursor: pointer;
    width: 3rem;
    height: 3rem;
    border-radius: 50%; 
}
.camera ion-icon{
    font-size: 2rem;
    color: black;
}

.mic{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    background-color: white;
    
    box-shadow: 
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06),
        0 10px 15px -3px rgba(0, 0, 0, 0.05);

    cursor: pointer;
    width: 3rem;
    height: 3rem;
    border-radius: 50%; 
}
.mic ion-icon{
    font-size: 2rem;
    color: black;
}

.video_control{
    padding-top: 1rem;
    padding-bottom: 1rem;
    display: flex;
    justify-content: space-evenly;
}

.video-container {
    position: relative;
    display: inline-block;
    margin: 10px;
    width: 100%;
    height: 100%;
}

.username {
    position: absolute;
    bottom: 5px;
    left: 5px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 2px 5px;
    border-radius: 3px;
}

#localVideo, #remoteVideo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
}
</style>