"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ROOT_STYLE = {
  position: 'relative',
  overflow: 'hidden'
};
var CENTER_STYLE = {
  position: 'absolute',
  pointerEvents: 'none',
  left: '50%',
  top: 0,
  transform: 'translateX(-50%)'
};
var CENTER_COLUMN_STYLE = {
  position: 'absolute',
  pointerEvents: 'none',
  top: '50%',
  left: 0,
  transform: 'translateY(-50%)'
};
var CANVAS_STYLE = {
  display: 'block',
  transitionDuration: '300ms'
};
var createCanvasStyle = function createCanvasStyle(translate, isXAxis) {
  return translate === 0 ? CANVAS_STYLE : isXAxis ? _objectSpread(_objectSpread({}, CANVAS_STYLE), {}, {
    transform: "translateX(".concat(translate, "px)")
  }) : _objectSpread(_objectSpread({}, CANVAS_STYLE), {}, {
    transform: "translateY(".concat(translate, "px)")
  });
};
var createRootStyle = function createRootStyle(style) {
  try {
    return style ? _objectSpread(_objectSpread({}, ROOT_STYLE), style) : ROOT_STYLE;
  } catch (e) {
    return ROOT_STYLE;
  }
};
var createCenterStyle = function createCenterStyle(isXAxis) {
  return isXAxis ? CENTER_STYLE : CENTER_COLUMN_STYLE;
};
var _default = exports["default"] = {
  createCanvasStyle: createCanvasStyle,
  createRootStyle: createRootStyle,
  createCenterStyle: createCenterStyle
};