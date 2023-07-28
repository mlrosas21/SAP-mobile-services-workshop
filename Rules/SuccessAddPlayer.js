/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function SuccessAddPlayer(clientAPI) {
    clientAPI.executeAction('/nba/Actions/ClosePage.action');
    clientAPI.evaluateTargetPathForAPI('#Page:DetailTeam/#Control:PlayerCollection').redraw();
}
