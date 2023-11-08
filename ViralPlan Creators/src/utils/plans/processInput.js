import { plan_5 } from '@/utils/plans/plan_5.js'
import { plan_20 } from '@/utils/plans/plan_20.js';
import fs from 'fs'
import * as process from 'process'
import { toBase64 } from 'js-base64';
import path from 'path'
import { PDFDocument, encodeToBase64 } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import { fontBytes } from '@/utils/plans/font.js'
import * as htmlToRtf from 'html-to-rtf';

function saveByteArray(byteArray) {
  var blob = new Blob([byteArray], {type: "application/pdf"});
  var link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  var fileName = 'plan';
  link.download = fileName;
  link.click();
};



export async function processInput(companySelected, plan) {
  // const PDFLib = require('pdf-lib')
  // const fs = require('fs')
  // const fontkit = require('@pdf-lib/fontkit')
  let text = '';
  if (plan.content.length == 5) {
    text = plan_5
  } else {
    text = plan_20
  }
  const pdfDoc = await PDFDocument.load(text)
  pdfDoc.registerFontkit(fontkit)
  // const fontBytes = toBase64(font)
  //const fontBytes = fs.readFileSync("/src/assets/fonts/Comfortaa/Comfortaa.ttf");
  const customFont = await pdfDoc.embedFont(fontBytes);
  const form = pdfDoc.getForm()
  let videoNumber = 1



  let field = form.getTextField('titulo')
  field.setText(companySelected)
  let video;

  for (let i = 0; i < plan['content'].length; i++) {
    video = plan['content'][i]
    try {
      field = form.getTextField(`guion_${videoNumber.toString().padStart(2, '0')}`)
      field.setText(video.guion)
      field = form.getTextField(`texto_${videoNumber.toString().padStart(2, '0')}`)
      field.setText(video.texto)
      field = form.getTextField(`audio_${videoNumber.toString().padStart(2, '0')}`)
      field.setText(video.audio)
      field = form.getTextField(`descripcion_${videoNumber.toString().padStart(2, '0')}`)
      field.setText(video.descripcion)
      field = form.getTextField(`duracion_${videoNumber.toString().padStart(2, '0')}`)
      field.setText(video.duracion)
      field = form.getTextField(`extra_${videoNumber.toString().padStart(2, '0')}`)
      field.setText(video.extra)
      field = form.getTextField(`horario_${videoNumber.toString().padStart(2, '0')}`)
      field.setText(video.horario)
      field = form.getTextField(`lugar_${videoNumber.toString().padStart(2, '0')}`)
      field.setText(video.lugares)
      field = form.getTextField(`personas_${videoNumber.toString().padStart(2, '0')}`)
      field.setText(video.personas.toString())

      videoNumber++
      console.log(videoNumber)
    } catch (error) {
      console.log(error)
      continue
    }
  }

  form.updateFieldAppearances(customFont)
  form.flatten()
  const pdfBytes = await pdfDoc.save()
  console.log(pdfBytes)
  saveByteArray(pdfBytes)
}
