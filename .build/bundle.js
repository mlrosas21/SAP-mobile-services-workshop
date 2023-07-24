(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/nba/i18n/i18n.properties":
/*!****************************************************!*\
  !*** ./build.definitions/nba/i18n/i18n.properties ***!
  \****************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ "./build.definitions/nba/Rules/AppUpdateFailure.js":
/*!*********************************************************!*\
  !*** ./build.definitions/nba/Rules/AppUpdateFailure.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AppUpdateFailure(clientAPI) {
  let result = clientAPI.actionResults.AppUpdate.error.toString();
  var message;
  console.log(result);
  if (result.startsWith('Error: Uncaught app extraction failure:')) {
    result = 'Error: Uncaught app extraction failure:';
  }
  if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body: 404 Not Found: Requested route')) {
    result = 'Application instance is not up or running';
  }
  if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body')) {
    result = 'Service instance not found.';
  }
  switch (result) {
    case 'Service instance not found.':
      message = 'Mobile App Update feature is not assigned or not running for your application. Please add the Mobile App Update feature, deploy your application, and try again.';
      break;
    case 'Error: LCMS GET Version Response Error Response Status: 404 | Body: Failed to find a matched endpoint':
      message = 'Mobile App Update feature is not assigned to your application. Please add the Mobile App Update feature, deploy your application, and try again.';
      break;
    case 'Error: LCMS GET Version Response failed: Error: Optional(OAuth2Error.tokenRejected: The newly acquired or refreshed token got rejected.)':
      message = 'The Mobile App Update feature is not assigned to your application or there is no Application metadata deployed. Please check your application in Mobile Services and try again.';
      break;
    case 'Error: Uncaught app extraction failure:':
      message = 'Error extracting metadata. Please redeploy and try again.';
      break;
    case 'Application instance is not up or running':
      message = 'Communication failure. Verify that the BindMobileApplicationRoutesToME Application route is running in your BTP space cockpit.';
      break;
    default:
      message = result;
      break;
  }
  return clientAPI.getPageProxy().executeAction({
    "Name": "/nba/Actions/AppUpdateFailureMessage.action",
    "Properties": {
      "Duration": 0,
      "Message": message
    }
  });
}

/***/ }),

/***/ "./build.definitions/nba/Rules/AppUpdateSuccess.js":
/*!*********************************************************!*\
  !*** ./build.definitions/nba/Rules/AppUpdateSuccess.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function sleep(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve();
    }, ms);
  });
}
function AppUpdateSuccess(clientAPI) {
  var message;
  // Force a small pause to let the progress banner show in case there is no new version available
  return sleep(500).then(function () {
    let result = clientAPI.actionResults.AppUpdate.data;
    console.log(result);
    let versionNum = result.split(': ')[1];
    if (result.startsWith('Current version is already up to date')) {
      return clientAPI.getPageProxy().executeAction({
        "Name": "/nba/Actions/AppUpdateSuccessMessage.action",
        "Properties": {
          "Message": `You are already using the latest version: ${versionNum}`,
          "NumberOfLines": 2
        }
      });
    } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
      message = 'No Application metadata found. Please deploy your application and try again.';
      return clientAPI.getPageProxy().executeAction({
        "Name": "/nba/Actions/AppUpdateSuccessMessage.action",
        "Properties": {
          "Duration": 5,
          "Message": message,
          "NumberOfLines": 2
        }
      });
    }
  });
}

/***/ }),

/***/ "./build.definitions/nba/Rules/LoadImage.js":
/*!**************************************************!*\
  !*** ./build.definitions/nba/Rules/LoadImage.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LoadImage)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function LoadImage(clientAPI) {
  try {
    return clientAPI.evaluateTargetPath("#Page:AgregarEquipo/#Control:InputImage/#Value");
  } catch (err) {
    alert(err);
  }
}

/***/ }),

/***/ "./build.definitions/nba/Rules/OnWillUpdate.js":
/*!*****************************************************!*\
  !*** ./build.definitions/nba/Rules/OnWillUpdate.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnWillUpdate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OnWillUpdate(clientAPI) {
  return clientAPI.executeAction('/nba/Actions/OnWillUpdate.action').then(result => {
    if (result.data) {
      return Promise.resolve();
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/nba/Rules/ResetAppSettingsAndLogout.js":
/*!******************************************************************!*\
  !*** ./build.definitions/nba/Rules/ResetAppSettingsAndLogout.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetAppSettingsAndLogout)
/* harmony export */ });
function ResetAppSettingsAndLogout(context) {
  let logger = context.getLogger();
  let platform = context.nativescript.platformModule;
  let appSettings = context.nativescript.appSettingsModule;
  var appId;
  if (platform && (platform.isIOS || platform.isAndroid)) {
    appId = context.evaluateTargetPath('#Application/#AppData/MobileServiceAppId');
  } else {
    appId = 'WindowsClient';
  }
  try {
    // Remove any other app specific settings
    appSettings.getAllKeys().forEach(key => {
      if (key.substring(0, appId.length) === appId) {
        appSettings.remove(key);
      }
    });
  } catch (err) {
    logger.log(`ERROR: AppSettings cleanup failure - ${err}`, 'ERROR');
  } finally {
    // Logout 
    return context.getPageProxy().executeAction('/nba/Actions/Logout.action');
  }
}

/***/ }),

/***/ "./build.definitions/nba/Styles/Styles.css":
/*!*************************************************!*\
  !*** ./build.definitions/nba/Styles/Styles.css ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.6.0/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.6.0/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/nba/Styles/Styles.less":
/*!**************************************************!*\
  !*** ./build.definitions/nba/Styles/Styles.less ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.6.0/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.6.0/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/nba/Styles/Styles.nss":
/*!*************************************************!*\
  !*** ./build.definitions/nba/Styles/Styles.nss ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.6.0/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.6.0/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.6.0/node_modules/css-loader/dist/runtime/api.js":
/*!***********************************************************************************************************************!*\
  !*** ../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.6.0/node_modules/css-loader/dist/runtime/api.js ***!
  \***********************************************************************************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./build.definitions/nba/Pages/AddTeam.page":
/*!**************************************************!*\
  !*** ./build.definitions/nba/Pages/AddTeam.page ***!
  \**************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"InputName","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Nombre","Enabled":true}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"InputCity","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Ciudad","Enabled":true}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell2"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.ListPicker","_Name":"SelectState","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Estado","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":{"Target":{"Service":"/nba/Services/NBA.service","EntitySet":"EstadoUsaSet"},"DisplayValue":"{DescEstado} ({CodEstado})","ReturnValue":"{CodEstado}"}}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell3"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"InputCoach","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Entrenador","Enabled":true}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell4"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"InputImage","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"URL de Logo","KeyboardType":"Url","Enabled":true}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell1"},{"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.Image","_Name":"SectionImage0","Visible":true,"Image":"res://mdk_logo.png","Alignment":"center","ContentMode":"ScaleAspectFit"}]}],"_Type":"Page","_Name":"AgregarEquipo","Caption":"Agregar equipo","PrefersLargeCaption":true,"ToolBar":{"Items":[{"_Type":"Control.Type.ToolbarItem","_Name":"Save","Caption":"Guardar","Enabled":true,"Visible":true,"Clickable":true,"ItemType":"Button","Width":100,"Style":"","OnPress":"/nba/Actions/CRUD/Create/AddTeam.action"},{"_Type":"Control.Type.ToolbarItem","_Name":"ToolbarItem0","Caption":"Cancelar","Enabled":true,"Visible":true,"Clickable":true,"Style":"","OnPress":"/nba/Actions/Close.action"}]}}

/***/ }),

/***/ "./build.definitions/nba/Pages/Main.page":
/*!***********************************************!*\
  !*** ./build.definitions/nba/Pages/Main.page ***!
  \***********************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"Header":{"Headline":"NBA","Icon":"/nba/Images/nba-logo.png","Alignment":"left","IconIsCircular":false,"DisableIconText":false},"Sections":[{"_Name":"SideDrawerSection0","Items":[{"Title":"Equipos","Image":"sap-icon://family-care","PageToOpen":"/nba/Pages/Teams.page","_Name":"SideDrawerSection0Item0","Visible":true,"TextAlignment":"left","Styles":{}},{"Title":"Jugadores","Image":"sap-icon://person-placeholder","PageToOpen":"/nba/Pages/Players.page","_Name":"SideDrawerSection0Item1","Visible":true,"TextAlignment":"left","Styles":{}}],"Visible":true,"PreserveImageSpacing":true,"SeparatorEnabled":true}],"_Type":"Control.Type.SideDrawer","_Name":"SideDrawer0","AlwaysShowDrawerButton":false,"ClearHistory":false}],"_Type":"Page","_Name":"Main","Caption":"Main"}

/***/ }),

/***/ "./build.definitions/nba/Pages/Players.page":
/*!**************************************************!*\
  !*** ./build.definitions/nba/Pages/Players.page ***!
  \**************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ContactCell","Target":{"Service":"/nba/Services/NBA.service","EntitySet":"JugadorSet"},"_Name":"SectionContactCell0","Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"ContactCell":{"ContextMenu":{"PerformFirstActionWithFullSwipe":true,"Items":[]},"DetailImage":"","Headline":"{Apellido}, {Nombre}","Subheadline":"{NombreEquipo}","Description":"Dorsal: {Dorsal} Posición: {Posicion}","ActivityItems":[]}}]}],"_Type":"Page","_Name":"Players","Caption":"Players","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/nba/Pages/Teams.page":
/*!************************************************!*\
  !*** ./build.definitions/nba/Pages/Teams.page ***!
  \************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.ObjectTable","Target":{"Service":"/nba/Services/NBA.service","EntitySet":"EquipoSet"},"_Name":"SectionObjectTable0","Visible":true,"EmptySection":{"FooterVisible":false},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true},"Title":"{NombreEquipo}","Subhead":"{Ciudad}","Description":"Entrenador: {Entrenador}","DisplayDescriptionInMobile":true,"PreserveIconStackSpacing":true,"AccessoryType":"detailButton","ProgressIndicator":"inProgress","Tags":[{"Color":"Grey","Text":"{Estado}"}],"AvatarStack":{"Avatars":[{"Image":"{Logo}"}],"ImageIsCircular":false,"ImageHasBorder":false,"OverflowToGrid":{"ImageIsCircular":""}},"AvatarGrid":{"Avatars":[],"ImageIsCircular":true},"Selected":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}]}],"_Type":"Page","_Name":"Teams","Caption":"Equipos","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Add","Icon":"sap-icon://add","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/nba/Actions/CRUD/Create/NavToAddTeam.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"_Name":"nba","Version":"/nba/Globals/AppDefinition_Version.global","MainPage":"/nba/Pages/Main.page","OnLaunch":["/nba/Actions/Service/InitializeOnline.action"],"OnWillUpdate":"/nba/Rules/OnWillUpdate.js","OnDidUpdate":"/nba/Actions/Service/InitializeOnline.action","Styles":"/nba/Styles/Styles.less","Localization":"/nba/i18n/i18n.properties","_SchemaVersion":"23.4","StyleSheets":{"Styles":{"css":"/nba/Styles/Styles.css","ios":"/nba/Styles/Styles.nss","android":"/nba/Styles/Styles.json"}}}

/***/ }),

/***/ "./build.definitions/nba/Actions/AppUpdate.action":
/*!********************************************************!*\
  !*** ./build.definitions/nba/Actions/AppUpdate.action ***!
  \********************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/nba/Rules/AppUpdateFailure.js","OnSuccess":"/nba/Rules/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/nba/Actions/AppUpdateFailureMessage.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/nba/Actions/AppUpdateFailureMessage.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/nba/Actions/AppUpdateProgressBanner.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/nba/Actions/AppUpdateProgressBanner.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/nba/Actions/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/nba/Actions/AppUpdateSuccessMessage.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/nba/Actions/AppUpdateSuccessMessage.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/nba/Actions/CRUD/Create/AddTeam.action":
/*!******************************************************************!*\
  !*** ./build.definitions/nba/Actions/CRUD/Create/AddTeam.action ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.CreateEntity","ActionResult":{"_Name":"AddTeamResult"},"OnFailure":"/nba/Actions/CRUD/Create/FailAddTeam.action","OnSuccess":"/nba/Actions/CRUD/Create/SuccessAddTeam.action","ShowActivityIndicator":true,"ActivityIndicatorText":"","Target":{"Service":"/nba/Services/NBA.service","EntitySet":"EquipoSet"},"Properties":{"NombreEquipo":"#Page:AgregarEquipo/#Control:InputName/#Value","Ciudad":"#Page:AgregarEquipo/#Control:InputCity/#Value","Estado":"#Page:AgregarEquipo/#Control:SelectState/#SelectedValue","Entrenador":"#Page:AgregarEquipo/#Control:InputCoach/#Value","Logo":"#Page:AgregarEquipo/#Control:InputImage/#Value"}}

/***/ }),

/***/ "./build.definitions/nba/Actions/CRUD/Create/FailAddTeam.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/nba/Actions/CRUD/Create/FailAddTeam.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","ActionResult":{"_Name":"FailAddTeam"},"Message":"Error: {#ActionResults:AddTeamResult/error}"}

/***/ }),

/***/ "./build.definitions/nba/Actions/CRUD/Create/NavToAddTeam.action":
/*!***********************************************************************!*\
  !*** ./build.definitions/nba/Actions/CRUD/Create/NavToAddTeam.action ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToAgregarEquipo"},"PageToOpen":"/nba/Pages/AddTeam.page"}

/***/ }),

/***/ "./build.definitions/nba/Actions/CRUD/Create/SuccessAddTeam.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/nba/Actions/CRUD/Create/SuccessAddTeam.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","ActionResult":{"_Name":"SuccessAddTeam"},"Message":"Equipo agregado exitosamente"}

/***/ }),

/***/ "./build.definitions/nba/Actions/Close.action":
/*!****************************************************!*\
  !*** ./build.definitions/nba/Actions/Close.action ***!
  \****************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage","ActionResult":{"_Name":"Close"},"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true}

/***/ }),

/***/ "./build.definitions/nba/Actions/ClosePage.action":
/*!********************************************************!*\
  !*** ./build.definitions/nba/Actions/ClosePage.action ***!
  \********************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/nba/Actions/Logout.action":
/*!*****************************************************!*\
  !*** ./build.definitions/nba/Actions/Logout.action ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = {"SkipReset":false,"_Type":"Action.Type.Logout"}

/***/ }),

/***/ "./build.definitions/nba/Actions/LogoutMessage.action":
/*!************************************************************!*\
  !*** ./build.definitions/nba/Actions/LogoutMessage.action ***!
  \************************************************************/
/***/ ((module) => {

module.exports = {"CancelCaption":"No","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","OKCaption":"Yes","OnOK":"/nba/Rules/ResetAppSettingsAndLogout.js","Title":"Logout","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/nba/Actions/OnWillUpdate.action":
/*!***********************************************************!*\
  !*** ./build.definitions/nba/Actions/OnWillUpdate.action ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/nba/Actions/Service/InitializeOnline.action":
/*!***********************************************************************!*\
  !*** ./build.definitions/nba/Actions/Service/InitializeOnline.action ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/nba/Services/NBA.service","_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"OnSuccess":"/nba/Actions/Service/InitializeOnlineSuccessMessage.action","OnFailure":"/nba/Actions/Service/InitializeOnlineFailureMessage.action","ActionResult":{"_Name":"init"}}

/***/ }),

/***/ "./build.definitions/nba/Actions/Service/InitializeOnlineFailureMessage.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/nba/Actions/Service/InitializeOnlineFailureMessage.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/nba/Actions/Service/InitializeOnlineSuccessMessage.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/nba/Actions/Service/InitializeOnlineSuccessMessage.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Application data service initialized","IsIconHidden":true,"NumberOfLines":2,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/nba/Globals/AppDefinition_Version.global":
/*!********************************************************************!*\
  !*** ./build.definitions/nba/Globals/AppDefinition_Version.global ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/nba/Services/NBA.service":
/*!****************************************************!*\
  !*** ./build.definitions/nba/Services/NBA.service ***!
  \****************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"NBA","OfflineEnabled":false,"LanguageURLParam":"","OnlineOptions":{},"PathSuffix":"","SourceType":"Mobile","ServiceUrl":""}

/***/ }),

/***/ "./build.definitions/version.mdkbundlerversion":
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = "1.1\n"

/***/ }),

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
let nba_actions_appupdate_action = __webpack_require__(/*! ./nba/Actions/AppUpdate.action */ "./build.definitions/nba/Actions/AppUpdate.action")
let nba_actions_appupdatefailuremessage_action = __webpack_require__(/*! ./nba/Actions/AppUpdateFailureMessage.action */ "./build.definitions/nba/Actions/AppUpdateFailureMessage.action")
let nba_actions_appupdateprogressbanner_action = __webpack_require__(/*! ./nba/Actions/AppUpdateProgressBanner.action */ "./build.definitions/nba/Actions/AppUpdateProgressBanner.action")
let nba_actions_appupdatesuccessmessage_action = __webpack_require__(/*! ./nba/Actions/AppUpdateSuccessMessage.action */ "./build.definitions/nba/Actions/AppUpdateSuccessMessage.action")
let nba_actions_close_action = __webpack_require__(/*! ./nba/Actions/Close.action */ "./build.definitions/nba/Actions/Close.action")
let nba_actions_closepage_action = __webpack_require__(/*! ./nba/Actions/ClosePage.action */ "./build.definitions/nba/Actions/ClosePage.action")
let nba_actions_crud_create_addteam_action = __webpack_require__(/*! ./nba/Actions/CRUD/Create/AddTeam.action */ "./build.definitions/nba/Actions/CRUD/Create/AddTeam.action")
let nba_actions_crud_create_failaddteam_action = __webpack_require__(/*! ./nba/Actions/CRUD/Create/FailAddTeam.action */ "./build.definitions/nba/Actions/CRUD/Create/FailAddTeam.action")
let nba_actions_crud_create_navtoaddteam_action = __webpack_require__(/*! ./nba/Actions/CRUD/Create/NavToAddTeam.action */ "./build.definitions/nba/Actions/CRUD/Create/NavToAddTeam.action")
let nba_actions_crud_create_successaddteam_action = __webpack_require__(/*! ./nba/Actions/CRUD/Create/SuccessAddTeam.action */ "./build.definitions/nba/Actions/CRUD/Create/SuccessAddTeam.action")
let nba_actions_logout_action = __webpack_require__(/*! ./nba/Actions/Logout.action */ "./build.definitions/nba/Actions/Logout.action")
let nba_actions_logoutmessage_action = __webpack_require__(/*! ./nba/Actions/LogoutMessage.action */ "./build.definitions/nba/Actions/LogoutMessage.action")
let nba_actions_onwillupdate_action = __webpack_require__(/*! ./nba/Actions/OnWillUpdate.action */ "./build.definitions/nba/Actions/OnWillUpdate.action")
let nba_actions_service_initializeonline_action = __webpack_require__(/*! ./nba/Actions/Service/InitializeOnline.action */ "./build.definitions/nba/Actions/Service/InitializeOnline.action")
let nba_actions_service_initializeonlinefailuremessage_action = __webpack_require__(/*! ./nba/Actions/Service/InitializeOnlineFailureMessage.action */ "./build.definitions/nba/Actions/Service/InitializeOnlineFailureMessage.action")
let nba_actions_service_initializeonlinesuccessmessage_action = __webpack_require__(/*! ./nba/Actions/Service/InitializeOnlineSuccessMessage.action */ "./build.definitions/nba/Actions/Service/InitializeOnlineSuccessMessage.action")
let nba_globals_appdefinition_version_global = __webpack_require__(/*! ./nba/Globals/AppDefinition_Version.global */ "./build.definitions/nba/Globals/AppDefinition_Version.global")
let nba_i18n_i18n_properties = __webpack_require__(/*! ./nba/i18n/i18n.properties */ "./build.definitions/nba/i18n/i18n.properties")
let nba_jsconfig_json = __webpack_require__(/*! ./nba/jsconfig.json */ "./build.definitions/nba/jsconfig.json")
let nba_pages_addteam_page = __webpack_require__(/*! ./nba/Pages/AddTeam.page */ "./build.definitions/nba/Pages/AddTeam.page")
let nba_pages_main_page = __webpack_require__(/*! ./nba/Pages/Main.page */ "./build.definitions/nba/Pages/Main.page")
let nba_pages_players_page = __webpack_require__(/*! ./nba/Pages/Players.page */ "./build.definitions/nba/Pages/Players.page")
let nba_pages_teams_page = __webpack_require__(/*! ./nba/Pages/Teams.page */ "./build.definitions/nba/Pages/Teams.page")
let nba_rules_appupdatefailure_js = __webpack_require__(/*! ./nba/Rules/AppUpdateFailure.js */ "./build.definitions/nba/Rules/AppUpdateFailure.js")
let nba_rules_appupdatesuccess_js = __webpack_require__(/*! ./nba/Rules/AppUpdateSuccess.js */ "./build.definitions/nba/Rules/AppUpdateSuccess.js")
let nba_rules_loadimage_js = __webpack_require__(/*! ./nba/Rules/LoadImage.js */ "./build.definitions/nba/Rules/LoadImage.js")
let nba_rules_onwillupdate_js = __webpack_require__(/*! ./nba/Rules/OnWillUpdate.js */ "./build.definitions/nba/Rules/OnWillUpdate.js")
let nba_rules_resetappsettingsandlogout_js = __webpack_require__(/*! ./nba/Rules/ResetAppSettingsAndLogout.js */ "./build.definitions/nba/Rules/ResetAppSettingsAndLogout.js")
let nba_services_nba_service = __webpack_require__(/*! ./nba/Services/NBA.service */ "./build.definitions/nba/Services/NBA.service")
let nba_styles_styles_css = __webpack_require__(/*! ./nba/Styles/Styles.css */ "./build.definitions/nba/Styles/Styles.css")
let nba_styles_styles_json = __webpack_require__(/*! ./nba/Styles/Styles.json */ "./build.definitions/nba/Styles/Styles.json")
let nba_styles_styles_less = __webpack_require__(/*! ./nba/Styles/Styles.less */ "./build.definitions/nba/Styles/Styles.less")
let nba_styles_styles_nss = __webpack_require__(/*! ./nba/Styles/Styles.nss */ "./build.definitions/nba/Styles/Styles.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	nba_actions_appupdate_action : nba_actions_appupdate_action,
	nba_actions_appupdatefailuremessage_action : nba_actions_appupdatefailuremessage_action,
	nba_actions_appupdateprogressbanner_action : nba_actions_appupdateprogressbanner_action,
	nba_actions_appupdatesuccessmessage_action : nba_actions_appupdatesuccessmessage_action,
	nba_actions_close_action : nba_actions_close_action,
	nba_actions_closepage_action : nba_actions_closepage_action,
	nba_actions_crud_create_addteam_action : nba_actions_crud_create_addteam_action,
	nba_actions_crud_create_failaddteam_action : nba_actions_crud_create_failaddteam_action,
	nba_actions_crud_create_navtoaddteam_action : nba_actions_crud_create_navtoaddteam_action,
	nba_actions_crud_create_successaddteam_action : nba_actions_crud_create_successaddteam_action,
	nba_actions_logout_action : nba_actions_logout_action,
	nba_actions_logoutmessage_action : nba_actions_logoutmessage_action,
	nba_actions_onwillupdate_action : nba_actions_onwillupdate_action,
	nba_actions_service_initializeonline_action : nba_actions_service_initializeonline_action,
	nba_actions_service_initializeonlinefailuremessage_action : nba_actions_service_initializeonlinefailuremessage_action,
	nba_actions_service_initializeonlinesuccessmessage_action : nba_actions_service_initializeonlinesuccessmessage_action,
	nba_globals_appdefinition_version_global : nba_globals_appdefinition_version_global,
	nba_i18n_i18n_properties : nba_i18n_i18n_properties,
	nba_jsconfig_json : nba_jsconfig_json,
	nba_pages_addteam_page : nba_pages_addteam_page,
	nba_pages_main_page : nba_pages_main_page,
	nba_pages_players_page : nba_pages_players_page,
	nba_pages_teams_page : nba_pages_teams_page,
	nba_rules_appupdatefailure_js : nba_rules_appupdatefailure_js,
	nba_rules_appupdatesuccess_js : nba_rules_appupdatesuccess_js,
	nba_rules_loadimage_js : nba_rules_loadimage_js,
	nba_rules_onwillupdate_js : nba_rules_onwillupdate_js,
	nba_rules_resetappsettingsandlogout_js : nba_rules_resetappsettingsandlogout_js,
	nba_services_nba_service : nba_services_nba_service,
	nba_styles_styles_css : nba_styles_styles_css,
	nba_styles_styles_json : nba_styles_styles_json,
	nba_styles_styles_less : nba_styles_styles_less,
	nba_styles_styles_nss : nba_styles_styles_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/nba/Styles/Styles.json":
/*!**************************************************!*\
  !*** ./build.definitions/nba/Styles/Styles.json ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ "./build.definitions/nba/jsconfig.json":
/*!*********************************************!*\
  !*** ./build.definitions/nba/jsconfig.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ }),

/***/ "./build.definitions/tsconfig.json":
/*!*****************************************!*\
  !*** ./build.definitions/tsconfig.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"compilerOptions":{"target":"es2015","module":"esnext","moduleResolution":"node","lib":["es2018","dom"],"experimentalDecorators":true,"emitDecoratorMetadata":true,"removeComments":true,"inlineSourceMap":true,"noEmitOnError":false,"noEmitHelpers":true,"baseUrl":".","plugins":[{"transform":"@nativescript/webpack/dist/transformers/NativeClass","type":"raw"}]},"exclude":["node_modules"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./build.definitions/application-index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});