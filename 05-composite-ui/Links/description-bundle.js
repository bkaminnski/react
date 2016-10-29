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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Descriptions = __webpack_require__(2);

	var _Descriptions2 = _interopRequireDefault(_Descriptions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var descriptions = new _Descriptions2.default();
	descriptions.loadTransformAndPublish();

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _DescriptionsClient = __webpack_require__(4);

	var _DescriptionsClient2 = _interopRequireDefault(_DescriptionsClient);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Descriptions = function () {
	    function Descriptions() {
	        _classCallCheck(this, Descriptions);

	        this.descriptionsClient = new _DescriptionsClient2.default();
	    }

	    _createClass(Descriptions, [{
	        key: 'loadTransformAndPublish',
	        value: function loadTransformAndPublish() {
	            this.descriptionsClient.descriptions().then(this.transformIntoMessage).then(this.publish);
	        }
	    }, {
	        key: 'transformIntoMessage',
	        value: function transformIntoMessage(descriptions) {
	            return { messageContent: 'aMessage' };
	        }
	    }, {
	        key: 'publish',
	        value: function publish(message) {
	            PubSub.publish('uiEvent.linkFragment.wasLoaded', message);
	        }
	    }]);

	    return Descriptions;
	}();

	exports.default = Descriptions;

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DescriptionsClient = function () {
	    function DescriptionsClient() {
	        _classCallCheck(this, DescriptionsClient);
	    }

	    _createClass(DescriptionsClient, [{
	        key: 'descriptions',
	        value: function descriptions() {
	            return new Promise(function (resolve, reject) {
	                resolve([{ id: 1, description: 'Java EE becomes an interesting platform for exposing services for mobile apps. To give you a feeling about the productivity, I installed a CORS filter, implemented, built and deployed a Java EE 7 service from scratch, exposed a JSON-array, implemented a HTTP client using stock XMLHttpRequest and rendered the result using the React JavaScript library.' }, { id: 2, description: 'Containers are the latest hype. It goes without saying that Docker for the development environment is a good thing but what about running our production Java applications inside a container?' }, { id: 3, description: 'Things change in the JavaScript world so fast nowadays. I feel this video is relatively future proof going into 2017 as to how babel, react and webpack should be used together to make development easier.' }]);
	            });
	        }
	    }]);

	    return DescriptionsClient;
	}();

	exports.default = DescriptionsClient;

/***/ }
/******/ ]);