import { MarkStyle, NumberStyle } from '../data/type';
import util from './common';

interface DrawCanvas {
  canvas: HTMLCanvasElement;
  step: number;
  markStyle: MarkStyle;
  smallerMarkStyle: MarkStyle;
  numberStyle: NumberStyle | MarkStyle;
  unit: string;
  min: number;
  max: number;
  from: number;
  to: number;
  calcMarkCoordinate: (_v: number) => number;
  isXAxis: boolean;
}

const _drawVerticalLine = (
  ctx: CanvasRenderingContext2D,
  coordinate: number,
  style: Required<MarkStyle>
) => {
  const { width, height, color, top } = style;

  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.moveTo(coordinate, top);
  ctx.lineTo(coordinate, top + height);
  ctx.stroke();
};

const _drawLine = (
  ctx: CanvasRenderingContext2D,
  coordinate: number,
  style: Required<MarkStyle>
) => {
  const { width, height, color, left } = style;

  ctx.lineWidth = height;
  ctx.strokeStyle = color;
  ctx.moveTo(left, coordinate);
  ctx.lineTo(left + width, coordinate);
  ctx.stroke();
};

const drawNumber = ({
  ctx,
  text,
  coordinate,
  numberStyle: { top, left, rotate },
  isXAxis,
}: {
  ctx: CanvasRenderingContext2D;
  text: string;
  coordinate: number;
  numberStyle: NumberStyle;
  isXAxis: boolean;
}) => {
  ctx.save();
  if (isXAxis) ctx.translate(coordinate, top!);
  else ctx.translate(left!, coordinate);

  ctx.rotate((Math.PI / 180) * rotate);
  ctx.fillText(text, 0, 0);
  ctx.restore();
};

const _applyNumberNumberStyle = (
  ctx: CanvasRenderingContext2D,
  numberStyle: NumberStyle
) => {
  const { size, family, color, textAlign, textBaseline } = numberStyle;
  ctx.fillStyle = color!;
  ctx.textAlign = textAlign!;
  ctx.textBaseline = textBaseline!;
  ctx.font = `${size} ${family}`;
};

const _round = (number: number, step: number) =>
  step >= 0.1 ? number : number.toFixed(util.countDecimalPlace(step) - 1);

const _calcNum = (i: number, step: number) => _round(i * step, step);

const drawCanvas = ({
  canvas,
  step,
  markStyle,
  smallerMarkStyle,
  numberStyle,
  unit,
  min,
  max,
  from,
  to,
  calcMarkCoordinate,
  isXAxis,
}: DrawCanvas) => {
  const drawLine = isXAxis ? _drawVerticalLine : _drawLine;
  const lower = Math.round(min / step); // use round() in case of decimal place
  const upper = Math.round(max / step);
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  _applyNumberNumberStyle(ctx, numberStyle);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = from; i <= to; ++i) {
    if (i < lower || i > upper) continue;
    const coordinate = calcMarkCoordinate(i);

    ctx.beginPath();
    if (i % 10 === 0) {
      drawLine(ctx, coordinate, markStyle as Required<MarkStyle>);
      const text = _calcNum(i, step) + unit;
      drawNumber({ ctx, text, coordinate, numberStyle, isXAxis });
    } else drawLine(ctx, coordinate, smallerMarkStyle as Required<MarkStyle>);

    ctx.closePath();
  }
};

export default { drawCanvas };