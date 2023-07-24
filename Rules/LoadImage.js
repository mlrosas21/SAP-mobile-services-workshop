/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function LoadImage(clientAPI) {
    try{
        return clientAPI.evaluateTargetPath("#Page:AgregarEquipo/#Control:InputImage/#Value")
    } catch(err) {
        alert(err)
    }
}
