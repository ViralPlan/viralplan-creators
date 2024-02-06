<template>
    <p style="width: 100%; display: block; margin: 0px; padding: 0px;">
        <button ref="record" id="record" v-on:click="() => {
        console.log('Recording accesed')
            if (record.style.backgroundColor == 'rgb(253, 231, 103)') {
                rec.pause();
                record.style.backgroundColor = '#F3B95F';
            } else if (record.style.backgroundColor == 'rgb(243, 185, 95)') {
                rec.resume();
                record.style.backgroundColor = '#FDE767';
                record.style.color = 'white';
            } else {
                console.log('Recording started')
                record.style.backgroundColor = '#FDE767';
                record.style.color = 'black';
                record.text = 'Grabando';
                stopRecord.disabled=false;
                audioChunks = [];
                rec.start(); 
            }
        }">Grabar</button>
        <button ref="stopRecord" id="stopRecord" v-on:click="() => {
            record.disabled = false;
            stopRecord.disabled=true;
            record.style.backgroundColor = '#D04848';
            rec.stop();
        }">Parar</button>
        <button id="deleteRecord" v-on:click="() => {
            audioChunks = [];
            try {
                recordedAudio.src = '';
                recordedAudio.controls = false;
                rec.stop()
            } catch (error) {
                console.log(error)
            }
            record.disabled = false;
            stopRecord.disabled=true;
            record.style.backgroundColor = '#D04848';
            companyStore.planSelectedObject.content[props.videoIndex].explanation = '';
        }">Eliminar</button>
    </p>
    <p style="width: 100%; display: block; margin: 0px; padding: 0px;">
        <audio style="width: 100%; display: block; margin: 0; padding: 0;" ref="recordedAudio" id="recordedAudio"></audio>
    </p>
</template>

<script setup>
const props = defineProps({
  videoIndex: Number,
});
import { companySelectedStore } from '../../stores/company';
import { onMounted, ref } from 'vue';

const record = ref(null);
const stopRecord = ref(null);
const recordedAudio = ref(null);
let rec = ref(null);
let audioChunks = ref([]);

const companyStore = ref(companySelectedStore());

onMounted(async () => {
    if (companyStore.value.planSelectedObject.content[props.videoIndex].explanation != '' && typeof companyStore.value.planSelectedObject.content[props.videoIndex].explanation != 'undefined') {
        const base64Data = companyStore.value.planSelectedObject.content[props.videoIndex].explanation;
        const base64Response = await fetch(`${base64Data}`);
        let blob = await base64Response.blob();
        recordedAudio.value.src = URL.createObjectURL(blob);
        recordedAudio.value.controls = true;
        recordedAudio.value.autoplay = false;
    }
    function handlerFunction(stream) {
        rec = new MediaRecorder(stream);
        rec.ondataavailable = e => {
            audioChunks.value.push(e.data);
            if (rec.state == "inactive") {
                console.log("Recording inactive")
                let blob = new Blob(audioChunks.value,{type:'audio/mpeg-3'});
                recordedAudio.value.src = URL.createObjectURL(blob);
                recordedAudio.value.controls=true;
                recordedAudio.value.autoplay=false;
                
                let reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = function () {
                    let base64String = reader.result;
                    updateData(base64String)
                }
            }
        }
    }
    navigator.mediaDevices.getUserMedia({audio:true})
        .then(stream => {
            handlerFunction(stream)
        })
    function updateData(data) {
        const companyStore = companySelectedStore();
        companyStore.planSelectedObject.content[props.videoIndex].explanation = data;
        console.log(companyStore.planSelectedObject.content[props.videoIndex].explanation)
    }
});
</script>

<style scoped>
#record {
    background-color: #D04848; /* Green */
    border-width: medium;
    border-color: black;
    color: white;
    padding: 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 2px 2px;
    cursor: pointer;
    width: 30%;
    max-width: 50%;
    max-height: 15%;
    border-radius: 0px;
    left: 100px;
    right: 100px;
    position: relative;
}
#stopRecord {
  background-color: #6895D2;
  border-width: medium;
  border-color: black;
  color: white;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 2px 2px;
  cursor: pointer;
  width: 30%;
  max-width: 50%;
  max-height: 15%;
  border-radius: 0px;
  left: 100px;
  right: 100px;
  position: relative;
}
#deleteRecord {
    background-color: #8bff81;
  border-width: medium;
  border-color: black;
  color: black;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 2px 2px;
  cursor: pointer;
  width: 30%;
  max-width: 50%;
  max-height: 15%;
  border-radius: 0px;
  left: 100px;
  right: 100px;
  position: relative;
}
#recordedAudio {
  left: 100px;
  right: 100px;
  position: relative;
}
</style>