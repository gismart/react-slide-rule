"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _Canvas = _interopRequireDefault(require("./Canvas"));
var _styles = _interopRequireDefault(require("./data/styles"));
var _excluded = ["onChange", "gap", "step", "stepsAmount", "max", "min", "value", "axis", "markStyle", "smallerMarkStyle", "numberStyle", "unit", "style", "showWarning"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var DEFAULT_X_AXIS_PROPS = {
  width: 300,
  height: 55,
  cursor: /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      width: 4,
      height: 35,
      backgroundColor: '#2AA'
    }
  }),
  markStyle: {
    color: '#C4C4C4',
    width: 3,
    height: 30,
    top: 0
  },
  smallerMarkStyle: {
    color: '#E4E4E4',
    width: 2,
    height: 15,
    top: 0
  },
  numberStyle: {
    size: '1.25em',
    family: 'Arial',
    color: 'rgba(0, 0, 0, 0.87)',
    top: 36,
    textAlign: 'center',
    textBaseline: 'top',
    rotate: 0
  }
};
var DEFAULT_Y_AXIS_PROPS = {
  width: 75,
  height: 300,
  cursor: /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      width: 35,
      height: 4,
      backgroundColor: '#2AA'
    }
  }),
  markStyle: {
    color: '#C4C4C4',
    width: 30,
    height: 3,
    left: 0
  },
  smallerMarkStyle: {
    color: '#E4E4E4',
    width: 15,
    height: 2,
    left: 0
  },
  numberStyle: {
    size: '1.25em',
    family: 'Arial',
    color: 'rgba(0, 0, 0, 0.87)',
    left: 36,
    textAlign: 'left',
    textBaseline: 'middle',
    rotate: 0
  }
};
var _isXAxis = function _isXAxis(axis) {
  return axis === 'x' || axis === 'x-reverse';
};
var _getOrMerge = function _getOrMerge() {
  var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var target = arguments.length > 1 ? arguments[1] : undefined;
  try {
    return target ? _objectSpread(_objectSpread({}, source), target) : source;
  } catch (e) {
    return source;
  }
};
var _default = exports["default"] = /*#__PURE__*/_react["default"].forwardRef(function SlideRule(props, ref) {
  var _props$onChange = props.onChange,
    onChange = _props$onChange === void 0 ? function (v) {
      return v;
    } : _props$onChange,
    _props$gap = props.gap,
    gap = _props$gap === void 0 ? 10 : _props$gap,
    _props$step = props.step,
    step = _props$step === void 0 ? 1 : _props$step,
    _props$stepsAmount = props.stepsAmount,
    stepsAmount = _props$stepsAmount === void 0 ? 10 : _props$stepsAmount,
    _props$max = props.max,
    max = _props$max === void 0 ? 300 : _props$max,
    _props$min = props.min,
    min = _props$min === void 0 ? 0 : _props$min,
    _props$value = props.value,
    value = _props$value === void 0 ? 150 : _props$value,
    _props$axis = props.axis,
    axis = _props$axis === void 0 ? 'x' : _props$axis,
    markStyle = props.markStyle,
    smallerMarkStyle = props.smallerMarkStyle,
    numberStyle = props.numberStyle,
    _props$unit = props.unit,
    unit = _props$unit === void 0 ? '' : _props$unit,
    style = props.style,
    _props$showWarning = props.showWarning,
    showWarning = _props$showWarning === void 0 ? false : _props$showWarning,
    rest = _objectWithoutProperties(props, _excluded);
  if (showWarning) validate({
    value: value,
    min: min,
    max: max,
    step: step
  });
  var def = _isXAxis(axis) ? DEFAULT_X_AXIS_PROPS : DEFAULT_Y_AXIS_PROPS;
  var _rest$width = rest.width,
    width = _rest$width === void 0 ? def.width : _rest$width,
    _rest$height = rest.height,
    height = _rest$height === void 0 ? def.height : _rest$height,
    _rest$cursor = rest.cursor,
    cursor = _rest$cursor === void 0 ? def.cursor : _rest$cursor;
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: ref,
    style: _styles["default"].createRootStyle(style)
  }, /*#__PURE__*/_react["default"].createElement(_Canvas["default"], {
    onChange: onChange,
    gap: gap,
    step: step,
    stepsAmount: stepsAmount,
    max: max,
    min: min,
    value: Number(value),
    axis: axis,
    markStyle: _getOrMerge(def.markStyle, markStyle),
    smallerMarkStyle: _getOrMerge(def.smallerMarkStyle, smallerMarkStyle),
    numberStyle: _getOrMerge(def.numberStyle, numberStyle),
    width: width,
    height: height,
    unit: unit
  }), /*#__PURE__*/_react["default"].createElement("div", {
    style: _styles["default"].createCenterStyle(_isXAxis(axis))
  }, cursor));
});
function validate(options) {
  var value = options.value,
    min = options.min,
    max = options.max,
    step = options.step;
  if (typeof value !== 'number') console.warn('value prop should be number!');
  if (!Number.isInteger(min / step)) console.warn('min prop should be a multiple of the step prop');
  if (!Number.isInteger(max / step)) console.warn('max prop should be a multiple of the step prop');
  if (!Number.isInteger(value / step)) console.warn('value prop should be a multiple of the step prop');
}