import OpenAI from 'openai';
import axios from 'axios';
import { genIdeas } from './ideaGeneration';


function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export async function generateIdeas(company, number) {
    let ideas = []
    for (let i = 0; i < number; i++) {
        ideas.push('')
    }
    // await axios({method: "post", url: 'http://143.47.41.72/api/videos', data: form, headers: {"Content-Type": "multipart/form-data", 'Access-Control-Allow-Origin': '*'}})
    await genIdeas(company, number, 'gpt-4', import.meta.env.VITE_OPENAI_KEY)
    .then((response) => {
        // valid video ideas json array
        ideas = JSON.parse(response)
    })
    .catch((error) => {
        console.log(error);
    })
    return ideas

/*     ideas = [
        {
            "title": "Desafío de Juego Retro",
            "description": "Un video donde el presentador juega a los videojuegos clásicos de los 80-90 mientras lleva las prendas de Freakuerdos. Cada vez que pierde, se cambia de prenda. El humor proviene de las reacciones exageradas al perder y los comentarios divertidos sobre los juegos."
        },
        {
            "title": "Pasarela Friki-Retro en la Calle",
            "description": "Un video en el que el presentador realiza una pasarela improvisada en la calle mostrando las prendas de Freakuerdos. Las reacciones de los transeúntes al desfile aportan situaciones divertidas."
        },
        {
            "title": "Desafío de Cambio de Prenda",
            "description": "Un video en el que el presentador intenta ponerse todas las prendas de Freakuerdos que puede en un minuto. El humor surge de los intentos fallidos y de cómo se ve el presentador al final."
        },
        {
            "title": "Viaje Retro en el Tiempo",
            "description": "Un video en el que el presentador 'viaja en el tiempo' a la época de los 80-90, vestido con las prendas de Freakuerdos. Interactúa con objetos y situaciones de esas décadas, creando humor a través de la nostalgia y la exageración."
        },
        {
            "title": "Transformación Freak",
            "description": "Un video en el que el presentador se transforma de una persona 'normal' a un 'friki-retro' con las prendas de Freakuerdos. Las reacciones de las personas a su nuevo look y su comportamiento exageradamente 'friki' añaden humor."
        }
    ]
    await wait(10000)
    return ideas */

}


export async function generateVideo(idea, company) {
    const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_KEY,
        dangerouslyAllowBrowser: true,
    });

    const schema = {
        "type": "object",
        "properties": {
            'titulo': {
                "type": "string",
                'description': 'Titulo del video',
            },
            'duracion': {
                "type": "string",
                'description': 'Duracion del video, ajustándose a lo que durará el guión escrito más abajo',
            },
            'personas': {
                "type": "number",
                'description': 'Numero de personas que aparecen en el video, que como máximo debe ser el número de personas que aparecen en la información de la empresa',
            },
            'lugares': {
                "type": "string",
                'description': 'Lugares donde se graba el video, de entre los que estan disponibles en la información de la empresa',
            },
            'descripcion': {
                "type": "string",
                'description': 'Texto que debe ir incluido en la descripcion del video una vez subido a Tiktok',
            },
            'planos': {
                "type": "array",
                'description': ' Cadena de texto donde se define, para cada plano: tiempos de cada plano, acting de cada persona en el plano, dialogos/voz en off en cada plano, tono a transmitir en cada plano',
                'items': { 'type': 'string' }
            },
            'texto': {
                "type": "string",
                'description': 'Texto en pantalla del video',
            },
            'objetivo': {
                "type": "string",
                'description': 'Objetivo del video, que debe ir acorde con la información dada de la empresa (vender, aumenar seguidores, etc)',
            },
            'cta': {
                "type": "string",
                'description': 'Call to action del video, que debe ir acorde con el objetivo',
            },
            'punchline': {
                "type": "string",
                'description': 'Punchline del video final, que puede ir incluida o no en el texto en pantalla',
            },
            'extra': {
                "type": "string",
                'description': 'Detalles adicionales del video que puedan ser necesarios',
            },
            'instrucciones': {
                'type': 'array',
                'description': 'Instrucciones de acting del video, dadas para cada persona que sale en el video sobre como comportarse de manera general',
                'items': { 'type': 'string' }
            }
        },
        'required': ['titulo', 'duracion', 'personas', 'horario', 'lugares', 'descripcion', 'planos', 'texto', 'objetivo', 'instrucciones']
    }

    const chatCompletion = await openai.chat.completions.create({
        messages: [
            {'role': 'system', 'content': 'Eres un experto creador de contenido con especialización en marketing digital viral. Representamos una agencia que crea contenido humorístico para TikTok con el objetivo de aumentar la exposición y ventas de nuestros clientes. Te proporcionaré información en varios mensajes. Por favor, retén la información y espera mis instrucciones. Cuando estés listo para actuar, te indicaré con la palabra clave "GENERA".'},
            {'role': 'assistant', 'content': 'Entendido, estoy aquí para ayudarte con tus necesidades de creación de contenido y marketing digital viral. Esperaré tu información y tus instrucciones. Estoy listo para empezar cuando tú lo estés.'},
            {'role': 'user', 'content': 'A continuación, te proporciono detalles específicos de una empresa cliente: ' + company},
            {'role': 'assistant', 'content': 'Toda la información está retenida, estoy listo para recibir tus instrucciones adicionales y proceder cuando indiques con la palabra clave "GENERA".'},
            {'role': 'user', 'content': `Con la información proporcionada, GENERA el guión de el siguiente video de Tiktok para la empresa que trate sobre la siguiente idea: ` + idea}, 
        ],
        model: 'gpt-4',
        functions:[
            {
                    "name": "writeVideo",
                    "description": "Escribe un video de TikTok a partir de una idea",
                    "parameters": schema
            }
        ],
        function_call: {
            "name": "writeVideo"
        },
    })

    let result = JSON.parse(chatCompletion.choices[0].message.function_call.arguments)
    let planos = result.planos.join('\n')

    let acting = result.instrucciones.join('\n')

    let video = {
        'titulo': result.titulo,
        'duracion': result.duracion,
        'personas': result.personas,
        'horario': "15:00h-16:00h",
        'lugares': result.lugares,
        'descripcion': result.descripcion,
        'extra': '-',
        'texto': result.texto + '\n' + 'Objetivo: ' + result.objetivo,
        'guion': planos + '\n' + 'Instrucciones de acting: ' + '\n' + acting,
        'audio': '',
    }
    if (result.extra) {
        video['extra'] = result.extra
    }
    if (result.punchline) {
        video['texto'] += '\n' + 'Punchline: ' + result.punchline
    }
    if (result.cta) {
        video['texto'] += '\n' + 'CTA: ' + result.cta
    }
    return video
}
