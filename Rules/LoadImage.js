/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function LoadImage(clientAPI) {
    try{
        const sUrl = clientAPI.evaluateTargetPath("#Page:AgregarEquipo/#Control:InputImage")
        const oImage = clientAPI.evaluateTargetPath("#Page:AgregarEquipo/#Control:RenderImage")

        oImage.Image = sUrl.getValue()
    } catch(err) {
        alert(err)
    }
}
