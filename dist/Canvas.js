"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _drawingUtil = _interopRequireDefault(require("./utils/drawingUtil"));
var _styles = _interopRequireDefault(require("./data/styles"));
var _common = _interopRequireDefault(require("./utils/common"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Canvas = exports["default"] = /*#__PURE__*/function (_React$PureComponent) {
  function Canvas() {
    var _this;
    _classCallCheck(this, Canvas);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, Canvas, [].concat(args));
    _defineProperty(_this, "coordinate", 0);
    _defineProperty(_this, "isTouching", false);
    _defineProperty(_this, "touchPoints", []);
    _defineProperty(_this, "state", {
      translate: 0
    });
    _defineProperty(_this, "browserEnv", Boolean(window.ontouchstart));
    _defineProperty(_this, "canvasRef", /*#__PURE__*/_react["default"].createRef());
    // eslint-disable-next-line react/destructuring-assignment
    _defineProperty(_this, "currentValue", _this.props.value);
    _defineProperty(_this, "getCoordinate", function (e) {
      var _e$touches$, _e$touches;
      var _ref = (_e$touches$ = (_e$touches = e.touches) === null || _e$touches === void 0 ? void 0 : _e$touches[0]) !== null && _e$touches$ !== void 0 ? _e$touches$ : e,
        pageX = _ref.pageX,
        pageY = _ref.pageY;
      return _this.isXAxis ? pageX : pageY;
    });
    _defineProperty(_this, "handleTouchStart", function (e) {
      if (_this.isTouching) return;
      _this.isTouching = true;
      var coordinate = _this.getCoordinate(e);
      _this.addTouchPoint(coordinate);
      _this.coordinate = coordinate;
    });
    _defineProperty(_this, "handleTouchMove", function (e) {
      if (!_this.isTouching) return;
      var coordinate = _this.getCoordinate(e);
      _this.addTouchPoint(coordinate);
      var delta = coordinate - _this.coordinate;
      var gap = _this.props.gap;
      if (Math.abs(delta) < gap) return;
      if (_this.rebound(delta)) return;
      _this.coordinate = coordinate;
      _this.moveGradations(delta);
    });
    _defineProperty(_this, "handleTouchEnd", function () {
      if (!_this.isTouching) return;
      _this.isTouching = false;
      if (_this.browserEnv) _this.moveGradations(_common["default"].calcInertialShfitInPx(_this.touchPoints));
      _this.setState({
        translate: 0
      });
      _this.touchPoints = [];
    });
    _defineProperty(_this, "addTouchPoint", function (shift) {
      return _this.touchPoints.push({
        time: new Date().getTime(),
        shift: shift
      });
    });
    return _this;
  }
  _inherits(Canvas, _React$PureComponent);
  return _createClass(Canvas, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.drawCanvas();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.drawCanvas();
    }
  }, {
    key: "componentDidCatch",
    value: function componentDidCatch(error, errorInfo) {
      console.error(error, errorInfo);
    }
  }, {
    key: "isXAxis",
    get: function get() {
      var axis = this.props.axis;
      return axis === 'x' || axis === 'x-reverse';
    }
  }, {
    key: "isReverseAxis",
    get: function get() {
      var axis = this.props.axis;
      return axis === 'x-reverse' || axis === 'y-reverse';
    }
  }, {
    key: "rebound",
    value: function rebound(delta) {
      var _this$props = this.props,
        max = _this$props.max,
        min = _this$props.min;
      if (!_common["default"].isOverBoundary({
        max: max,
        min: min,
        delta: this.isReverseAxis ? -delta : delta,
        value: this.currentValue
      })) return false;
      var translate = _common["default"].calcReboundTranslate(delta);
      this.setState({
        translate: translate
      });
      return true;
    }
  }, {
    key: "moveGradations",
    value: function moveGradations(delta) {
      var _this2 = this;
      var diffInPx = this.isReverseAxis ? delta : -delta;
      var _this$props2 = this.props,
        gap = _this$props2.gap,
        step = _this$props2.step,
        onChange = _this$props2.onChange;
      var diff = Math.round(diffInPx / gap);
      var increment = Math.sign(diff) * step; // value increment
      var speed = Math.abs(diff); // for sliding

      var draw = function draw() {
        if (speed < 1) {
          if (step >= 1) return onChange(_this2.currentValue);
          var decimalPlace = _common["default"].countDecimalPlace(step);
          return onChange(Number(_this2.currentValue.toFixed(decimalPlace)));
        }
        _this2.currentValue += increment;
        speed -= speed > 8 ? 2 : 1;
        _this2.drawCanvas();
        return window.requestAnimationFrame(draw);
      };
      window.requestAnimationFrame(draw);
    }
  }, {
    key: "drawCanvas",
    value: function drawCanvas() {
      var _this$props3 = this.props,
        min = _this$props3.min,
        max = _this$props3.max,
        step = _this$props3.step,
        stepsAmount = _this$props3.stepsAmount,
        gap = _this$props3.gap;
      this.currentValue = _common["default"].adjustValue({
        max: max,
        min: min,
        step: step,
        value: this.currentValue
      });
      var canvas = this.canvasRef.current;
      var _this$props4 = this.props,
        width = _this$props4.width,
        height = _this$props4.height;
      var basis = this.isXAxis ? width : height;
      if (!canvas) return;
      var _util$calcFromTo = _common["default"].calcFromTo({
          step: step,
          gap: gap,
          basis: basis,
          value: this.currentValue,
          isReverseAxis: this.isReverseAxis
        }),
        from = _util$calcFromTo.from,
        to = _util$calcFromTo.to,
        calcMarkCoordinate = _util$calcFromTo.calcMarkCoordinate;
      var _this$props5 = this.props,
        markStyle = _this$props5.markStyle,
        smallerMarkStyle = _this$props5.smallerMarkStyle,
        numberStyle = _this$props5.numberStyle,
        unit = _this$props5.unit;
      _drawingUtil["default"].drawCanvas({
        canvas: canvas,
        step: step,
        stepsAmount: stepsAmount,
        markStyle: markStyle,
        smallerMarkStyle: smallerMarkStyle,
        numberStyle: numberStyle,
        unit: unit,
        min: min,
        max: max,
        from: from,
        to: to,
        gap: gap,
        calcMarkCoordinate: calcMarkCoordinate,
        isXAxis: this.isXAxis
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props6 = this.props,
        width = _this$props6.width,
        height = _this$props6.height,
        _this$props6$value = _this$props6.value,
        value = _this$props6$value === void 0 ? null : _this$props6$value;
      var translate = this.state.translate;
      if (value !== null) this.currentValue = value;
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("canvas", {
        ref: this.canvasRef,
        width: width,
        height: height,
        style: _styles["default"].createCanvasStyle(translate, this.isXAxis),
        onTouchStart: this.handleTouchStart,
        onMouseDown: this.handleTouchStart,
        onTouchMove: this.handleTouchMove,
        onMouseMove: this.handleTouchMove,
        onTouchEnd: this.handleTouchEnd,
        onMouseUp: this.handleTouchEnd,
        onMouseLeave: this.handleTouchEnd
      }), /*#__PURE__*/_react["default"].createElement("input", {
        value: this.currentValue,
        type: "hidden"
      }));
    }
  }]);
}(_react["default"].PureComponent);