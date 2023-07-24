{
	"_Name": "nba",
	"Version": "/nba/Globals/AppDefinition_Version.global",
	"MainPage": "/nba/Pages/Main.page",
	"OnLaunch": [
		"/nba/Actions/Service/InitializeOnline.action"
	],
	"OnWillUpdate": "/nba/Rules/OnWillUpdate.js",
	"OnDidUpdate": "/nba/Actions/Service/InitializeOnline.action",
	"Styles": "/nba/Styles/Styles.less",
	"Localization": "/nba/i18n/i18n.properties",
	"_SchemaVersion": "23.4"
}