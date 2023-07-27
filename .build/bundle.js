/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/nba/i18n/i18n.properties":
/*!****************************************************!*\
  !*** ./build.definitions/nba/i18n/i18n.properties ***!
  \****************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ "./build.definitions/nba/Rules/AddMatchStats.js":
/*!******************************************************!*\
  !*** ./build.definitions/nba/Rules/AddMatchStats.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AddMatchStats)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AddMatchStats(clientAPI) {
  // const oData = clientAPI.binding
}

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
    const sUrl = clientAPI.evaluateTargetPath("#Page:AgregarEquipo/#Control:InputImage");
    const oImage = clientAPI.evaluateTargetPath("#Page:AgregarEquipo/#Control:RenderImage");
    oImage.Image = sUrl.getValue();
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

/***/ "./build.definitions/nba/Rules/RenderImage.js":
/*!****************************************************!*\
  !*** ./build.definitions/nba/Rules/RenderImage.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RenderImage)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function RenderImage(context) {
  try {
    const sValue = context.getValue();
    let oClientData = context.evaluateTargetPathForAPI('#Page:AgregarEquipo').getClientData();
    clientAPI.evaluateTargetPath("#Page:AgregarEquipo/#Control:RenderImage");
    oClientData.Image = sValue;
  } catch (error) {
    alert(error);
  }
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
var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.7.0/node_modules/css-loader/dist/runtime/noSourceMaps.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.7.0/node_modules/css-loader/dist/runtime/noSourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.7.0/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.7.0/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/nba/Styles/Styles.less":
/*!**************************************************!*\
  !*** ./build.definitions/nba/Styles/Styles.less ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.7.0/node_modules/css-loader/dist/runtime/noSourceMaps.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.7.0/node_modules/css-loader/dist/runtime/noSourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.7.0/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.7.0/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/nba/Styles/Styles.light.css":
/*!*******************************************************!*\
  !*** ./build.definitions/nba/Styles/Styles.light.css ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.7.0/node_modules/css-loader/dist/runtime/noSourceMaps.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.7.0/node_modules/css-loader/dist/runtime/noSourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.7.0/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.7.0/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/nba/Styles/Styles.light.nss":
/*!*******************************************************!*\
  !*** ./build.definitions/nba/Styles/Styles.light.nss ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.7.0/node_modules/css-loader/dist/runtime/noSourceMaps.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.7.0/node_modules/css-loader/dist/runtime/noSourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.7.0/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.7.0/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.7.0/node_modules/css-loader/dist/runtime/api.js":
/*!***********************************************************************************************************************!*\
  !*** ../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.7.0/node_modules/css-loader/dist/runtime/api.js ***!
  \***********************************************************************************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.7.0/node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!********************************************************************************************************************************!*\
  !*** ../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.7.0/node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \********************************************************************************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ "./build.definitions/nba/Pages/AddMatchStats.page":
/*!********************************************************!*\
  !*** ./build.definitions/nba/Pages/AddMatchStats.page ***!
  \********************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0"}],"_Type":"Page","_Name":"AddMatchStats","Caption":"Agregar datos de partido","PrefersLargeCaption":true,"ToolBar":{"Items":[{"_Type":"Control.Type.ToolbarItem","_Name":"AddMatchStats","Caption":"Agregar","Enabled":true,"Visible":true,"Clickable":true,"Style":""}]}}

/***/ }),

/***/ "./build.definitions/nba/Pages/AddTeam.page":
/*!**************************************************!*\
  !*** ./build.definitions/nba/Pages/AddTeam.page ***!
  \**************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"InputName","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Nombre","Enabled":true}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"InputCity","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Ciudad","Enabled":true}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell2"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.ListPicker","_Name":"SelectState","IsEditable":true,"IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Estado","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":{"Target":{"Service":"/nba/Services/NBA.service","EntitySet":"EstadoUsaSet"},"DisplayValue":"{DescEstado} ({CodEstado})","ReturnValue":"{CodEstado}"}}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell3"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"InputCoach","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Entrenador","Enabled":true}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell4"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"InputImage","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"URL de Logo","OnValueChange":"/nba/Rules/RenderImage.js","KeyboardType":"Url","Enabled":true}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell1"}]}],"_Type":"Page","_Name":"AgregarEquipo","Caption":"Agregar equipo","PrefersLargeCaption":true,"ToolBar":{"Items":[{"_Type":"Control.Type.ToolbarItem","_Name":"Save","Caption":"Guardar","Enabled":true,"Visible":true,"Clickable":true,"ItemType":"Button","Width":100,"Style":"","OnPress":"/nba/Actions/CRUD/Create/CheckRequiredFields.action"},{"_Type":"Control.Type.ToolbarItem","_Name":"ToolbarItem0","Caption":"Cancelar","Enabled":true,"Visible":true,"Clickable":true,"Style":"","OnPress":"/nba/Actions/Close.action"}]}}

/***/ }),

/***/ "./build.definitions/nba/Pages/DetailInfoPlayer.page":
/*!***********************************************************!*\
  !*** ./build.definitions/nba/Pages/DetailInfoPlayer.page ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true},"KeyAndValues":[{"Value":"$(D,{FechaDeNacimiento},'es-419-AR','GMT+0',{format:'medium'})","_Name":"KeyValue2","KeyName":"Fecha de nacimiento","Visible":true},{"Value":"{Altura} cm","_Name":"KeyValue0","KeyName":"Altura","Visible":true},{"Value":"{Nacionalidad}","_Name":"KeyValue3","KeyName":"Nacionalidad","Visible":true},{"Value":"{Peso} kg","_Name":"KeyValue1","KeyName":"Peso","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":2}}]}],"DesignTimeTarget":{"Service":"/nba/Services/NBA.service","EntitySet":"JugadorSet"},"_Type":"Page","_Name":"DetailInfoPlayer","Caption":"Información Personal","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/nba/Pages/DetailPlayer.page":
/*!*******************************************************!*\
  !*** ./build.definitions/nba/Pages/DetailPlayer.page ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"ObjectHeader":{"Subhead":"{PosicionDesc}","Description":"{NombreEquipo}","DetailImage":"sap-icon://person-placeholder","DetailImageIsCircular":false,"HeadlineText":"{Apellido}, {Nombre}","StatusPosition":"Stacked","StatusImagePosition":"Leading","SubstatusImagePosition":"Leading"},"_Type":"Section.Type.ObjectHeader","_Name":"SectionObjectHeader0","Visible":true}]},{"_Type":"Control.Type.Tabs","_Name":"Tabs0","Items":[{"_Type":"Control.Type.TabItem","Caption":"Información Personal","Image":"sap-icon://information","PageToOpen":"/nba/Pages/DetailInfoPlayer.page","_Name":"Info"},{"_Type":"Control.Type.TabItem","Caption":"Estadísticas","Image":"sap-icon://business-objects-experience","PageToOpen":"/nba/Pages/DetailStatsPlayer.page","_Name":"Stats"}],"Position":"Top","TabStripType":"Normal"}],"DesignTimeTarget":{"Service":"/nba/Services/NBA.service","EntitySet":"JugadorSet"},"_Type":"Page","_Name":"Detalle","Caption":"Detalle de jugador","ToolBar":{"Items":[{"_Type":"Control.Type.ToolbarItem","_Name":"ToolbarItem0","Caption":"Agregar datos de partido","Enabled":true,"Visible":true,"Clickable":true,"Style":"","OnPress":"/nba/Actions/NavToAddMatchStats.action"}]}}

/***/ }),

/***/ "./build.definitions/nba/Pages/DetailStatsPlayer.page":
/*!************************************************************!*\
  !*** ./build.definitions/nba/Pages/DetailStatsPlayer.page ***!
  \************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"KPIHeader":{"KPIItems":[{"_Name":"KPIItem6","CaptionLabel":"Partidos jugados","MetricItems":[{"Value":"{PartidosJugados}","_Name":"KPIItem6MetricItem0"}],"ShowProgress":false}]},"_Type":"Section.Type.KPIHeader","_Name":"SectionKPIHeader0","Visible":true},{"_Type":"Section.Type.KPISection","_Name":"StatsContainer","Visible":true,"KPIItems":[{"_Name":"KPIItem0","CaptionLabel":"PPG","MetricItems":[{"Value":"{PPG}","_Name":"KPIItem0MetricItem0"}],"ShowProgress":false},{"_Name":"KPIItem2","CaptionLabel":"DPG","MetricItems":[{"Value":"{DPG}","_Name":"KPIItem2MetricItem0"}]}]},{"_Type":"Section.Type.KPISection","_Name":"StatsContainer ","Visible":true,"KPIItems":[{"_Name":"KPIItem3","CaptionLabel":"TPG","MetricItems":[{"Value":"{TPG}","_Name":"KPIItem3MetricItem0"}]},{"_Name":"KPIItem1","CaptionLabel":"APG","MetricItems":[{"Value":"{APG}","_Name":"KPIItem1MetricItem0"}]}]},{"_Type":"Section.Type.KPISection","_Name":"StatsContainer  ","Visible":true,"KPIItems":[{"_Name":"KPIItem5","CaptionLabel":"RPG","MetricItems":[{"Value":"{RPG}","_Name":"KPIItem5MetricItem0"}]},{"_Name":"KPIItem4","CaptionLabel":"MPG","MetricItems":[{"Value":"{MPG}","_Name":"KPIItem4MetricItem0"}]}]}]}],"DesignTimeTarget":{"Service":"/nba/Services/NBA.service","EntitySet":"JugadorSet"},"_Type":"Page","_Name":"DetailStatsPlayer","Caption":"Estadísticas","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/nba/Pages/DetailTeam.page":
/*!*****************************************************!*\
  !*** ./build.definitions/nba/Pages/DetailTeam.page ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"ObjectHeader":{"Subhead":"{EstadoDesc}","DetailImage":"{Logo}","DetailImageIsCircular":false,"BodyText":"{Entrenador}","HeadlineText":"{NombreEquipo}","StatusPosition":"Stacked","StatusImagePosition":"Leading","SubstatusImagePosition":"Leading"},"_Type":"Section.Type.ObjectHeader","_Name":"SectionObjectHeader0","Visible":true},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.ObjectCardCollection","Target":{"Service":"/nba/Services/NBA.service","EntitySet":"{@odata.readLink}/To_Jugadores"},"_Name":"SectionObjectCardCollection1","Visible":true,"EmptySection":{"FooterVisible":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"Card":{"Visible":true,"Title":"{Apellido}, {Nombre}","Subhead":"Dorsal #{Dorsal}","Footnote":"{PosicionDesc}","DetailImage":"sap-icon://person-placeholder","DetailImageIsCircular":false,"OverflowButtons":[],"PrimaryAction":{"OnPress":"/nba/Actions/NavToPlayerDetail.action","Style":"","Title":"Ver info","Visible":true},"SecondaryAction":{"Style":"","Title":"","Visible":false},"_Type":"Control.Type.ObjectCard"},"Layout":{"LayoutType":"Vertical"}}]}],"DesignTimeTarget":{"Service":"/nba/Services/NBA.service","EntitySet":"EquipoSet"},"_Type":"Page","_Name":"DetailTeam","Caption":"Detalle de equipo","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/nba/Pages/EditTeam.page":
/*!***************************************************!*\
  !*** ./build.definitions/nba/Pages/EditTeam.page ***!
  \***************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ObjectHeader","_Name":"SectionObjectHeader0","ObjectHeader":{"Subhead":"{Ciudad} ({EstadoDesc})","StatusText":"{Estado}","DetailImage":"{Logo}","DetailImageIsCircular":false,"HeadlineText":"{NombreEquipo}","StatusPosition":"Stacked","StatusImagePosition":"Leading","SubstatusImagePosition":"Leading"},"Visible":true},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"Value":"{Entrenador}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCEntrenador","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"Entrenador","PlaceHolder":"PlaceHolder","Enabled":true},{"Value":"{Logo}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCLogo","IsEditable":true,"IsVisible":true,"Separator":true,"Caption":"URL de Logo","PlaceHolder":"PlaceHolder","Enabled":true}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"}]}],"_Type":"Page","_Name":"EditTeam","Caption":"Información","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Item","SystemItem":"Cancel","Position":"Left","IsIconCircular":false,"Visible":true,"OnPress":"/nba/Actions/ClosePage.action"}],"_Name":"ActionBar1"},"ToolBar":{"Items":[{"_Type":"Control.Type.ToolbarItem","_Name":"ToolbarItem0","Caption":"ToolbarItem","Enabled":true,"Visible":true,"Clickable":true,"SystemItem":"Save","Style":"","OnPress":"/nba/Actions/CRUD/Update/ConfirmEdit.action"}]},"DesignTimeTarget":{"Service":"/nba/Services/NBA.service","EntitySet":"EquipoSet"}}

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

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.ObjectTable","Target":{"Service":"/nba/Services/NBA.service","EntitySet":"EquipoSet"},"_Name":"SectionObjectTable0","Visible":true,"EmptySection":{"FooterVisible":false},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true},"Title":"{NombreEquipo}","Subhead":"{Ciudad}","Description":"Entrenador: {Entrenador}","DisplayDescriptionInMobile":true,"PreserveIconStackSpacing":false,"AccessoryType":"detailButton","AccessoryButtonIcon":"sap-icon://show-edit","ProgressIndicator":"inProgress","Tags":[{"Color":"Grey","Text":"{Estado}"}],"AvatarStack":{"Avatars":[{"Image":"{Logo}"}],"ImageIsCircular":false,"ImageHasBorder":false},"AvatarGrid":{"Avatars":[],"ImageIsCircular":true},"OnPress":"/nba/Actions/Navigation/NavToDetail.action","OnAccessoryButtonPress":"/nba/Actions/MenuTeam.action","Selected":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}]}],"_Type":"Page","_Name":"Teams","Caption":"Equipos","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Add","Icon":"sap-icon://add","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/nba/Actions/CRUD/Create/NavToAddTeam.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"_Name":"nba","Version":"/nba/Globals/AppDefinition_Version.global","MainPage":"/nba/Pages/Main.page","OnLaunch":["/nba/Actions/Service/InitializeOnline.action"],"OnWillUpdate":"/nba/Rules/OnWillUpdate.js","OnDidUpdate":"/nba/Actions/Service/InitializeOnline.action","Styles":"/nba/Styles/Styles.css","Localization":"/nba/i18n/i18n.properties","_SchemaVersion":"23.4","StyleSheets":{"Styles":{"css":"/nba/Styles/Styles.light.css","ios":"/nba/Styles/Styles.light.nss","android":"/nba/Styles/Styles.light.json"}},"SDKStyles":{"ios":"/nba/Styles/Styles.light.nss","android":"/nba/Styles/Styles.light.json"}}

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

/***/ "./build.definitions/nba/Actions/CRUD/Create/CheckRequiredFields.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/nba/Actions/CRUD/Create/CheckRequiredFields.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.CheckRequiredFields","ActionResult":{"_Name":"CheckRequiredFieldsResult"},"OnFailure":"/nba/Actions/CRUD/Create/FailCheckRequiredFields.action","OnSuccess":"/nba/Actions/CRUD/Create/AddTeam.action","RequiredFields":["InputName","InputCity","InputCoach"]}

/***/ }),

/***/ "./build.definitions/nba/Actions/CRUD/Create/FailAddTeam.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/nba/Actions/CRUD/Create/FailAddTeam.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"FailAddTeam"},"Message":"Error: {#ActionResults:AddTeamResult/error}"}

/***/ }),

/***/ "./build.definitions/nba/Actions/CRUD/Create/FailCheckRequiredFields.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/nba/Actions/CRUD/Create/FailCheckRequiredFields.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"FailCheckRequiredFields"},"Message":"Por favor, complete los campos obligatorios"}

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

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"SuccessAddTeam"},"Message":"Equipo agregado exitosamente","OKCaption":"OK","OnOK":"/nba/Actions/ClosePage.action"}

/***/ }),

/***/ "./build.definitions/nba/Actions/CRUD/Delete/ConfirmDelete.action":
/*!************************************************************************!*\
  !*** ./build.definitions/nba/Actions/CRUD/Delete/ConfirmDelete.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"ConfirmDelete"},"Message":"¿Está seguro que desea borrar el equipo {NombreEquipo}?","Title":"Confirmación","OKCaption":"Sí","OnOK":"/nba/Actions/CRUD/Delete/DeleteTeam.action","CancelCaption":"No"}

/***/ }),

/***/ "./build.definitions/nba/Actions/CRUD/Delete/DeleteTeam.action":
/*!*********************************************************************!*\
  !*** ./build.definitions/nba/Actions/CRUD/Delete/DeleteTeam.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.DeleteEntity","ActionResult":{"_Name":"DeleteTeamResult"},"OnFailure":"/nba/Actions/CRUD/Delete/FailDeleteTeam.action","OnSuccess":"/nba/Actions/CRUD/Delete/SuccessDeleteTeam.action","Target":{"Service":"/nba/Services/NBA.service","EntitySet":"EquipoSet","ReadLink":"{@odata.readLink}"}}

/***/ }),

/***/ "./build.definitions/nba/Actions/CRUD/Delete/FailDeleteTeam.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/nba/Actions/CRUD/Delete/FailDeleteTeam.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"FailDeleteTeam"},"Message":"Error: {#ActionResults:DeleteTeamResult/error}"}

/***/ }),

/***/ "./build.definitions/nba/Actions/CRUD/Delete/SuccessDeleteTeam.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/nba/Actions/CRUD/Delete/SuccessDeleteTeam.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"SuccessDeleteTeam"},"Message":"Equipo {NombreEquipo} eliminado exitosamente"}

/***/ }),

/***/ "./build.definitions/nba/Actions/CRUD/Update/AddMatchStats.action":
/*!************************************************************************!*\
  !*** ./build.definitions/nba/Actions/CRUD/Update/AddMatchStats.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.CallFunction","ActionResult":{"_Name":"AddMatchStats"},"Target":{"Service":"/nba/Services/NBA.service","Function":{"Name":"AgregarDatosPartido","Parameters":{"Jugador":"/nba/Rules/AddMatchStats.js"}}}}

/***/ }),

/***/ "./build.definitions/nba/Actions/CRUD/Update/ConfirmEdit.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/nba/Actions/CRUD/Update/ConfirmEdit.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"ConfirmEdit"},"Message":"¿Desea editar la información equipo?","Title":"Confirmación","OKCaption":"Sí","OnOK":"/nba/Actions/CRUD/Update/UpdateTeam.action","CancelCaption":"No"}

/***/ }),

/***/ "./build.definitions/nba/Actions/CRUD/Update/FailEditTeam.action":
/*!***********************************************************************!*\
  !*** ./build.definitions/nba/Actions/CRUD/Update/FailEditTeam.action ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"FailEditTeam"},"Message":"Error: {#ActionResults:UpdateTeamResult/error}"}

/***/ }),

/***/ "./build.definitions/nba/Actions/CRUD/Update/SuccessEditTeam.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/nba/Actions/CRUD/Update/SuccessEditTeam.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"SuccessEditTeam"},"Message":"Equipo {NombreEquipo} editado exitosamente","OKCaption":"OK","OnOK":"/nba/Actions/ClosePage.action"}

/***/ }),

/***/ "./build.definitions/nba/Actions/CRUD/Update/UpdateTeam.action":
/*!*********************************************************************!*\
  !*** ./build.definitions/nba/Actions/CRUD/Update/UpdateTeam.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","ActionResult":{"_Name":"UpdateTeamResult"},"OnFailure":"/nba/Actions/CRUD/Update/FailEditTeam.action","OnSuccess":"/nba/Actions/CRUD/Update/SuccessEditTeam.action","Target":{"Service":"/nba/Services/NBA.service","EntitySet":"EquipoSet","ReadLink":"{@odata.readLink}"},"Properties":{"Entrenador":"#Page:EditTeam/#Control:FCEntrenador/#Value","Logo":"#Page:EditTeam/#Control:FCLogo/#Value"}}

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

/***/ "./build.definitions/nba/Actions/MenuTeam.action":
/*!*******************************************************!*\
  !*** ./build.definitions/nba/Actions/MenuTeam.action ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.PopoverMenu","ActionResult":{"_Name":"MenuTeam"},"PopoverItems":[{"Title":"Borrar equipo","Icon":"sap-icon://delete","Style":"","OnPress":"/nba/Actions/CRUD/Delete/ConfirmDelete.action","Visible":true,"Enabled":true},{"Title":"Editar","Icon":"sap-icon://edit","Style":"","OnPress":"/nba/Actions/NavToEditTeam.action","Visible":true,"Enabled":true}]}

/***/ }),

/***/ "./build.definitions/nba/Actions/NavToAddMatchStats.action":
/*!*****************************************************************!*\
  !*** ./build.definitions/nba/Actions/NavToAddMatchStats.action ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToAddMatchStats"},"PageToOpen":"/nba/Pages/AddMatchStats.page","ModalPage":true,"Transition":{"Curve":"EaseOut"}}

/***/ }),

/***/ "./build.definitions/nba/Actions/NavToEditTeam.action":
/*!************************************************************!*\
  !*** ./build.definitions/nba/Actions/NavToEditTeam.action ***!
  \************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToEditTeam"},"PageToOpen":"/nba/Pages/EditTeam.page","ModalPage":true}

/***/ }),

/***/ "./build.definitions/nba/Actions/NavToPlayerDetail.action":
/*!****************************************************************!*\
  !*** ./build.definitions/nba/Actions/NavToPlayerDetail.action ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToPlayerDetail"},"PageToOpen":"/nba/Pages/DetailPlayer.page"}

/***/ }),

/***/ "./build.definitions/nba/Actions/Navigation/NavToDetail.action":
/*!*********************************************************************!*\
  !*** ./build.definitions/nba/Actions/Navigation/NavToDetail.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToDetail"},"PageToOpen":"/nba/Pages/DetailTeam.page"}

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

/***/ "./build.definitions/nba/Images/nba-logo.png":
/*!***************************************************!*\
  !*** ./build.definitions/nba/Images/nba-logo.png ***!
  \***************************************************/
/***/ ((module) => {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABwgAAAcICAYAAAAok5WGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjYwM0FCMUZEQzVDNDExRTZCRTNGOTM4MTlGMkQ2QzgzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjYwM0FCMUZFQzVDNDExRTZCRTNGOTM4MTlGMkQ2QzgzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjAzQUIxRkJDNUM0MTFFNkJFM0Y5MzgxOUYyRDZDODMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjAzQUIxRkNDNUM0MTFFNkJFM0Y5MzgxOUYyRDZDODMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5fZH2CAAE5FElEQVR42uzd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"

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
let nba_actions_crud_create_checkrequiredfields_action = __webpack_require__(/*! ./nba/Actions/CRUD/Create/CheckRequiredFields.action */ "./build.definitions/nba/Actions/CRUD/Create/CheckRequiredFields.action")
let nba_actions_crud_create_failaddteam_action = __webpack_require__(/*! ./nba/Actions/CRUD/Create/FailAddTeam.action */ "./build.definitions/nba/Actions/CRUD/Create/FailAddTeam.action")
let nba_actions_crud_create_failcheckrequiredfields_action = __webpack_require__(/*! ./nba/Actions/CRUD/Create/FailCheckRequiredFields.action */ "./build.definitions/nba/Actions/CRUD/Create/FailCheckRequiredFields.action")
let nba_actions_crud_create_navtoaddteam_action = __webpack_require__(/*! ./nba/Actions/CRUD/Create/NavToAddTeam.action */ "./build.definitions/nba/Actions/CRUD/Create/NavToAddTeam.action")
let nba_actions_crud_create_successaddteam_action = __webpack_require__(/*! ./nba/Actions/CRUD/Create/SuccessAddTeam.action */ "./build.definitions/nba/Actions/CRUD/Create/SuccessAddTeam.action")
let nba_actions_crud_delete_confirmdelete_action = __webpack_require__(/*! ./nba/Actions/CRUD/Delete/ConfirmDelete.action */ "./build.definitions/nba/Actions/CRUD/Delete/ConfirmDelete.action")
let nba_actions_crud_delete_deleteteam_action = __webpack_require__(/*! ./nba/Actions/CRUD/Delete/DeleteTeam.action */ "./build.definitions/nba/Actions/CRUD/Delete/DeleteTeam.action")
let nba_actions_crud_delete_faildeleteteam_action = __webpack_require__(/*! ./nba/Actions/CRUD/Delete/FailDeleteTeam.action */ "./build.definitions/nba/Actions/CRUD/Delete/FailDeleteTeam.action")
let nba_actions_crud_delete_successdeleteteam_action = __webpack_require__(/*! ./nba/Actions/CRUD/Delete/SuccessDeleteTeam.action */ "./build.definitions/nba/Actions/CRUD/Delete/SuccessDeleteTeam.action")
let nba_actions_crud_update_addmatchstats_action = __webpack_require__(/*! ./nba/Actions/CRUD/Update/AddMatchStats.action */ "./build.definitions/nba/Actions/CRUD/Update/AddMatchStats.action")
let nba_actions_crud_update_confirmedit_action = __webpack_require__(/*! ./nba/Actions/CRUD/Update/ConfirmEdit.action */ "./build.definitions/nba/Actions/CRUD/Update/ConfirmEdit.action")
let nba_actions_crud_update_faileditteam_action = __webpack_require__(/*! ./nba/Actions/CRUD/Update/FailEditTeam.action */ "./build.definitions/nba/Actions/CRUD/Update/FailEditTeam.action")
let nba_actions_crud_update_successeditteam_action = __webpack_require__(/*! ./nba/Actions/CRUD/Update/SuccessEditTeam.action */ "./build.definitions/nba/Actions/CRUD/Update/SuccessEditTeam.action")
let nba_actions_crud_update_updateteam_action = __webpack_require__(/*! ./nba/Actions/CRUD/Update/UpdateTeam.action */ "./build.definitions/nba/Actions/CRUD/Update/UpdateTeam.action")
let nba_actions_logout_action = __webpack_require__(/*! ./nba/Actions/Logout.action */ "./build.definitions/nba/Actions/Logout.action")
let nba_actions_logoutmessage_action = __webpack_require__(/*! ./nba/Actions/LogoutMessage.action */ "./build.definitions/nba/Actions/LogoutMessage.action")
let nba_actions_menuteam_action = __webpack_require__(/*! ./nba/Actions/MenuTeam.action */ "./build.definitions/nba/Actions/MenuTeam.action")
let nba_actions_navigation_navtodetail_action = __webpack_require__(/*! ./nba/Actions/Navigation/NavToDetail.action */ "./build.definitions/nba/Actions/Navigation/NavToDetail.action")
let nba_actions_navtoaddmatchstats_action = __webpack_require__(/*! ./nba/Actions/NavToAddMatchStats.action */ "./build.definitions/nba/Actions/NavToAddMatchStats.action")
let nba_actions_navtoeditteam_action = __webpack_require__(/*! ./nba/Actions/NavToEditTeam.action */ "./build.definitions/nba/Actions/NavToEditTeam.action")
let nba_actions_navtoplayerdetail_action = __webpack_require__(/*! ./nba/Actions/NavToPlayerDetail.action */ "./build.definitions/nba/Actions/NavToPlayerDetail.action")
let nba_actions_onwillupdate_action = __webpack_require__(/*! ./nba/Actions/OnWillUpdate.action */ "./build.definitions/nba/Actions/OnWillUpdate.action")
let nba_actions_service_initializeonline_action = __webpack_require__(/*! ./nba/Actions/Service/InitializeOnline.action */ "./build.definitions/nba/Actions/Service/InitializeOnline.action")
let nba_actions_service_initializeonlinefailuremessage_action = __webpack_require__(/*! ./nba/Actions/Service/InitializeOnlineFailureMessage.action */ "./build.definitions/nba/Actions/Service/InitializeOnlineFailureMessage.action")
let nba_actions_service_initializeonlinesuccessmessage_action = __webpack_require__(/*! ./nba/Actions/Service/InitializeOnlineSuccessMessage.action */ "./build.definitions/nba/Actions/Service/InitializeOnlineSuccessMessage.action")
let nba_globals_appdefinition_version_global = __webpack_require__(/*! ./nba/Globals/AppDefinition_Version.global */ "./build.definitions/nba/Globals/AppDefinition_Version.global")
let nba_i18n_i18n_properties = __webpack_require__(/*! ./nba/i18n/i18n.properties */ "./build.definitions/nba/i18n/i18n.properties")
let nba_images_nba__logo_png = __webpack_require__(/*! ./nba/Images/nba-logo.png */ "./build.definitions/nba/Images/nba-logo.png")
let nba_jsconfig_json = __webpack_require__(/*! ./nba/jsconfig.json */ "./build.definitions/nba/jsconfig.json")
let nba_pages_addmatchstats_page = __webpack_require__(/*! ./nba/Pages/AddMatchStats.page */ "./build.definitions/nba/Pages/AddMatchStats.page")
let nba_pages_addteam_page = __webpack_require__(/*! ./nba/Pages/AddTeam.page */ "./build.definitions/nba/Pages/AddTeam.page")
let nba_pages_detailinfoplayer_page = __webpack_require__(/*! ./nba/Pages/DetailInfoPlayer.page */ "./build.definitions/nba/Pages/DetailInfoPlayer.page")
let nba_pages_detailplayer_page = __webpack_require__(/*! ./nba/Pages/DetailPlayer.page */ "./build.definitions/nba/Pages/DetailPlayer.page")
let nba_pages_detailstatsplayer_page = __webpack_require__(/*! ./nba/Pages/DetailStatsPlayer.page */ "./build.definitions/nba/Pages/DetailStatsPlayer.page")
let nba_pages_detailteam_page = __webpack_require__(/*! ./nba/Pages/DetailTeam.page */ "./build.definitions/nba/Pages/DetailTeam.page")
let nba_pages_editteam_page = __webpack_require__(/*! ./nba/Pages/EditTeam.page */ "./build.definitions/nba/Pages/EditTeam.page")
let nba_pages_main_page = __webpack_require__(/*! ./nba/Pages/Main.page */ "./build.definitions/nba/Pages/Main.page")
let nba_pages_players_page = __webpack_require__(/*! ./nba/Pages/Players.page */ "./build.definitions/nba/Pages/Players.page")
let nba_pages_teams_page = __webpack_require__(/*! ./nba/Pages/Teams.page */ "./build.definitions/nba/Pages/Teams.page")
let nba_rules_addmatchstats_js = __webpack_require__(/*! ./nba/Rules/AddMatchStats.js */ "./build.definitions/nba/Rules/AddMatchStats.js")
let nba_rules_appupdatefailure_js = __webpack_require__(/*! ./nba/Rules/AppUpdateFailure.js */ "./build.definitions/nba/Rules/AppUpdateFailure.js")
let nba_rules_appupdatesuccess_js = __webpack_require__(/*! ./nba/Rules/AppUpdateSuccess.js */ "./build.definitions/nba/Rules/AppUpdateSuccess.js")
let nba_rules_loadimage_js = __webpack_require__(/*! ./nba/Rules/LoadImage.js */ "./build.definitions/nba/Rules/LoadImage.js")
let nba_rules_onwillupdate_js = __webpack_require__(/*! ./nba/Rules/OnWillUpdate.js */ "./build.definitions/nba/Rules/OnWillUpdate.js")
let nba_rules_renderimage_js = __webpack_require__(/*! ./nba/Rules/RenderImage.js */ "./build.definitions/nba/Rules/RenderImage.js")
let nba_rules_resetappsettingsandlogout_js = __webpack_require__(/*! ./nba/Rules/ResetAppSettingsAndLogout.js */ "./build.definitions/nba/Rules/ResetAppSettingsAndLogout.js")
let nba_services_nba_service = __webpack_require__(/*! ./nba/Services/NBA.service */ "./build.definitions/nba/Services/NBA.service")
let nba_styles_styles_css = __webpack_require__(/*! ./nba/Styles/Styles.css */ "./build.definitions/nba/Styles/Styles.css")
let nba_styles_styles_less = __webpack_require__(/*! ./nba/Styles/Styles.less */ "./build.definitions/nba/Styles/Styles.less")
let nba_styles_styles_light_css = __webpack_require__(/*! ./nba/Styles/Styles.light.css */ "./build.definitions/nba/Styles/Styles.light.css")
let nba_styles_styles_light_json = __webpack_require__(/*! ./nba/Styles/Styles.light.json */ "./build.definitions/nba/Styles/Styles.light.json")
let nba_styles_styles_light_nss = __webpack_require__(/*! ./nba/Styles/Styles.light.nss */ "./build.definitions/nba/Styles/Styles.light.nss")
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
	nba_actions_crud_create_checkrequiredfields_action : nba_actions_crud_create_checkrequiredfields_action,
	nba_actions_crud_create_failaddteam_action : nba_actions_crud_create_failaddteam_action,
	nba_actions_crud_create_failcheckrequiredfields_action : nba_actions_crud_create_failcheckrequiredfields_action,
	nba_actions_crud_create_navtoaddteam_action : nba_actions_crud_create_navtoaddteam_action,
	nba_actions_crud_create_successaddteam_action : nba_actions_crud_create_successaddteam_action,
	nba_actions_crud_delete_confirmdelete_action : nba_actions_crud_delete_confirmdelete_action,
	nba_actions_crud_delete_deleteteam_action : nba_actions_crud_delete_deleteteam_action,
	nba_actions_crud_delete_faildeleteteam_action : nba_actions_crud_delete_faildeleteteam_action,
	nba_actions_crud_delete_successdeleteteam_action : nba_actions_crud_delete_successdeleteteam_action,
	nba_actions_crud_update_addmatchstats_action : nba_actions_crud_update_addmatchstats_action,
	nba_actions_crud_update_confirmedit_action : nba_actions_crud_update_confirmedit_action,
	nba_actions_crud_update_faileditteam_action : nba_actions_crud_update_faileditteam_action,
	nba_actions_crud_update_successeditteam_action : nba_actions_crud_update_successeditteam_action,
	nba_actions_crud_update_updateteam_action : nba_actions_crud_update_updateteam_action,
	nba_actions_logout_action : nba_actions_logout_action,
	nba_actions_logoutmessage_action : nba_actions_logoutmessage_action,
	nba_actions_menuteam_action : nba_actions_menuteam_action,
	nba_actions_navigation_navtodetail_action : nba_actions_navigation_navtodetail_action,
	nba_actions_navtoaddmatchstats_action : nba_actions_navtoaddmatchstats_action,
	nba_actions_navtoeditteam_action : nba_actions_navtoeditteam_action,
	nba_actions_navtoplayerdetail_action : nba_actions_navtoplayerdetail_action,
	nba_actions_onwillupdate_action : nba_actions_onwillupdate_action,
	nba_actions_service_initializeonline_action : nba_actions_service_initializeonline_action,
	nba_actions_service_initializeonlinefailuremessage_action : nba_actions_service_initializeonlinefailuremessage_action,
	nba_actions_service_initializeonlinesuccessmessage_action : nba_actions_service_initializeonlinesuccessmessage_action,
	nba_globals_appdefinition_version_global : nba_globals_appdefinition_version_global,
	nba_i18n_i18n_properties : nba_i18n_i18n_properties,
	nba_images_nba__logo_png : nba_images_nba__logo_png,
	nba_jsconfig_json : nba_jsconfig_json,
	nba_pages_addmatchstats_page : nba_pages_addmatchstats_page,
	nba_pages_addteam_page : nba_pages_addteam_page,
	nba_pages_detailinfoplayer_page : nba_pages_detailinfoplayer_page,
	nba_pages_detailplayer_page : nba_pages_detailplayer_page,
	nba_pages_detailstatsplayer_page : nba_pages_detailstatsplayer_page,
	nba_pages_detailteam_page : nba_pages_detailteam_page,
	nba_pages_editteam_page : nba_pages_editteam_page,
	nba_pages_main_page : nba_pages_main_page,
	nba_pages_players_page : nba_pages_players_page,
	nba_pages_teams_page : nba_pages_teams_page,
	nba_rules_addmatchstats_js : nba_rules_addmatchstats_js,
	nba_rules_appupdatefailure_js : nba_rules_appupdatefailure_js,
	nba_rules_appupdatesuccess_js : nba_rules_appupdatesuccess_js,
	nba_rules_loadimage_js : nba_rules_loadimage_js,
	nba_rules_onwillupdate_js : nba_rules_onwillupdate_js,
	nba_rules_renderimage_js : nba_rules_renderimage_js,
	nba_rules_resetappsettingsandlogout_js : nba_rules_resetappsettingsandlogout_js,
	nba_services_nba_service : nba_services_nba_service,
	nba_styles_styles_css : nba_styles_styles_css,
	nba_styles_styles_less : nba_styles_styles_less,
	nba_styles_styles_light_css : nba_styles_styles_light_css,
	nba_styles_styles_light_json : nba_styles_styles_light_json,
	nba_styles_styles_light_nss : nba_styles_styles_light_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "webpack/container/entry/bundle.js":
/*!***********************!*\
  !*** container entry ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var moduleMap = {
	".": () => {
		return Promise.resolve().then(() => (() => ((__webpack_require__(/*! ./build.definitions/application-index.js */ "./build.definitions/application-index.js")))));
	}
};
var get = (module, getScope) => {
	__webpack_require__.R = getScope;
	getScope = (
		__webpack_require__.o(moduleMap, module)
			? moduleMap[module]()
			: Promise.resolve().then(() => {
				throw new Error('Module "' + module + '" does not exist in container.');
			})
	);
	__webpack_require__.R = undefined;
	return getScope;
};
var init = (shareScope, initScope) => {
	if (!__webpack_require__.S) return;
	var name = "default"
	var oldScope = __webpack_require__.S[name];
	if(oldScope && oldScope !== shareScope) throw new Error("Container initialization failed as it has already been initialized with a different share scope");
	__webpack_require__.S[name] = shareScope;
	return __webpack_require__.I(name, initScope);
};

// This exports getters to disallow modifications
__webpack_require__.d(exports, {
	get: () => (get),
	init: () => (init)
});

/***/ }),

/***/ "./build.definitions/nba/Styles/Styles.light.json":
/*!********************************************************!*\
  !*** ./build.definitions/nba/Styles/Styles.light.json ***!
  \********************************************************/
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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
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
/******/ 	/* webpack/runtime/sharing */
/******/ 	(() => {
/******/ 		__webpack_require__.S = {};
/******/ 		var initPromises = {};
/******/ 		var initTokens = {};
/******/ 		__webpack_require__.I = (name, initScope) => {
/******/ 			if(!initScope) initScope = [];
/******/ 			// handling circular init calls
/******/ 			var initToken = initTokens[name];
/******/ 			if(!initToken) initToken = initTokens[name] = {};
/******/ 			if(initScope.indexOf(initToken) >= 0) return;
/******/ 			initScope.push(initToken);
/******/ 			// only runs once
/******/ 			if(initPromises[name]) return initPromises[name];
/******/ 			// creates a new share scope if needed
/******/ 			if(!__webpack_require__.o(__webpack_require__.S, name)) __webpack_require__.S[name] = {};
/******/ 			// runs all init snippets from all modules reachable
/******/ 			var scope = __webpack_require__.S[name];
/******/ 			var warn = (msg) => (typeof console !== "undefined" && console.warn && console.warn(msg));
/******/ 			var uniqueName = undefined;
/******/ 			var register = (name, version, factory, eager) => {
/******/ 				var versions = scope[name] = scope[name] || {};
/******/ 				var activeVersion = versions[version];
/******/ 				if(!activeVersion || (!activeVersion.loaded && (!eager != !activeVersion.eager ? eager : uniqueName > activeVersion.from))) versions[version] = { get: factory, from: uniqueName, eager: !!eager };
/******/ 			};
/******/ 			var initExternal = (id) => {
/******/ 				var handleError = (err) => (warn("Initialization of sharing external failed: " + err));
/******/ 				try {
/******/ 					var module = __webpack_require__(id);
/******/ 					if(!module) return;
/******/ 					var initFn = (module) => (module && module.init && module.init(__webpack_require__.S[name], initScope))
/******/ 					if(module.then) return promises.push(module.then(initFn, handleError));
/******/ 					var initResult = initFn(module);
/******/ 					if(initResult && initResult.then) return promises.push(initResult['catch'](handleError));
/******/ 				} catch(err) { handleError(err); }
/******/ 			}
/******/ 			var promises = [];
/******/ 			switch(name) {
/******/ 			}
/******/ 			if(!promises.length) return initPromises[name] = 1;
/******/ 			return initPromises[name] = Promise.all(promises).then(() => (initPromises[name] = 1));
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__("webpack/container/entry/bundle.js");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;