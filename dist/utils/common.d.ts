import { TouchPoint } from '../data/type';
declare const _default: {
    isOverBoundary: (options: {
        min: number;
        max: number;
        delta: number;
        value: number;
    }) => boolean;
    calcReboundTranslate: (delta: number) => number;
    calcInertialShfitInPx: (touchPoints: TouchPoint[]) => number;
    adjustValue: (options: {
        min: number;
        max: number;
        step: number;
        value: number;
    }) => number;
    countDecimalPlace: (step: number) => number;
    calcFromTo: (options: {
        step: number;
        gap: number;
        basis: number;
        value: number;
        isReverseAxis: boolean;
    }) => object;
};
export default _default;
