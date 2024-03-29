"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Math$log;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
// Log10 polyfill. IE does not support log10().
Math.log10 = (_Math$log = Math.log10) !== null && _Math$log !== void 0 ? _Math$log : function (x) {
  return Math.log(x) * Math.LOG10E;
};
var isOverBoundary = function isOverBoundary(options) {
  var min = options.min,
    max = options.max,
    delta = options.delta,
    value = options.value;
  return value <= min && delta > 0 || value >= max && delta < 0;
};
var calcReboundTranslate = function calcReboundTranslate(delta) {
  return Math.sign(delta) * 1.5988 * Math.pow(Math.abs(delta), 0.7962);
};
var calcInertialShfitInPx = function calcInertialShfitInPx(touchPoints) {
  if (touchPoints.length < 4) return 0;
  var _touchPoints$slice = touchPoints.slice(-4),
    _touchPoints$slice2 = _slicedToArray(_touchPoints$slice, 4),
    first = _touchPoints$slice2[0],
    last = _touchPoints$slice2[3];
  var v = (last.shift - first.shift) / (last.time - first.time) * 1000;
  return Math.sign(v) * Math.pow(v, 2) / 6000;
};
var adjustValue = function adjustValue(options) {
  var min = options.min,
    max = options.max,
    step = options.step,
    value = options.value;
  var clampedValue = Math.max(min, Math.min(value, max));
  return Math.round(clampedValue / step) * step;
};
var countDecimalPlace = function countDecimalPlace(step) {
  return -Math.floor(Math.log10(step));
};
var calcFromTo = function calcFromTo(options) {
  var step = options.step,
    gap = options.gap,
    basis = options.basis,
    value = options.value,
    isReverseAxis = options.isReverseAxis;
  var halfBasis = basis / 2;
  var startValue = value - Math.floor(halfBasis / gap) * step;
  var from = Math.round(startValue / step); // use round() in case of decimal place
  var to = from + basis / gap;
  var marginLeft = halfBasis % gap;
  var calcMarkCoordinate = isReverseAxis ? function (i) {
    return marginLeft + (to - i) * gap;
  } : function (i) {
    return marginLeft + (i - from) * gap;
  };
  return {
    from: from,
    to: to,
    calcMarkCoordinate: calcMarkCoordinate
  };
};
var _default = exports["default"] = {
  isOverBoundary: isOverBoundary,
  calcReboundTranslate: calcReboundTranslate,
  calcInertialShfitInPx: calcInertialShfitInPx,
  adjustValue: adjustValue,
  countDecimalPlace: countDecimalPlace,
  calcFromTo: calcFromTo
};