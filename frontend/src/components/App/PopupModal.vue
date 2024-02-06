<template>
  <div
    v-if="rerenderer"
    class="w-full h-10 mt-6 text-black flex flex-col justify-center bg-white"
    style="border-radius: 8px; vertical-align: middle"
    :class="{ 
      retrasado: props.fecha < formatDate() && user.role != 'admin', 
      hoy: (props.fecha == formatDate()),
      pospuestas: props.status == 'postponed'
    }"
    @click="showModal"
  >
    <h3
      class="ml-2 text-lg align-middle"
      style="align-items: center !important; vertical-align: middle"
    >
      {{ props.fecha + ' - ' + props.titulo }}
    </h3>
  </div>

  <fwb-modal v-if="isShowModal" @close="closeModal">
    <template #header>
      <div class="flex items-center text-lg text-black">
        {{ props.titulo }}
      </div>
    </template>
    <template #body>
      <div v-if="props.titulo != 'Formulario de Feedback Diario'">
        <pre class="text-black break-normal w-full whitespace-pre-line">
          {{ props.descripcion }}
        </pre>
      </div>
      <div v-else>
        <!-- 1. Has hablado hoy con el cliente?-->
        <fwb-p class="mb-2">
          ¿Has hablado hoy con el cliente?
        </fwb-p>
        <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li class="w-full !m-0 pl-3 flex border-gray-200 rounded-t-lg dark:border-gray-600">
            <fwb-radio
              v-model="spokeWithTheClient"
              label="Sí"
              name="spokeWithTheClient"
              value="Sí"
            />
          </li>
          <li class="w-full !m-0 pl-3 flex border-gray-200 rounded-t-lg dark:border-gray-600">
            <fwb-radio
              v-model="spokeWithTheClient"
              label="No"
              name="spokeWithTheClient"
              value="No"
            />
          </li>
        </ul>
        <textarea
          v-if="spokeWithTheClient == 'Sí'"
          id="spokeWithTheClientObservations"
          v-model="spokeWithTheClientObservations"
          rows="3"
          placeholder="Detalla el contenido de la conversación"
          class="block p-2.5 w-full text-sm mt-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-600 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
  <pre></pre></textarea
        >
        <!-- 2. El cliente esta realizando el trabajo como se espera?-->
        <fwb-p class="mb-2">
          ¿El cliente está realizando el trabajo como se espera?
        </fwb-p>
        <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li class="w-full !m-0 pl-3 flex border-gray-200 rounded-t-lg dark:border-gray-600">
            <fwb-radio
              v-model="clientWorkingAsExpected"
              label="Sí"
              name="clientWorkingAsExpected"
              value="Sí"
            />
          </li>
          <li class="w-full !m-0 pl-3 flex border-gray-200 rounded-t-lg dark:border-gray-600">
            <fwb-radio
              v-model="clientWorkingAsExpected"
              label="No"
              name="clientWorkingAsExpected"
              value="No"
            />
          </li>
        </ul>
        <textarea
          v-if="clientWorkingAsExpected == 'No'"
          id="clientWorkingAsExpectedObservations"
          v-model="clientWorkingAsExpectedObservations"
          rows="3"
          class="block p-2.5 w-full text-sm mt-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-600 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Si no, ¿cuáles son las áreas de preocupación?"
        >
  <pre></pre></textarea
        >
        <!-- 3. Ha habido inconvenientes?-->
        <fwb-p class="mb-2">
          ¿Ha habido inconvenientes?
        </fwb-p>
        <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li class="w-full !m-0 pl-3 flex border-gray-200 rounded-t-lg dark:border-gray-600">
            <fwb-radio
              v-model="problemsFound"
              label="Sí"
              name="problemsFound"
              value="Sí"
            />
          </li>
          <li class="w-full !m-0 pl-3 flex border-gray-200 rounded-t-lg dark:border-gray-600">
            <fwb-radio
              v-model="problemsFound"
              label="No"
              name="problemsFound"
              value="No"
            />
          </li>
        </ul>
        <textarea
          v-if="problemsFound == 'Sí'"
          id="problemsFoundObservations"
          v-model="problemsFoundObservations"
          rows="3"
          class="block p-2.5 w-full text-sm mt-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-600 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Describir el/los incoveniente/s y si se ha/han resuelto"
        >
  <pre></pre></textarea
        >
        <!-- 4. Quedan problemas pendientes?-->
        <fwb-p class="mb-2">
          ¿Quedan problemas pendientes?
        </fwb-p>
        <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li class="w-full !m-0 pl-3 flex border-gray-200 rounded-t-lg dark:border-gray-600">
            <fwb-radio
              v-model="pendingProblems"
              label="Sí"
              name="pendingProblems"
              value="Sí"
            />
          </li>
          <li class="w-full !m-0 pl-3 flex border-gray-200 rounded-t-lg dark:border-gray-600">
            <fwb-radio
              v-model="pendingProblems"
              label="No"
              name="pendingProblems"
              value="No"
            />
          </li>
        </ul>
        <textarea
          v-if="pendingProblems == 'Sí'"
          id="pendingProblemsObservations"
          v-model="pendingProblemsObservations"
          rows="3"
          class="block p-2.5 w-full text-sm mt-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-600 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Especificar los problemas pendientes"
        >
  <pre></pre></textarea
        >
        <!-- 5. Ha/has subido el video?-->
        <fwb-p class="mb-2">
          ¿Ha/Has subido el vídeo?
        </fwb-p>
        <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li class="w-full !m-0 pl-3 flex border-gray-200 rounded-t-lg dark:border-gray-600">
            <fwb-radio
              v-model="videoUploaded"
              label="Sí"
              name="videoUploaded"
              value="Sí"
            />
          </li>
          <li class="w-full !m-0 pl-3 flex border-gray-200 rounded-t-lg dark:border-gray-600">
            <fwb-radio
              v-model="videoUploaded"
              label="No"
              name="videoUploaded"
              value="No"
            />
          </li>
        </ul>
        <textarea
          v-if="videoUploaded == 'No'"
          id="videoUploadedObservations"
          v-model="videoUploadedObservations"
          rows="3"
          class="block p-2.5 w-full text-sm mt-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-600 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="¿Cuál es el motivo del retraso?"
        >
  <pre></pre></textarea
        >
        <!-- 6. Nos ha mandado los videos para editar?-->
        <fwb-p class="mb-2">
          ¿Nos ha mandado los vídeos para editar?
        </fwb-p>
        <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li class="w-full !m-0 pl-3 flex border-gray-200 rounded-t-lg dark:border-gray-600">
            <fwb-radio
              v-model="videosSent"
              label="Sí"
              name="videosSent"
              value="Sí"
            />
          </li>
          <li class="w-full !m-0 pl-3 flex border-gray-200 rounded-t-lg dark:border-gray-600">
            <fwb-radio
              v-model="videosSent"
              label="No"
              name="videosSent"
              value="No"
            />
          </li>
        </ul>
        <textarea
          v-if="videosSent == 'Sí'"
          id="videosSentObservations"
          v-model="videosSentObservations"
          rows="3"
          class="block p-2.5 w-full text-sm mt-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-600 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Detalles sobre los vídeos recibidos o esperados"
        >
  <pre></pre></textarea
        >
        <!-- 7. Ha aprobado el/los video/s?-->
        <fwb-p class="mb-2">
          ¿Ha aprobado el/los vídeo/s?
        </fwb-p>
        <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li class="w-full !m-0 pl-3 flex border-gray-200 rounded-t-lg dark:border-gray-600">
            <fwb-radio
              v-model="videosAproved"
              label="Sí"
              name="videosAproved"
              value="Sí"
            />
          </li>
          <li class="w-full !m-0 pl-3 flex border-gray-200 rounded-t-lg dark:border-gray-600">
            <fwb-radio
              v-model="videosAproved"
              label="No"
              name="videosAproved"
              value="No"
            />
          </li>
        </ul>
        <textarea
          v-if="videosAproved == 'No'"
          id="videosAprovedObservations"
          v-model="videosAprovedObservations"
          rows="3"
          class="block p-2.5 w-full text-sm mt-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-600 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="¿Cuáles son los comentarios o quejas del cliente?"
        >
  <pre></pre></textarea
        >
        <!-- 8. Tenemos fecha pendiente del rodaje?-->
        <fwb-p class="mb-2">
          ¿Tenemos fecha pendiente del rodaje?
        </fwb-p>
        <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li class="w-full !m-0 pl-3 flex border-gray-200 rounded-t-lg dark:border-gray-600">
            <fwb-radio
              v-model="recordingDate"
              label="Sí"
              name="recordingDate"
              value="Sí"
            />
          </li>
          <li class="w-full !m-0 pl-3 flex border-gray-200 rounded-t-lg dark:border-gray-600">
            <fwb-radio
              v-model="recordingDate"
              label="No"
              name="recordingDate"
              value="No"
            />
          </li>
        </ul>
        <textarea
          v-if="recordingDate == 'Sí'"
          id="recordingDateObservations"
          v-model="recordingDateObservations"
          rows="3"
          class="block p-2.5 w-full text-sm mt-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-600 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Confirmar fecha o indicar si está por definirse"
        >
  <pre></pre></textarea
        >
        <!-- 9. Ha expresado el cliente alguna nueva necesidad o solicitud?-->
        <fwb-p class="mb-2">
          ¿Ha expresado el cliente alguna nueva necesidad o solicitud?
        </fwb-p>
        <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li class="w-full !m-0 pl-3 flex border-gray-200 rounded-t-lg dark:border-gray-600">
            <fwb-radio
              v-model="newNecessity"
              label="Sí"
              name="newNecessity"
              value="Sí"
            />
          </li>
          <li class="w-full !m-0 pl-3 flex border-gray-200 rounded-t-lg dark:border-gray-600">
            <fwb-radio
              v-model="newNecessity"
              label="No"
              name="newNecessity"
              value="No"
            />
          </li>
        </ul>
        <textarea
          v-if="newNecessity == 'Sí'"
          id="newNecessityObservations"
          v-model="newNecessityObservations"
          rows="3"
          class="block p-2.5 w-full text-sm mt-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-600 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Detallar la nueva necesidad o solicitud"
        >
  <pre></pre></textarea
        >
        <!-- 10. Crees que los socios deberian intervenir en alguna cosa?-->
        <fwb-p class="mb-2">
          ¿Crees que los socios deberían intervenir en alguna cosa?
        </fwb-p>
        <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li class="w-full !m-0 pl-3 flex border-gray-200 rounded-t-lg dark:border-gray-600">
            <fwb-radio
              v-model="ownerIntervention"
              label="Sí"
              name="ownerIntervention"
              value="Sí"
            />
          </li>
          <li class="w-full !m-0 pl-3 flex border-gray-200 rounded-t-lg dark:border-gray-600">
            <fwb-radio
              v-model="ownerIntervention"
              label="No"
              name="ownerIntervention"
              value="No"
            />
          </li>
        </ul>
        <textarea
          v-if="ownerIntervention == 'Sí'"
          id="ownerInterventionObservations"
          v-model="ownerInterventionObservations"
          rows="3"
          class="block p-2.5 w-full text-sm mt-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-600 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Si sí, explicar en que aspectos y porqué"
        >
  <pre></pre></textarea
        >
        <!-- 11. Observaciones no cubiertas -->
        <p class="mt-3 text-black">Detalla cualquier otra observación que no se haya cubierto</p>
        <textarea
          id="notCoveredObservations"
          v-model="notCoveredObservations"
          rows="4"
          class="block mt-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-600 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
  <pre></pre></textarea
        >
        <!-- 12. ¿Se están cumpliendo los plazos acordados para las entregas de video?-->
        <fwb-p class="mb-2">
          ¿Se están cumpliendo los plazos acordados para las entregas de vídeo?
        </fwb-p>
        <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li class="w-full !m-0 pl-3 flex border-gray-200 rounded-t-lg dark:border-gray-600">
            <fwb-radio
              v-model="deadlinesOfVideoDeliveries"
              label="Sí"
              name="deadlinesOfVideoDeliveries"
              value="Sí"
            />
          </li>
          <li class="w-full !m-0 pl-3 flex border-gray-200 rounded-t-lg dark:border-gray-600">
            <fwb-radio
              v-model="deadlinesOfVideoDeliveries"
              label="No"
              name="deadlinesOfVideoDeliveries"
              value="No"
            />
          </li>
        </ul>

        <!-- 13. Hay algun retraso o adelanto significativo?-->
        <fwb-p class="mb-2">
          ¿Hay algún retraso o adelanto significativo?
        </fwb-p>
        <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li class="w-full !m-0 pl-3 flex border-gray-200 rounded-t-lg dark:border-gray-600">
            <fwb-radio
              v-model="significantDeadlineChange"
              label="Sí"
              name="significantDeadlineChange"
              value="Sí"
            />
          </li>
          <li class="w-full !m-0 pl-3 flex border-gray-200 rounded-t-lg dark:border-gray-600">
            <fwb-radio
              v-model="significantDeadlineChange"
              label="No"
              name="significantDeadlineChange"
              value="No"
            />
          </li>
        </ul>
        <textarea
          v-if="significantDeadlineChange == 'Sí'"
          id="significantDeadlineChangeObservations"
          v-model="significantDeadlineChangeObservations"
          rows="3"
          class="block p-2.5 w-full text-sm mt-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-600 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Explica cualquier discrepancia en los plazos"
        >
  <pre></pre></textarea
        >
        <!-- 14. Hay planes o proyectos futuros discutidos con el cliente que deberían ser registrados o preparados?-->
        <fwb-p class="mb-2">
          ¿Hay planes o proyectos futuros discutidos con el cliente que deberían ser registrados o preparados?
        </fwb-p>
        <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li class="w-full !m-0 pl-3 flex border-gray-200 rounded-t-lg dark:border-gray-600">
            <fwb-radio
              v-model="futurePlans"
              label="Sí"
              name="futurePlans"
              value="Sí"
            />
          </li>
          <li class="w-full !m-0 pl-3 flex border-gray-200 rounded-t-lg dark:border-gray-600">
            <fwb-radio
              v-model="futurePlans"
              label="No"
              name="futurePlans"
              value="No"
            />
          </li>
        </ul>
        <textarea
          v-if="futurePlans == 'Sí'"
          id="futurePlansObservations"
          v-model="futurePlansObservations"
          rows="3"
          class="block p-2.5 w-full text-sm mt-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-600 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Detalles sobre futuros planes o proyectos"
        >
  <pre></pre></textarea
        >
        <!-- 15. Basado en tu experiencia hasta la fecha, qué mejoras podrían implementarse en el proceso o en la interacción con el cliente?-->
        <fwb-p class="mb-2">
          Basado en tu experiencia hasta la fecha, ¿tienes sugerencias de mejora que podrían implementarse en el proceso o en la interacción con el cliente?
        </fwb-p>
        <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li class="w-full !m-0 pl-3 flex border-gray-200 rounded-t-lg dark:border-gray-600">
            <fwb-radio
              v-model="improvementsOnInteraction"
              label="Sí"
              name="improvementsOnInteraction"
              value="Sí"
            />
          </li>
          <li class="w-full !m-0 pl-3 flex border-gray-200 rounded-t-lg dark:border-gray-600">
            <fwb-radio
              v-model="improvementsOnInteraction"
              label="No"
              name="improvementsOnInteraction"
              value="No"
            />
          </li>
        </ul>
        <textarea
          v-if="improvementsOnInteraction == 'Sí'"
          id="improvementsOnInteractionObservations"
          v-model="improvementsOnInteractionObservations"
          rows="3"
          class="block p-2.5 w-full text-sm mt-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-600 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Sugerencias específicas para mejoras"
        >
  <pre></pre></textarea
        >
        <!-- 16. Hay algun cambio respecto al servicio contratado por el cliente que haya solicitado? -->
        <fwb-p class="mb-2">
          ¿Hay algún cambio respecto al servicio contratado por el cliente que haya solicitado?
        </fwb-p>
        <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li class="w-full !m-0 pl-3 flex border-gray-200 rounded-t-lg dark:border-gray-600">
            <fwb-radio
              v-model="changesRequested"
              label="Sí"
              name="changesRequested"
              value="Sí"
            />
          </li>
          <li class="w-full !m-0 pl-3 flex border-gray-200 rounded-t-lg dark:border-gray-600">
            <fwb-radio
              v-model="changesRequested"
              label="No"
              name="changesRequested"
              value="No"
            />
          </li>
        </ul>
        <textarea
          v-if="changesRequested == 'Sí'"
          id="changesRequestedObservations"
          v-model="changesRequestedObservations"
          rows="3"
          class="block p-2.5 w-full text-sm mt-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-600 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Detalla el o los cambios solicitados por el cliente"
        >
  <pre></pre></textarea
        >
        <!-- 17. Los ultimos videos publicados cuantas visitas han alcanzado-->
        <p class="mt-3 text-black">Detalla cuántas visitas han alcanzado los últimos vídeos publicados</p>
        <textarea
          id="lastPublishedVideosViews"
          v-model="lastPublishedVideosViews"
          rows="3"
          class="block mt-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-600 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
  <pre></pre></textarea
        >
        <!-- 18. Si te falta cualquier cosa de este formulario o algo extra para realizar tu trabajo de una manera excelente, se lo has solicitado/comunicado a la persona correspondiente?-->
        <fwb-p class="mb-2">
          ¿Si te falta cualquier cosa de este formulario o algo extra para realizar tu trabajo de una manera excelente, se lo has solicitado/comunicado a la persona correspondiente?
        </fwb-p>
        <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li class="w-full !m-0 pl-3 flex border-gray-200 rounded-t-lg dark:border-gray-600">
            <fwb-radio
              v-model="generalImprovement"
              label="Sí"
              name="generalImprovement"
              value="Sí"
            />
          </li>
          <li class="w-full !m-0 pl-3 flex border-gray-200 rounded-t-lg dark:border-gray-600">
            <fwb-radio
              v-model="generalImprovement"
              label="No"
              name="generalImprovement"
              value="No"
            />
          </li>
        </ul>
        <textarea
          v-if="generalImprovement == 'Sí'"
          id="generalImprovementObservations"
          v-model="generalImprovementObservations"
          rows="3"
          class="block p-2.5 w-full text-sm mt-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-600 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Sugerencias específicas para mejoras"
        >
  <pre></pre></textarea
        >
      </div>
    </template>
    <template #footer>
      <div class="flex justify-between">
        <fwb-button color="green" @click="completeTask">
          Tarea Completada
        </fwb-button>
        <fwb-button
          color="dark"
          style="color: black !important"
          @click="postponeTask"
        >
          Posponer a Mañana
        </fwb-button>
        <fwb-button color="red" @click="negateTask">
          No puedo completar la tarea
        </fwb-button>
      </div>
    </template>
  </fwb-modal>
</template>

<script setup>
const props = defineProps({
  titulo: String,
  company: String,
  fecha: String,
  descripcion: String,
  status: String,
});

import { ref, nextTick } from 'vue';
import { companiesArrayStore } from '@/stores/companies';
import { FwbButton, FwbModal, FwbP, FwbRadio } from 'flowbite-vue';
import { updateCompanyTasks } from '../../utils/db/companyModel';
import { getSecondTaskList } from '../../assets/taskList';
import { formatDate, getNextBusinessDay, getXDaysAgo } from '../../utils/dates';
import { userStore } from '../../stores/user';
import { saveForm } from '../../utils/db/formsModel.js';


const companiesArray = companiesArrayStore()
const isShowModal = ref(false);
const user = userStore();

// FORM VARIABLES
const spokeWithTheClient = ref('');
const clientWorkingAsExpected = ref('');
const problemsFound = ref('');
const pendingProblems = ref('');
const videoUploaded = ref('');
const videosSent = ref('');
const videosAproved = ref('');
const recordingDate = ref('');
const newNecessity = ref('');
const ownerIntervention = ref('');
const deadlinesOfVideoDeliveries = ref('');
const significantDeadlineChange = ref('');
const futurePlans = ref('');
const improvementsOnInteraction = ref('');
const changesRequested = ref('');
const generalImprovement = ref('');
const spokeWithTheClientObservations = ref('');
const clientWorkingAsExpectedObservations = ref('');
const problemsFoundObservations = ref('');
const pendingProblemsObservations = ref('');
const videoUploadedObservations = ref('');
const videosSentObservations = ref('');
const videosAprovedObservations = ref('');
const recordingDateObservations = ref('');
const newNecessityObservations = ref('');
const ownerInterventionObservations = ref('');
const significantDeadlineChangeObservations = ref('');
const futurePlansObservations = ref('');
const improvementsOnInteractionObservations = ref('');
const changesRequestedObservations = ref('');
const generalImprovementObservations = ref('');
const notCoveredObservations = ref('');
const lastPublishedVideosViews = ref('');

const formVariables = ref({
  '¿Has hablado hoy con el cliente?: ': spokeWithTheClient,
  'Detalles de la conversación con el cliente: ': spokeWithTheClientObservations,
  '¿El cliente está realizando el trabajo como se espera?': clientWorkingAsExpected,
  'Porqué no lo está haciendo como se espera: ': clientWorkingAsExpectedObservations,
  '¿Ha habido inconvenientes?: ': problemsFound,
  'Detalles de los inconvenientes: ': problemsFoundObservations,
  '¿Quedan problemas pendientes?: ': pendingProblems,
  'Problemas pendientes: ': pendingProblemsObservations,
  '¿Ha/Has subido el vídeo?: ': videoUploaded,
  'Porqué no fue subido el vídeo: ': videoUploadedObservations,
  '¿Nos ha mandado los vídeos para editar?: ': videosSent,
  'Detalles de los vídeos enviados: ': videosSentObservations,
  '¿Ha aprobado el/los vídeo/s?: ': videosAproved,
  'Porqué no aprobó los vídeos: ': videosAprovedObservations,
  '¿Tenemos fecha pendiente del rodaje?: ': recordingDate,
  'Fecha de rodaje pendiente: ': recordingDateObservations,
  '¿Ha expresado el cliente alguna nueva necesidad o solicitud?: ': newNecessity,
  'Nuevas necesidades del cliente: ': newNecessityObservations,
  '¿Crees que los socios deberían intervenir en alguna cosa?: ': ownerIntervention,
  'En qué deberían intervenir los socios: ': ownerInterventionObservations,
  'Observaciones no cubiertas: ': notCoveredObservations,
  '¿Se están cumpliendo los plazos acordados para las entregas de vídeo?: ': deadlinesOfVideoDeliveries,
  '¿Hay algún retraso o adelanto significativo?: ': significantDeadlineChange,
  'Retrasos o adelantos que ha habido: ': significantDeadlineChangeObservations,
  '¿Hay planes o proyectos futuros discutidos con el cliente que deberían ser registrados o preparados?: ': futurePlans,
  'Planes futuros en detalle a ser preparados': futurePlansObservations,
  'Basado en tu experiencia hasta la fecha, ¿qué mejoras podrían implementarse en el proceso o en la interacción con el cliente?': improvementsOnInteraction,
  'Mejoras a implementar en la comunicación: ': improvementsOnInteractionObservations,
  '¿Hay algún cambio respecto al servicio contratado por el cliente que haya solicitado?: ': changesRequested,
  'Cambios solicitados por el cliente respecto al servicio contratado: ': changesRequestedObservations,
  'Detalla cuántas visitas han alcanzado los últimos vídeos publicados: ': lastPublishedVideosViews,
  '¿Si te falta cualquier cosa de este formulario o algo extra para realizar tu trabajo de una manera excelente, se lo has solicitado/comunicado a la persona correspondiente?: ': generalImprovement,
  'Detalles: ': generalImprovementObservations,
})


let rerenderer = ref(true);

function reRenderer() {
  rerenderer.value = !rerenderer.value;
  nextTick()
  rerenderer.value = !rerenderer.value;
}

function completeTask() {
  companiesArray.companiesArray.forEach(company => {
    if (company.company.name == props.company) {
      if (typeof company.company.completedTasks == 'undefined') {
        company.company.completedTasks = []
      }
      for (let i = 0; i < company.company.tasks.length; i++) {
        if (company.company.tasks[i].title == props.titulo) {
          if (props.titulo != 'Formulario de Feedback Diario') {
            for (let j = 0; j<company.company.completedTasks.length; j++) {
              if (company.company.completedTasks[j].date < getXDaysAgo(7)) {
                company.company.completedTasks.splice(j, 1);
                break;
              }
            }
            company.company.completedTasks.push(company.company.tasks[i])
          } else {
            saveForm({
              company: props.company,
              date: props.fecha,
              form: formVariables.value,
            })
          }
          company.company.tasks.splice(i, 1);
          if (props.titulo == 'Reunión de formulario' || props.titulo == 'El cliente ha pagado el próximo mes') {
            company.company.tasks = company.company.tasks.concat(getSecondTaskList(company.company.name, formatDate()))
          } 
          break;
        }
      }
      updateCompanyTasks(company.company);
    }
  });
  reRenderer();
  closeModal();
}

function postponeTask() {
  companiesArray.companiesArray.forEach(company => {
    if (company.company.name == props.company) {
      for (let i = 0; i < company.company.tasks.length; i++) {
        if (company.company.tasks[i].title == props.titulo) {
          company.company.tasks[i].date = getNextBusinessDay(props.fecha);
          company.company.tasks[i].status = 'postponed';
          break;
        }
      }
      updateCompanyTasks(company.company);
    }
  });
  reRenderer();
  closeModal();
}

function negateTask() {
  companiesArray.companiesArray.forEach(company => {
    if (company.company.name == props.company) {
      for (let i = 0; i < company.company.tasks.length; i++) {
        if (company.company.tasks[i].title == props.titulo) {
          company.company.tasks.splice(i, 1);
          break;
        }
      }
      updateCompanyTasks(company.company);
    }
  });
  reRenderer();
  closeModal();
}

function closeModal() {
  isShowModal.value = false;
}
function showModal() {
  isShowModal.value = true;
}
</script>

<style scoped>
.retrasado {
  background-color: #ff004d !important;
  color: white !important;
}
.hoy {
  background-color: #ff004d !important;
  color: white !important;
}
.pospuestas {
  background-color: #ff004d !important;
  color: white !important;
}
</style>
