webpackJsonp([0],{

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(54);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(55);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _MainApplicationStore = __webpack_require__(90);

var _MainApplicationStore2 = _interopRequireDefault(_MainApplicationStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainApplication = function (_React$Component) {
    _inherits(MainApplication, _React$Component);

    function MainApplication() {
        _classCallCheck(this, MainApplication);

        var _this = _possibleConstructorReturn(this, (MainApplication.__proto__ || Object.getPrototypeOf(MainApplication)).call(this));

        _this.mainApplicationStore = new _MainApplicationStore2.default(_this);
        _this.state = { formComponent: null };
        return _this;
    }

    _createClass(MainApplication, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.mainApplicationStore.subscribeToEvents();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.mainApplicationStore.unsubscribeFromEvents();
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                this.state.formComponent
            );
        }
    }]);

    return MainApplication;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(MainApplication, null), document.getElementById('mainApplication'));

/***/ }),

/***/ 90:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MainApplicationStore = function () {
    function MainApplicationStore(mainApplicationComponent) {
        _classCallCheck(this, MainApplicationStore);

        this.mainApplicationComponent = mainApplicationComponent;
    }

    _createClass(MainApplicationStore, [{
        key: 'subscribeToEvents',
        value: function subscribeToEvents() {
            var _this = this;

            this.subscriptionToken = PubSub.subscribe('uiEvent.applicationForm.wasLoaded', function (msg, formComponent) {
                _this.mainApplicationComponent.setState({ formComponent: formComponent });
            });
        }
    }, {
        key: 'unsubscribeFromEvents',
        value: function unsubscribeFromEvents() {
            PubSub.unsubscribe(this.subscriptionToken);
        }
    }]);

    return MainApplicationStore;
}();

exports.default = MainApplicationStore;

/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _MainApplication = __webpack_require__(89);

var _MainApplication2 = _interopRequireDefault(_MainApplication);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ })

},[91]);