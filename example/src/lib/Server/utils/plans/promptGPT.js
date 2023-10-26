import OpenAI from 'openai';


export async function generateVideo(idea, company) {
    const openai = new OpenAI({
        apiKey: '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',
        dangerouslyAllowBrowser: true,
    });

    let function_name = 'create_video'
    const buenas_ideas = `Te proporcionaré ejemplos de vídeos que han sido exitosos para que te sirvan de inspiración: VÍDEO 1
    Escena 1:
    Entrada de la oficina: La cámara entra en la oficina y muestra un rótulo de
    "Quokka" con un miembro del equipo (Carlota) saludando con un Āesto amistoso.
    Escena 2:
    Oficina Āeneral: La cámara pasea rápidamente por la oficina, mostrando a
    empleados trabajando, riendo, e interactuando.
    Escena 3:
    Taller de personalización: La cámara enÿoca una máquina de láser personalizando
    una botella. Un trabajador muestra con orĀullo una botella recién personalizada.
    Escena 4:
    Fábrica: Rápido vistazo de las máquinas y el proceso de ÿabricación de las
    botellas. Dos trabajadores inspeccionan una botella y la aprueban con pulĀares
    hacia arriba.
    Escena 5
    Zona de descanso: Dos trabajadores disÿrutan de un caÿé con sus termos Quokka,
    riendo y charlando. Ambos hacen un Āesto de "shhh" hacia la cámara.
    Escena 6
    Final : La cámara se aleja mostrando la ÿachada de la oficina con todo el equipo
    ÿuera, despidiéndose y levantando sus botellas Quokka.
    https://vm.tiktok.com/ZGJWTo7wN/ ÿondo
    Te presentamos Quokka y quien hace que ÿuncione!!
    (Explicar en voz en off cada zona)
    Bienvenidos todos!! #parati #ÿyp
    -
    40 seĀ
    Varias
    15:00h - 16:00h
    Todas las instalaciones
    mencionadas en el Āuión.
    Estos vídeos han sido exitosos porque porque humaniza mucho a la empresa y la marca de quokka con un tono joven y cercano. Por favor, retén esta información.`

    const schema = {
        "type": "object",
        "properties": {
            'titulo': {
                "type": "string",
                'description': 'Titulo del video',
            },
            'duracion': {
                "type": "string",
                'description': 'Duracion del video',
            },
            'personas': {
                "type": "number",
                'description': 'Numero de personas que aparecen en el video',
            },
            'horario': {
                "type": "string",
                'description': 'Horario de subida del video',
            },
            'lugares': {
                "type": "string",
                'description': 'Lugares donde se graba el video',
            },
            'descripcion': {
                "type": "string",
                'description': 'Descripcion del video',
            },
            'planos': {
                "type": "array",
                'description': 'Planos del video',
                'items': { 'type': 'string' }
            },
            'texto': {
                "type": "string",
                'description': 'Texto en pantalla del video',
            },
            'objetivo': {
                "type": "string",
                'description': 'Objetivo del video',
            },
            'cta': {
                "type": "string",
                'description': 'Call to action del video',
            },
            'punchline': {
                "type": "string",
                'description': 'Punchline del video',
            },
            'extra': {
                "type": "string",
                'description': 'Detalles adicionales del video',
            },
            'instrucciones': {
                'type': 'array',
                'description': 'Instrucciones de acting del video, dadas para cada persona que sale en el video',
                'items': { 'type': 'string' }
            }
        },
        'required': ['titulo', 'duracion', 'personas', 'horario', 'lugares', 'descripcion', 'planos', 'texto', 'objetivo', 'cta', 'punchline', 'extra', 'instrucciones']
    }

    const chatCompletion = await openai.chat.completions.create({
        messages: [
            {'role': 'system', 'content': 'Eres un experto creador de contenido con especialización en marketing digital viral. Representamos una agencia que crea contenido humorístico para TikTok con el objetivo de aumentar la exposición y ventas de nuestros clientes. Te proporcionaré información en varios mensajes. Por favor, retén la información y espera mis instrucciones. Cuando estés listo para actuar, te indicaré con la palabra clave "GENERA".'},
            {'role': 'assistant', 'content': 'Entendido, estoy aquí para ayudarte con tus necesidades de creación de contenido y marketing digital viral. Esperaré tu información y tus instrucciones. Estoy listo para empezar cuando tú lo estés.'},
            {'role': 'user', 'content': 'A continuación, te proporciono detalles específicos de una empresa cliente: ' + company['form']},
            {'role': 'assistant', 'content': 'Toda la información está retenida, estoy listo para recibir tus instrucciones adicionales y proceder cuando indiques con la palabra clave "GENERA".'},
            {'role': 'user', 'content': `Con la información proporcionada, GENERA el guión de el siguiente video de Tiktok para (nombre de la empresa) que cumplan con las siguientes características: 
            ●El video debe de tratar sobre: ` + idea + `
            Punchline: "Aprobado por civilizaciones avanzadas".
            ● Formato breve: Guión del vídeo que debe incluir detalles de acting, planos y otros elementos pertinentes para enriquecer el contenido, manteniendo una longitud de entre 1800 a 900 caracteres. El texto para mostrar en pantalla tiene un límite máximo de 660 caracteres, aunque en ocasiones puede no haber texto. La descripción detallada del vídeo debe contener 47 caracteres, mientras que la duración máxima estipulada, el número de personas requeridas para el rodaje y el horario de subida deben tener cada uno 11 caracteres. Las posibles locaciones deben describirse en 88 caracteres. Por último, se debe añadir una sección extra para detalles o especificaciones adicionales, la cual tiene un límite de 51 caracteres.
            ● Potencial viral: Deben ser llamativos, amenos, humorísticos y juveniles. 
            ● Objetivo: Entretener más que vender, para que la marca se haga conocida. 
            ● No deben parecer anuncios. 
            ● Deben incitar a dar like, compartir y conectar con la audiencia de la marca. 
            ● Pueden ser irónicos o emotivos, pero no infantiles o genéricos. 
            ● Deben tener un punchline o sorpresa para retener al espectador
            ● Estamos buscando ideas frescas y actuales, que se alejen de los típicos clichés publicitarios y corporativos para captar genuinamente la atención del público general. El objetivo es crear contenido que enganche desde el primer momento, incentivando a los espectadores a quedarse hasta el final del vídeo y que les motive a interactuar con este. Para lograrlo, es fundamental que las ideas sean ingeniosas, divertidas, y hasta un poco arriesgadas, evitando caer en la infantilización. Queremos que los textos sean cotidianos y graciosos, con un enfoque que resuene especialmente con el público joven.`},
        ],
        model: 'gpt-4-0613',
        functions:[{'name': function_name, 'parameters': schema}],
        function_call:{'name': function_name},
    })

    let result = JSON.parse(chatCompletion.choices[0].message.function_call.arguments)
    let planos = result.planos.join('\n')
    let acting = result.instrucciones.join('\n')

    let video = {
        'titulo': result.titulo,
        'duracion': result.duracion,
        'personas': result.personas,
        'horario': result.horario,
        'lugares': result.lugares,
        'descripcion': result.descripcion,
        'extra': result.extra,
        'texto': result.texto + '\n' + 'Objetivo: ' + result.objetivo + '\n' + 'Call to action: ' + result.cta + '\n' + 'Punchline: ' + result.punchline,
        'guion': planos + '\n' + 'Instrucciones de acting: ' + '\n' + acting,
        'audio': '',
    }

    return video
}