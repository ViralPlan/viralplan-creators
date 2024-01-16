import { getNextMonday, getNextBusinessDay, getPreviousMonday } from '@/utils/dates.js';

const groupImage = 'https://bit.ly/3vjZvsV'
const meetingQuestions = 'https://bit.ly/3vD3Mbe'
const contentCreationGuide = 'https://bit.ly/3RVz6tb'
const itProtocol = 'https://bit.ly/3O2eT3O'
const surveyTemplate = 'https://bit.ly/3vBkiIK'
const planner = 'https://bit.ly/48VhSDg'
const endOfMonthChecklist = 'https://bit.ly/48yisHa '

export function getInitialTask(company, plan) {
  const taskList = [
    {
      date: getNextBusinessDay(initialDate),
      title: 'Asignación de un nuevo cliente',
      description: `

            ¡Hola Planner!

            Tenemos buenas noticias para ti. Acabamos de asignarte un nuevo cliente: ${company} 
            con el plan ${plan}.

            Por favor, tómate un momento para revisar tu disponibilidad y especialización.
            Asegúrate de estar preparado para ofrecer el mejor servicio posible. Si tienes alguna
            pregunta o necesitas más información sobre el cliente, no dudes en ponerte en
            contacto con tu Jefe de equipo.

            ¿Aceptas este reto?
            `,
      status: 'unfulfilled',
    },
  ];

  return taskList;
}

export function getFirstTaskList(company, initialDate) {
  const taskList = [
    {
      date: initialDate,
      title: 'Asignación de un nuevo cliente',
      description: `
Contacta al departamento comercial para obtener la información recabada sobre ${company}. Utiliza esta plantilla:

“Hola,

Espero que estés bien. Necesitamos recopilar información importante sobre nuestro cliente ${company} para garantizar un servicio óptimo y personalizado. Agradeceríamos mucho tu colaboración en este proceso. A continuación, encontrarás una lista de detalles específicos que necesitamos recabar. Por favor, proporciona la información más actualizada y precisa que tengas disponible:

○ 1. Información de Contacto:
 - Nombre completo del cliente:
 - Número de teléfono:
 - Correo electrónico:
 - Dirección:
 - Otra información de contacto relevante:

○ 2. Historial de Compras:
 - Descripción de productos/servicios adquiridos:
 - Fechas de compra:
 - Montos de compra:
    
○ 3. Historial de Interacciones:
 - Resumen de las interacciones previas con el cliente:
 - Comentarios o solicitudes especiales del cliente:

○ 4. Necesidades y Preferencias:
 - Requerimientos específicos del cliente:
 - Preferencias de comunicación:

○ 5. Información Adicional:
 - Cualquier otra información relevante:

Por favor, rellena esta información en la plantilla adjunta y envíala de vuelta a la brevedad. Si tienes alguna pregunta o requieres aclaraciones adicionales, no dudes en ponerte en contacto conmigo.

Tu cooperación es fundamental para brindar un servicio de calidad. ¡Gracias por tu ayuda!
Saludos, [Tu nombre]

[Tu cargo]"`,
      status: 'unfulfilled',
    },
    {
      date: initialDate,
      title: 'Análisis de información y CRM',
      description: `
Comienza el análisis detallado de la información del cliente ${company} y su presencia digital. Posteriormente, rellena la ficha de cliente en el CRM de ${company}.

Completa toda la información disponible. En caso de que algún dato no esté accesible o falte, anótalo para abordarlo y clarificarlo durante la próxima reunión del formulario. Esta práctica garantizará que no se pase por alto ninguna información crucial.`,
      status: 'unfulfilled',
    },
    {
      date: initialDate,
      title: 'Creación de grupo de información',
      description: `
Crea un nuevo grupo de comunicación en Whatsapp/Telegram con ${company}, tu Jefe de Equipo, tu Tracker si el plan contratado incluye Impulso Publicitario y los Socios de ViralPlan. Aquí tienes todos los detalles y pasos a seguir:

- Nombre del Grupo:
 [Nombre de la Marca del Cliente & ViralPlan]

- Descripción del Grupo:
 [Grupo de Atención al Cliente - ViralPlan

Maximiza tu impacto en marketing con acceso directo a nuestros recursos y equipo experto.

1. Plan Personalizado:
 ● Plan Contratado: [Nombre del Plan]
 ● Detalles: Consulta los beneficios y detalles aquí: https://viralplan.es/empresas/#planes

2. Personal Asignado:
 ● Planner: [Nombre del Planner] - Especialista en Creación de contenido Viral.
 ● Tracker: [Nombre del Tracker] - Especialista en captación de leads.
 ● Jefe de Equipo: [Nombre del Jefe de Equipo] - Supervisor de tu caso.

3. Comunicación y Soporte:
 ● Chat Directo: Utiliza este grupo para respuestas rápidas y soporte continuo.
 ● Correo Electrónico: Para consultas más detalladas contact@viralplan.es, marketing@viralplan.es

Nuestro compromiso es asegurar el éxito continuo de tu marca con ViralPlan. Estamos aquí para apoyarte en cada paso de tu camino hacia el éxito.]

- Imagen del Grupo:
 [${groupImage} + Insertar logotipo de la empresa en color blanco]

- Guía de mensajes:
 Hola [Nombre del Cliente] y equipo,

 ¡Bienvenidos al Grupo de Comunicación ViralPlan para ${company}! Este
 espacio es para que trabajemos juntos en tu estrategia de marketing. Aquí
 compartiremos actualizaciones, resolveremos dudas y colaboraremos de manera
 eficiente.

 En el grupo están:
 ● [Nombre del Planner], tu experto en contenido viral.
 ● [Nombre del Tracker], especialista en captación de leads (si aplica).
 ● [Nombre del Jefe de Equipo], quien supervisará tu caso.
 ● Los Socios de ViralPlan, quienes podrán ayudarte en cualquier otra cosa que necesites.

 Revisa la descripción del grupo para más detalles y no dudes en compartir tus ideas y
 preguntas. ¡Estamos aquí para apoyarte en cada paso hacia el éxito de tu marca!
 Saludos, [Tu nombre]`,
      status: 'unfulfilled',
    },
    {
      date: getNextBusinessDay(initialDate),
      title: 'Reunión de formulario',
      description: `
Comienza preparando el primer contacto con ${company}.

Organización de la Reunión:

  ● Programa una videollamada o reunión con ${company} para discutir aspectos clave.

  ● Utiliza esta lista de preguntas esenciales para guiar la conversación:
  [${meetingQuestions}].

Agendamiento y Invitación:

  ● Agenda la reunión en tu calendario de trabajo asignado por ViralPlan.

  ● Añade al cliente como invitado usando su correo electrónico.

  ● Si el Plan contratado Incluye (Impulso Puiblicitario) incluye a tu Tracker en la reunión y confirma su disponibilidad.

  ● Activa la opción de videoconferencia por Google Meet.

Confirmación de Asistencia:

  ● Verifica a través del grupo de comunicación que el cliente ha recibido y aceptado la invitación.

  ● Confirma que no hay dificultades para acceder a la reunión.

Preparación Previa a la Reunión:

  ● Recuerda al cliente con al menos 1 hora de antelación la existencia de la misma y asegúrate de su asistencia.

  ● Accede a la reunión con 5 minutos de antelación.

  ● Comprueba la presencia y funcionamiento del Bot de FireFlies.

Grabación y Privacidad:

  ● Utiliza FireFlies.ai para grabar la reunión.

  ● Informa previamente al cliente sobre la grabación para su consentimiento.`,
    },
    {
      date: getNextBusinessDay(initialDate),
      title: 'Documentación Post-Reunión',
      description: `
Introduce en CRM Ficha de Cliente toda la información recabada durante la reunión Primer contacto de ${company} tras la reunión.

Descarga y adjunta también todas las grabaciones, transcripciones y resúmenes obtenidos durante la misma.

Es esencial asegurarse de que toda la información y documentación presentada esté meticulosamente redactada, libre de errores ortográficos y con un espaciado y formato adecuados. Esto facilitará su comprensión tanto por nuestro software como por tus compañeros, garantizando una comunicación clara y efectiva en todo momento.`,
      status: 'unfulfilled',
    },
    {
      date: getNextBusinessDay(initialDate),
      title: 'Desarrollo de ideas creativas',
      description: `
Inicia el desarrollo de ideas creativas para el plan de [Nombre del Cliente]. Consulta esta guía de creación de contenido:
${contentCreationGuide}.`,
      status: 'unfulfilled',
    },
  ];
  return taskList;
}

export function getSecondTaskList(company, initialDate) {
  // Tareas iniciales después de la reunión de formulario
  let taskList = [];

  // Primer Lunes después de la reunión de formulario
  let firstMonday = getNextMonday(initialDate);
  let monday,
    tuesday,
    wednesday,
    thursday,
    friday = {};

  // Bucle para crear las tareas de cada semana
  for (let i = 0; i < 4; i++) {
    monday = [
      {
        date: firstMonday,
        title: 'Revisión de calendario y Creación de contenido temático',
        description: `
  Revisa tu Calendario de Trabajo:
● Asegúrate de estar al tanto de todas tus reuniones y compromisos programados para el día.
● Confirma las horas y plataformas para cada reunión.

Planificación de Contenido Temático:
● Dedica tiempo a la creación de contenido de alta calidad y con potencial viral, enfocado en los temas relevantes para [Nombre del Cliente].
● Utiliza herramientas y recursos disponibles para inspirarte y asegurar la innovación en tu contenido.

Comunicación Proactiva:
● En caso de conflictos de horario o dudas, contacta a tu Jefe de Equipo o al cliente de manera proactiva para hacer los ajustes necesarios.
● Mantén una comunicación abierta y eficiente para evitar malentendidos.`,
        status: 'unfulfilled',
      },
      {
        date: firstMonday,
        title: 'Entrega de ideas creativas grupo n1',
        description: `
  Hoy es la entrega de la primera mitad de tus ideas creativas. Asegúrate de que estén
bien documentadas en este formato:
${contentCreationGuide}.`,
        status: 'unfulfilled',
      },
      {
        date: firstMonday,
        title: 'Reunión Departamento de IT',
        description: `
  Asiste a la reunión interna organizada con el departamento de IT. Sigue este protocolo:
${itProtocol}.
        `,
        status: 'unfulfilled',
      },
      {
        date: firstMonday,
        title: 'Revisión de comunicaciones',
        description: `
  Revisa todas las vías de comunicación con ${company} y responde a cualquier consulta pendiente.

Como Planner, eres el principal responsable de la atención al cliente. Es crucial que respondas siempre a las consultas de los clientes. Si te encuentras con una pregunta a la que no sabes cómo responder, contacta urgentemente con tu Jefe de Equipo.

Nuestro compromiso es ofrecer una respuesta al cliente en un plazo máximo de 24 horas durante los días laborables, asegurando un servicio al cliente eficiente y responsable.`,
        status: 'unfulfilled',
      },
      {
        date: firstMonday,
        title: 'Revisión del último contenido publicado',
        description: `
  Revisa todas las redes sociales de ${company} para comprobar que el contenido se publica exitosamente y cumple con los altos estándares de calidad de nuestros servicios.

Recuerda, como Planner, tu tarea principal es crear contenido de calidad excepcional con potencial viral.

Si detectas algún error, comunícate urgentemente con el cliente para rectificarlo.

Tu enfoque proactivo y atención al detalle son esenciales para mantener la excelencia en nuestro servicio.`,
      },
    ];
    firstMonday = getNextBusinessDay(firstMonday);

    tuesday = [
      {
        date: firstMonday,
        title: 'Revisión de calendario y Creación de contenido temático',
        description: `
  Revisa tu Calendario de Trabajo:
● Asegúrate de estar al tanto de todas tus reuniones y compromisos programados para el día.
● Confirma las horas y plataformas para cada reunión.

Planificación de Contenido Temático:
● Dedica tiempo a la creación de contenido de alta calidad y con potencial viral, enfocado en los temas relevantes para [Nombre del Cliente].
● Utiliza herramientas y recursos disponibles para inspirarte y asegurar la innovación en tu contenido.

Comunicación Proactiva:
● En caso de conflictos de horario o dudas, contacta a tu Jefe de Equipo o al cliente de manera proactiva para hacer los ajustes necesarios.
● Mantén una comunicación abierta y eficiente para evitar malentendidos.`,
        status: 'unfulfilled',
      },
      {
        date: firstMonday,
        title: 'Entrega de la segunda mitad de ideas',
        description: `
  Hoy es la entrega de la segunda mitad de tus ideas creativas. Asegúrate de que estén bien documentadas en este formato:
${contentCreationGuide}.`,
        status: 'unfulfilled',
      },
      {
        date: firstMonday,
        title: 'Reunión Departamento de Creación',
        description: `
  Asiste a la reunión interna organizada con el departamento de Creación.`,
        status: 'unfulfilled',
      },
      {
        date: firstMonday,
        title: 'Revisión de comunicaciones',
        description: `
  Revisa todas las vías de comunicación con ${company} y responde a cualquier consulta pendiente.

Como Planner, eres el principal responsable de la atención al cliente. Es crucial que respondas siempre a las consultas de los clientes. Si te encuentras con una pregunta a la que no sabes cómo responder, contacta urgentemente con tu Jefe de Equipo. Nuestro compromiso es ofrecer una respuesta al cliente en un plazo máximo de 24 horas durante los días laborables, asegurando un servicio al cliente eficiente y responsable.`,
        status: 'unfulfilled',
      },
      {
        date: firstMonday,
        title: 'Revisión del último contenido publicado',
        description: `
  Revisa todas las redes sociales de ${company} para comprobar que el contenido se publica exitosamente y cumple con los altos estándares de calidad de nuestros servicios.

Recuerda, como Planner, tu tarea principal es crear contenido de calidad excepcional con potencial viral.

Si detectas algún error, comunícate urgentemente con el cliente para rectificarlo.

Tu enfoque proactivo y atención al detalle son esenciales para mantener la excelencia en nuestro servicio`,
        status: 'unfulfilled',
      },
    ];
    firstMonday = getNextBusinessDay(firstMonday);

    wednesday = [
      {
        date: firstMonday,
        title: 'Revisión de calendario y Creación de contenido temático',
        description: `
  Revisa tu Calendario de Trabajo:
 ● Asegúrate de estar al tanto de todas tus reuniones y compromisos programados para el día.
 ● Confirma las horas y plataformas para cada reunión.

Planificación de Contenido Temático:
 ● Dedica tiempo a la creación de contenido de alta calidad y con potencial viral, enfocado en los temas relevantes para [Nombre del Cliente].
 ● Utiliza herramientas y recursos disponibles para inspirarte y asegurar la innovación en tu contenido.

Comunicación Proactiva:
 ● En caso de conflictos de horario o dudas, contacta a tu Jefe de Equipo o al cliente de manera proactiva para hacer los ajustes necesarios.
 ● Mantén una comunicación abierta y eficiente para evitar malentendidos.`,
        status: 'unfulfilled',
      },
      {
        date: firstMonday,
        title: 'Revisión de comunicaciones',
        description: `
  Revisa todas las vías de comunicación con ${company} y responde a cualquier consulta pendiente.

Como Planner, eres el principal responsable de la atención al cliente. Es crucial que respondas siempre a las consultas de los clientes. Si te encuentras con una pregunta a la que no sabes cómo responder, contacta urgentemente con tu Jefe de Equipo.

Nuestro compromiso es ofrecer una respuesta al cliente en un plazo máximo de 24 horas durante los días laborables, asegurando un servicio al cliente eficiente y responsable.`,
        status: 'unfulfilled',
      },
      {
        date: firstMonday,
        title: 'Revisión del último contenido publicado',
        description: `
  Revisa todas las redes sociales de ${company} para comprobar que el contenido se publica exitosamente y cumple con los altos estándares de calidad de nuestros servicios.

Recuerda, como Planner, tu tarea principal es crear contenido de calidad excepcional con potencial viral.

Si detectas algún error, comunícate urgentemente con el cliente para rectificarlo.

Tu enfoque proactivo y atención al detalle son esenciales para mantener la excelencia en nuestro servicio`,
        status: 'unfulfilled',
      },
      {
        date: firstMonday,
        title: 'Revisión de ideas con Jefes de Equipo',
        description: `
  Revisa todas las anotaciones hechas por el jefe de equipo de las ideas presentadas esta semana.

Realiza todos los ajustes necesarios en tus ideas y comienza a trabajar en ellos. Vuelve a presentarlas todas una vez corregidas, y notifica al jefe de equipo de que ya puede volverlas a revisar (Repite este proceso hasta que cuentes con la aprobación de todas las ideas que debes de presentar esta semana por parte del jefe de equipo).`,
        status: 'unfulfilled',
      },
      {
        date: firstMonday,
        title: 'Aprobación e inicio de la redacción',
        description: `
  Una vez cuentes con la aprobación de tus ideas, inicia la redacción del plan detallado.`,
        status: 'unfulfilled',
      },
    ];
    firstMonday = getNextBusinessDay(firstMonday);

    thursday = [
      {
        date: firstMonday,
        title: 'Revisión de calendario y Creación de contenido temático',
        description: `
  Revisa tu Calendario de Trabajo:
● Asegúrate de estar al tanto de todas tus reuniones y compromisos programados para el día.
● Confirma las horas y plataformas para cada reunión.

Planificación de Contenido Temático:
● Dedica tiempo a la creación de contenido de alta calidad y con potencial viral, enfocado en los temas relevantes para [Nombre del Cliente].
● Utiliza herramientas y recursos disponibles para inspirarte y asegurar la innovación en tu contenido.

Comunicación Proactiva:
● En caso de conflictos de horario o dudas, contacta a tu Jefe de Equipo o al cliente de manera proactiva para hacer los ajustes necesarios.
● Mantén una comunicación abierta y eficiente para evitar malentendidos.`,
        status: 'unfulfilled',
      },
      {
        date: firstMonday,
        title: 'Finalización del Plan Detallado',
        description: `
  Finaliza la redacción del plan detallado. Una vez finalizado, súbelo a la carpeta de drive correspondiente.`,
        status: 'unfulfilled',
      },
      {
        date: firstMonday,
        title: 'Revisión de comunicaciones',
        description: `
  Revisa todas las vías de comunicación con ${company} y responde a cualquier consulta pendiente.

Como Planner, eres el principal responsable de la atención al cliente. Es crucial que respondas siempre a las consultas de los clientes. Si te encuentras con una pregunta a la que no sabes cómo responder, contacta urgentemente con tu Jefe de Equipo.

Nuestro compromiso es ofrecer una respuesta al cliente en un plazo máximo de 24 horas durante los días laborables, asegurando un servicio al cliente eficiente y responsable.`,
        status: 'unfulfilled',
      },
      {
        date: firstMonday,
        title: 'Revisión del último contenido publicado',
        description: `
  Revisa todas las redes sociales de ${company} para comprobar que el contenido se publica exitosamente y cumple con los altos estándares de calidad de nuestros servicios.

Recuerda, como Planner, tu tarea principal es crear contenido de calidad excepcional con potencial viral.

Si detectas algún error, comunícate urgentemente con el cliente para rectificarlo.

Tu enfoque proactivo y atención al detalle son esenciales para mantener la excelencia en nuestro servicio`,
        status: 'unfulfilled',
      },
    ];
    firstMonday = getNextBusinessDay(firstMonday);

    friday = [
      {
        date: firstMonday,
        title: 'Entrega del Plan',
        description: `
  Entrega el plan a ${company} entre las 8:00 y 10:00 AM siguiendo este procedimiento:

Preparación del Plan:
 ● Revisa y asegúrate de que el plan esté completo y cumpla con todos los requisitos y estándares de calidad.
 ● Adjunta el plan en un formato accesible y profesional.

Envío del Plan:
 ● Envía el plan a [Nombre del Cliente] a través del medio de comunicación acordado (correo electrónico, plataforma de gestión de proyectos, etc.).
 ● Incluye un mensaje claro y conciso, informando al cliente sobre la entrega del plan y cualquier detalle relevante.

Comunicación y Retroalimentación:
 ● Solicita al cliente que revise el plan y te comunique cualquier cambio, duda o mejora de manera urgente.
 ● Establece un plazo claro para recibir feedback o confirmación de recepción.

Seguimiento:
 ● Realiza un seguimiento si no recibes respuesta en un plazo de 24v horas.
 ● Asegúrate de estar disponible para discutir cualquier aspecto del plan o realizar ajustes si es necesario.`,
        status: 'unfulfilled',
      },
      {
        date: firstMonday,
        title: 'Revisión de calendario y Creación de contenido temático',
        description: `
  Revisa tu Calendario de Trabajo:
 ● Asegúrate de estar al tanto de todas tus reuniones y compromisos programados para el día.
 ● Confirma las horas y plataformas para cada reunión.

Planificación de Contenido Temático:
 ● Dedica tiempo a la creación de contenido de alta calidad y con potencial viral, enfocado en los temas relevantes para [Nombre del Cliente].
 ● Utiliza herramientas y recursos disponibles para inspirarte y asegurar la innovación en tu contenido.

Comunicación Proactiva:
 ● En caso de conflictos de horario o dudas, contacta a tu Jefe de Equipo o al cliente de manera proactiva para hacer los ajustes necesarios.
 ● Mantén una comunicación abierta y eficiente para evitar malentendidos.`,
        status: 'unfulfilled',
      },
      {
        date: firstMonday,
        title: 'Revisión de comunicaciones',
        description: `
  Revisa todas las vías de comunicación con ${company} y responde a cualquier consulta pendiente.

Como Planner, eres el principal responsable de la atención al cliente. Es crucial que respondas siempre a las consultas de los clientes. Si te encuentras con una pregunta a la que no sabes cómo responder, contacta urgentemente con tu Jefe de Equipo.

Nuestro compromiso es ofrecer una respuesta al cliente en un plazo máximo de 24 horas durante los días laborables, asegurando un servicio al cliente eficiente y responsable.`,
        status: 'unfulfilled',
      },
      {
        date: firstMonday,
        title: 'Revisión del último contenido publicado',
        description: `
  Revisa todas las redes sociales de ${company} para comprobar que el contenido se publica exitosamente y cumple con los altos estándares de calidad de nuestros servicios.

Recuerda, como Planner, tu tarea principal es crear contenido de calidad excepcional con potencial viral.

Si detectas algún error, comunícate urgentemente con el cliente para rectificarlo.

Tu enfoque proactivo y atención al detalle son esenciales para mantener la excelencia en nuestro servicio`,
        status: 'unfulfilled',
      },
      {
        date: firstMonday,
        title: 'Desarrollo de ideas creativas',
        description: `
  Inicia el desarrollo de ideas creativas para el plan de ${company}. Consulta esta guía de creación de contenido:
${contentCreationGuide}.`,
        status: 'unfulfilled',
      },
    ];

    taskList = taskList.concat(monday, tuesday, wednesday, thursday, friday);
    if (i != 3) {
      firstMonday = getNextBusinessDay(firstMonday);
    }
  }

  // Adición de las tareas de cierre del mes
  taskList = taskList.concat([
    {
      date: firstMonday,
      title: 'Distribución de encuesta de satisfacción',
      description: `
Distribuye la encuesta de satisfacción a ${company}. Utiliza este modelo:
${surveyTemplate}.`,
      status: 'unfulfilled',
    },
    {
      date: firstMonday,
      title: 'Reunión de Revisión Interna',
      description: `
Propón al cliente que si es necesario podemos realizar una reunión de revisión con ${company} y el Jefe de equipo para evaluar el servicio recibido durante el mes. Aquí tienes una agenda:
${planner}.`,
      status: 'unfulfilled',
    },
    {
      date: firstMonday,
      title: 'Informar al Jefe de Equipo y al departamento financiero',
      description: `
Informa sobre la finalización del plan a tu Jefe de Equipo y al Departamento Financiero. Utiliza este modelo de mensaje:

Hola [Nombre del Jefe de Equipo],

Acabo de terminar el plan del [Mes y Año] para [Nombre del Cliente]. Aquí te dejo los detalles:
 ● Realizado por: [Tu Nombre y el de los Planners involucrados]
 ● Entregado: [Fecha]
 ● KPIs clave: [Enlace a todos los KPIs]
 ● Comentarios: [Cualquier comentario adicional]
¿Podemos revisarlo juntos? Adjunto los documentos relevantes.
Saludos,
[Tu Nombre]`,
      status: 'unfulfilled',
    },
    {
      date: firstMonday,
      title: 'Análisis de Insights',
      description: `
Analiza los insights obtenidos a través de la encuesta de satisfacción u otras vías y déjalos anotados en la ficha de cliente mejoras para el siguiente ciclo.`,
      status: 'unfulfilled',
    },
    {
      date: firstMonday,
      title: 'Recordatorio de pago',
      description: `
Envía un recordatorio de pago a ${company}. Sigue este modelo de mensaje:

¡Hola ${company}!
Nos alegra mucho comunicarte que continuaremos brindando nuestros servicios con la misma pasión y calidad que siempre. Queríamos recordarte de manera amistosa sobre el pago pendiente para seguir haciendo magia juntos.

Si hay algún detalle o necesitas más tiempo, estamos aquí para apoyarte. Tu satisfacción y éxito son nuestra prioridad. Agradecemos tu pronta respuesta y cualquier consulta que puedas tener.

¡Un fuerte saludo y gracias por ser parte de esta aventura con ViralPlan!`,
      status: 'unfulfilled',
    },
    {
      date: getNextBusinessDay(firstMonday),
      title: 'Actualización del calendario de eventos',
      description: `
Actualiza tu calendario de eventos y la planificación para el próximo mes en Google Calendar. Recuerda anotarte todos los eventos con suficientes días de margen para que se pueda crear, guionizar, grabar, editar y publicar el contenido a tiempo.`,
      status: 'unfulfilled',
    },
    {
      date: getNextBusinessDay(firstMonday),
      title: 'Actualización de Documentos y Registros',
      description: `
Revisa y actualiza toda la documentación y registros relacionados con ${company}, sobre todo la ficha CRM.`,
      status: 'unfulfilled',
    },
    {
      date: getNextBusinessDay(firstMonday),
      title: 'Revisión de cargas de trabajo',
      description: `
Realiza una revisión exhaustiva de las cargas de trabajo y considera asignaciones flexibles en caso de que sea necesario. Si es así, comunícate con tu jefe de equipo y exponle tu situación de la manera más detallada posible.`,
      status: 'unfulfilled',
    },
    {
      date: getNextBusinessDay(firstMonday),
      title: 'Revisión final y cierre del mes',
      description: `
Realiza una revisión final y cierra el mes. Consulta esta lista de verificación:
${endOfMonthChecklist}`,
      status: 'unfulfilled',
    },
    {
      date: getNextBusinessDay(firstMonday),
      title: 'El cliente ha pagado el próximo mes',
      description: `
Si el cliente ha pagado ya el próximo mes, marcar esta tarea como realizada para que el software de inicio al nuevo periodo de producción de tareas. Importante, solo SI YA HA PAGADO.

Si no ha pagado aún, dejar esta tarea sin marcar.`,
      status: 'unfulfilled',
    }
  ]);

  return taskList;
}
