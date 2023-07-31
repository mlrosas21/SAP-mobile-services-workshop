/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function CheckPlayerData(clientAPI) {
    try {
        const dFechaNacimiento = clientAPI.evaluateTargetPathForAPI('#Page:AddPlayer/#Control:DPFechaNacimiento').getValue();
        const iDorsal = clientAPI.evaluateTargetPathForAPI('#Page:AddPlayer/#Control:FCDorsal').getValue();
        const iPeso = parseInt(clientAPI.evaluateTargetPathForAPI('#Page:AddPlayer/#Control:FCPeso').getValue());
        const iAltura = parseInt(clientAPI.evaluateTargetPathForAPI('#Page:AddPlayer/#Control:FCAltura').getValue());
       
        // check fecha nacimiento
        const oFechaNacimiento = new Date(dFechaNacimiento);
        const now = new Date();
        const eighteenYearsAgo = new Date(now.getFullYear() - 18, now.getMonth(), now.getDate());
       
        if (oFechaNacimiento > eighteenYearsAgo) {
            // The player is under 18 years old
            clientAPI.executeAction('/nba/Actions/ErrorFechaNacimiento.action')
            return;
        }
       
        if (iDorsal > 99) {
            clientAPI.executeAction('/nba/Actions/ErrorDorsal.action')
            return
        }
       
        if (iPeso > 200 || iPeso < 50) {
            clientAPI.executeAction('/nba/Actions/ErrorPeso.action')
            return
        }

        if(iAltura < 140 || iAltura >250) {
            clientAPI.executeAction('/nba/Actions/ErrorAltura.action')
            return
        }
       
        clientAPI.executeAction('/nba/Actions/ConfirmAddPlayer.action')
    } catch (error) {
        alert(error)
    }
}
