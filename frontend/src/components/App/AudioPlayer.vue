<template>
    <audio style="width: 100%; display: block; margin-left: 0; padding-left: 0;" ref="recordedAudio" id="recordedAudio"></audio>
</template>

<script setup>
const props = defineProps({
  audioData: String,
});

import { onMounted, ref } from 'vue';

const recordedAudio = ref(null);

onMounted(async () => {
    if (props.audioData != '' && typeof props.audioData != 'undefined') {
        const base64Data = props.audioData;
        const base64Response = await fetch(`${base64Data}`);
        let blob = await base64Response.blob();
        recordedAudio.value.src = URL.createObjectURL(blob);
        recordedAudio.value.controls = true;
        recordedAudio.value.autoplay = false;
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