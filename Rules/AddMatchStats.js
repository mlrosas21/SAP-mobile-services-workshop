/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function AddMatchStats(clientAPI) {
   const iMinutos = clientAPI.evaluateTargetPath('#Page:AddMathStats/#Control:FCMinutos').getValue()
   const iTirosLibres = clientAPI.evaluateTargetPath('#Page:AddMathStats/#Control:FCTirosLibres').getValue()
   const iDobles = clientAPI.evaluateTargetPath('#Page:AddMathStats/#Control:FCDobles').getValue()
   const iTriples = clientAPI.evaluateTargetPath('#Page:AddMathStats/#Control:FCTriples').getValue()
   const iAsistencias = clientAPI.evaluateTargetPath('#Page:AddMathStats/#Control:FCAsistencias').getValue()
   const iRebotes = clientAPI.evaluateTargetPath('#Page:AddMathStats/#Control:FCRebotes').getValue()

   let obj = {
      Puntos: iTirosLibres + (iDobles * 2) + (iTriples * 3),
      Minutos: iMinutos,
      Dobles: iDobles,
      Triples: iTirosLibres,
      Asistencias: iAsistencias,
      Rebotes: iRebotes,
   }

   const oJugador = JSON.stringify(obj)

   return oJugador
}
