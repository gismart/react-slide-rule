"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _common = _interopRequireDefault(require("./common"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _drawVerticalLine = function _drawVerticalLine(ctx, coordinate, style) {
  var width = style.width,
    height = style.height,
    color = style.color,
    top = style.top;
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.moveTo(coordinate, top);
  ctx.lineTo(coordinate, top + height);
  ctx.stroke();
};
var _drawLine = function _drawLine(ctx, coordinate, style) {
  var width = style.width,
    height = style.height,
    color = style.color,
    left = style.left;
  ctx.lineWidth = height;
  ctx.strokeStyle = color;
  ctx.moveTo(left, coordinate);
  ctx.lineTo(left + width, coordinate);
  ctx.stroke();
};
var drawNumber = function drawNumber(_ref) {
  var ctx = _ref.ctx,
    text = _ref.text,
    coordinate = _ref.coordinate,
    _ref$numberStyle = _ref.numberStyle,
    top = _ref$numberStyle.top,
    left = _ref$numberStyle.left,
    rotate = _ref$numberStyle.rotate,
    isXAxis = _ref.isXAxis;
  ctx.save();
  if (isXAxis) ctx.translate(coordinate, top);else ctx.translate(left, coordinate);
  ctx.rotate(Math.PI / 180 * rotate);
  ctx.fillText(text, 0, 0);
  ctx.restore();
};
var _applyNumberNumberStyle = function _applyNumberNumberStyle(ctx, numberStyle) {
  var size = numberStyle.size,
    family = numberStyle.family,
    color = numberStyle.color,
    textAlign = numberStyle.textAlign,
    textBaseline = numberStyle.textBaseline;
  ctx.fillStyle = color;
  ctx.textAlign = textAlign;
  ctx.textBaseline = textBaseline;
  ctx.font = "".concat(size, " ").concat(family);
};
var _round = function _round(number, step) {
  return step >= 0.1 ? number : number.toFixed(_common["default"].countDecimalPlace(step) - 1);
};
var _calcNum = function _calcNum(i, step) {
  return _round(i * step, step);
};
var drawCanvas = function drawCanvas(_ref2) {
  var canvas = _ref2.canvas,
    step = _ref2.step,
    markStyle = _ref2.markStyle,
    smallerMarkStyle = _ref2.smallerMarkStyle,
    numberStyle = _ref2.numberStyle,
    unit = _ref2.unit,
    min = _ref2.min,
    max = _ref2.max,
    from = _ref2.from,
    to = _ref2.to,
    gap = _ref2.gap,
    calcMarkCoordinate = _ref2.calcMarkCoordinate,
    isXAxis = _ref2.isXAxis;
  var drawLine = isXAxis ? _drawVerticalLine : _drawLine;
  var lower = Math.round(min / step); // use round() in case of decimal place
  var upper = Math.round(max / step);
  var ctx = canvas.getContext('2d');
  _applyNumberNumberStyle(ctx, numberStyle);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = from; i <= to; ++i) {
    if (i < lower || i > upper) continue;
    var coordinate = calcMarkCoordinate(i);
    ctx.beginPath();
    if (i % gap === 0) {
      drawLine(ctx, coordinate, markStyle);
      var text = _calcNum(i, step) + unit;
      drawNumber({
        ctx: ctx,
        text: text,
        coordinate: coordinate,
        numberStyle: numberStyle,
        isXAxis: isXAxis
      });
    } else drawLine(ctx, coordinate, smallerMarkStyle);
    ctx.closePath();
  }
};
var _default = exports["default"] = {
  drawCanvas: drawCanvas
};