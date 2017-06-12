/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	eval("import React from 'react'\nimport {render} from 'react-dom'\nimport Greeter from './Greeter'\n\nimport './main.css'\n// 通常情况下，css会和js打包到同一个文件中，并不会打包为一个单独的css文件，不过通过合适的配置webpack也可以把css打包为单独的文件的。\n// 不过这也只是webpack把css当做模块而已，咱们继续看看一个真的CSS模块的实践。\n\n// render(<Greeter />, document.getElementById('root'));//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvbWFpbi5qcz82YTRiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0EsUUFBUSxPQUFPO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6IjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQge3JlbmRlcn0gZnJvbSAncmVhY3QtZG9tJ1xuaW1wb3J0IEdyZWV0ZXIgZnJvbSAnLi9HcmVldGVyJ1xuXG5pbXBvcnQgJy4vbWFpbi5jc3MnXG4vLyDpgJrluLjmg4XlhrXkuIvvvIxjc3PkvJrlkoxqc+aJk+WMheWIsOWQjOS4gOS4quaWh+S7tuS4re+8jOW5tuS4jeS8muaJk+WMheS4uuS4gOS4quWNleeLrOeahGNzc+aWh+S7tu+8jOS4jei/h+mAmui/h+WQiOmAgueahOmFjee9rndlYnBhY2vkuZ/lj6/ku6Xmiopjc3PmiZPljIXkuLrljZXni6znmoTmlofku7bnmoTjgIJcbi8vIOS4jei/h+i/meS5n+WPquaYr3dlYnBhY2vmiopjc3PlvZPlgZrmqKHlnZfogIzlt7LvvIzlkrHku6znu6fnu63nnIvnnIvkuIDkuKrnnJ/nmoRDU1PmqKHlnZfnmoTlrp7ot7XjgIJcblxuLy8gcmVuZGVyKDxHcmVldGVyIC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9tYWluLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ })
/******/ ]);