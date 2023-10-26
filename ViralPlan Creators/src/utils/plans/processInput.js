import { PDFDocument, PDFForm, StandardFonts, PDFFont } from 'pdf-lib'
import { getCompany } from '../db/companyModel.js'
import { plan_5 } from './plan_5.js'
import { plan_20 } from './plan_20.js';


function saveByteArray(byteArray) {
  var blob = new Blob([byteArray], {type: "application/pdf"});
  var link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  var fileName = 'plan';
  link.download = fileName;
  link.click();
};



export async function processInput(companySelected, planSelected) {
  let company = {
    'name': '',
    'tel': '',
    'email': '',
    'form': '',
    'plans': []
  }
  let plan = []
  let companySelectedObject = await getCompany(companySelected);
  company['plans'] = companySelectedObject[0]['company']['plans'];

  for (let i = 0; i < company['plans'].length; i++) {
      if (company['plans'][i]['date'] == planSelected) {
          plan = company['plans'][i];
      }
  }

  const PDFLib = require('pdf-lib')
  const fs = require('fs')
  const fontkit = require('@pdf-lib/fontkit')
  let text = '';
  if (plan.content.length == 5) {
    text = plan_5
  } else {
    text = plan_20
  }
  const pdfDoc = await PDFLib.PDFDocument.load(text)

  pdfDoc.registerFontkit(fontkit)
  const fontBytes = fs.readFileSync("C:\\Users\\pmpls\\Desktop\\platform\\src\\src\\assets\\fonts\\Comfortaa\\Comfortaa.ttf");
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
