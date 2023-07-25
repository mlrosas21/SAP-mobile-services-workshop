/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function RenderImage(context) {
    try{
        const sValue = context.getValue()
        let oClientData = context.evaluateTargetPathForAPI('#Page:AgregarEquipo').getClientData()

        clientAPI.evaluateTargetPath("#Page:AgregarEquipo/#Control:RenderImage")
        
        oClientData.Image = sValue;
    } catch (error) {
        alert(error)
    }
}
