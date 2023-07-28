/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function AddPlayer(clientAPI) {
    try{
        const sEquipo = clientAPI.binding.NombreEquipo
        clientAPI.executeAction('/nba/Actions/NavToAddPlayer.action');
        
        const oClientData = clientAPI.evaluateTargetPathForAPI('#Page:DetailTeam').getClientData()
        oClientData.NombreEquipo = sEquipo
    } catch(error){
        alert(error)
    }
}
