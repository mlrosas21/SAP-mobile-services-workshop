export default class {
	static getQueryFilterEQ(clientAPI, sProperty, sValue) {
		return clientAPI.createFilterCriteria(clientAPI.filterTypeEnum.Filter, undefined, undefined, [`${sProperty} eq ${sValue}`], true);
	}
}