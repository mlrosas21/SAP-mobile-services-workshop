import CommonLibrary from './Libs/FilterCommon';

/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function CreateFilter(clientAPI) {
    try{
        let aFilters = []

        const aEquipo = clientAPI.evaluateTargetPath('#Page:Players/#Control:FCEquipo')
        if(aEquipo[0]){
            aFilters.push(CommonLibrary.getQueryFilterEQ(clientAPI, 'NombreEquipo', `'${aEquipo[0].ReturnValue}'`))
        }

        return aFilters;
    } catch (error){
        alert(error)
    }
}
