export default class Canvas extends React.PureComponent<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    coordinate: number;
    isTouching: boolean;
    touchPoints: any[];
    state: {
        translate: number;
    };
    browserEnv: boolean;
    canvasRef: React.RefObject<any>;
    currentValue: any;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentDidCatch(error: any, errorInfo: any): void;
    get isXAxis(): boolean;
    get isReverseAxis(): boolean;
    getCoordinate: (e: any) => any;
    handleTouchStart: (e: any) => void;
    handleTouchMove: (e: any) => void;
    handleTouchEnd: () => void;
    addTouchPoint: (shift: any) => number;
    rebound(delta: any): boolean;
    moveGradations(delta: any): void;
    drawCanvas(): void;
    render(): React.JSX.Element;
}
import React from "react";
