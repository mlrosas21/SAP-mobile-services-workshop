/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function RefreshTeamData(clientAPI) {
    try {
        const oPage = clientAPI.evaluateTargetPathForAPI('#Page:DetailTeam')
        // const oObjectCollection = clientAPI.evaluateTargetPathForAPI('#Page:DetailTeam/#Control:PlayerCollection')
        oPage.redraw()
        // oObjectCollection.redraw()

        alert('redraw')
    } catch (error) {
        alert(error)
    }
}
