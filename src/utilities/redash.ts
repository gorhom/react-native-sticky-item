/**
 * MIT License
 * Copyright (c) 2020 William Candillon
 * https://github.com/wcandillon/react-native-redash
 */

import { useRef } from 'react';
import { processColor } from 'react-native';
import Animated from 'react-native-reanimated';
// @ts-ignore
import parseSVG from 'parse-svg-path';
// @ts-ignore
import absSVG from 'abs-svg-path';
// @ts-ignore
import normalizeSVG from 'normalize-svg-path';
import { cubicBezierLength } from './cubicBezierLength';
import {
  FlingGestureHandlerGestureEvent,
  ForceTouchGestureHandlerGestureEvent,
  GestureHandlerStateChangeNativeEvent,
  LongPressGestureHandlerGestureEvent,
  PanGestureHandlerGestureEvent,
  PinchGestureHandlerGestureEvent,
  RotationGestureHandlerGestureEvent,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import { Easing, interpolate } from './reanimated';

const {
  multiply,
  event,
  floor,
  abs,
  sub,
  block,
  Extrapolate,
  set,
  color,
  add,
  not,
  cond,
  neq,
  concat,
  startClock,
  min: min2,
  max: max2,
  stopClock,
  timing,
  round,
  proc,
  Clock,
  Value,
} = Animated;

type Color = Animated.Adaptable<string> | Animated.Adaptable<number>;

interface ColorInterpolationConfig {
  inputRange: readonly Animated.Adaptable<number>[];
  outputRange: Color[];
}

type Adaptable<T> = { [P in keyof T]: Animated.Adaptable<T[P]> };

export interface Vector<
  T extends Animated.Adaptable<number> = Animated.Adaptable<number>
> {
  x: T;
  y: T;
}

type NativeEvent = GestureHandlerStateChangeNativeEvent &
  (
    | PanGestureHandlerGestureEvent
    | TapGestureHandlerGestureEvent
    | LongPressGestureHandlerGestureEvent
    | RotationGestureHandlerGestureEvent
    | FlingGestureHandlerGestureEvent
    | PinchGestureHandlerGestureEvent
    | ForceTouchGestureHandlerGestureEvent
  );

export type TimingConfig = Partial<Omit<Animated.TimingConfig, 'toValue'>>;

type Transform2dName =
  | 'translateX'
  | 'translateY'
  | 'scale'
  | 'skewX'
  | 'skewY'
  | 'scaleX'
  | 'scaleY'
  | 'rotateZ'
  | 'rotate';

type Transformations = {
  [Name in Transform2dName]: Animated.Adaptable<number>;
};

export type Transforms2d = (
  | Pick<Transformations, 'translateX'>
  | Pick<Transformations, 'translateY'>
  | Pick<Transformations, 'scale'>
  | Pick<Transformations, 'scaleX'>
  | Pick<Transformations, 'scaleY'>
  | Pick<Transformations, 'skewX'>
  | Pick<Transformations, 'skewY'>
  | Pick<Transformations, 'rotateZ'>
  | Pick<Transformations, 'rotate'>
)[];

export const transformOrigin = (
  { x, y }: Vector,
  ...transformations: Transforms2d
): Transforms2d => [
  { translateX: x },
  { translateY: y },
  ...transformations,
  { translateX: multiply(x, -1) },
  { translateY: multiply(y, -1) },
];

type Atomic = string | number | boolean;

export const useValue = <V extends Atomic>(value: V) =>
  useConst(() => new Value(value));

export const useConst = <T>(initialValue: T | (() => T)): T => {
  const ref = useRef<{ value: T }>();
  if (ref.current === undefined) {
    // Box the value in an object so we can tell if it's initialized even if the initializer
    // returns/is undefined
    ref.current = {
      value:
        typeof initialValue === 'function'
          ? (initialValue as Function)()
          : initialValue,
    };
  }
  return ref.current.value;
};

export const onGestureEvent = (
  nativeEvent: Partial<Adaptable<NativeEvent>>
) => {
  const gestureEvent = event([{ nativeEvent }]);
  return {
    onHandlerStateChange: gestureEvent,
    onGestureEvent: gestureEvent,
  };
};

export const clamp = proc(
  (
    value: Animated.Adaptable<number>,
    lowerBound: Animated.Adaptable<number>,
    upperBound: Animated.Adaptable<number>
  ): Animated.Node<number> => min2(max2(lowerBound, value), upperBound)
);

export const useGestureHandler = (
  nativeEvent: Parameters<typeof onGestureEvent>[0]
) => useConst(() => onGestureEvent(nativeEvent));

export const withTransition = (
  value: Animated.Node<number>,
  timingConfig: TimingConfig = {}
) => {
  const init = new Value(0);
  const clock = new Clock();
  const state = {
    finished: new Value(0),
    frameTime: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };
  const config = {
    toValue: new Value(0),
    duration: 150,
    easing: Easing.linear,
    ...timingConfig,
  };
  return block([
    cond(not(init), [set(init, 1), set(state.position, value)]),
    cond(neq(config.toValue, value), [
      set(state.frameTime, 0),
      set(state.time, 0),
      set(state.finished, 0),
      set(config.toValue, value),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ]);
};

export const withTimingTransition = withTransition;
export const fract = (x: Animated.Adaptable<number>) => sub(x, floor(x));

export const opacity = (c: number) => ((c >> 24) & 255) / 255;
export const red = (c: number) => (c >> 16) & 255;
export const green = (c: number) => (c >> 8) & 255;
export const blue = (c: number) => c & 255;

export const interpolateColor = (
  value: Animated.Adaptable<number>,
  config: ColorInterpolationConfig,
  colorSpace: 'hsv' | 'rgb' = 'rgb'
): Animated.Node<number> => {
  const { inputRange } = config;
  const outputRange = config.outputRange.map(c =>
    //@ts-ignore
    typeof c === 'number' ? c : processColor(c)
  );
  if (colorSpace === 'hsv') {
    //@ts-ignore
    return interpolateColorsHSV(value, inputRange, outputRange);
  }
  //@ts-ignore
  return interpolateColorsRGB(value, inputRange, outputRange);
};

export const mix = proc(
  (
    value: Animated.Adaptable<number>,
    x: Animated.Adaptable<number>,
    y: Animated.Adaptable<number>
  ) => add(x, multiply(value, sub(y, x)))
);

const rgbToHsv = (c: number) => {
  const r = red(c) / 255;
  const g = green(c) / 255;
  const b = blue(c) / 255;

  const ma = Math.max(r, g, b);
  const mi = Math.min(r, g, b);
  let h = 0;
  const v = ma;

  const d = ma - mi;
  const s = ma === 0 ? 0 : d / ma;
  if (ma === mi) {
    h = 0; // achromatic
  } else {
    switch (ma) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default: // do nothing
    }
    h /= 6;
  }
  return { h, s, v };
};

export const hsv2rgb = (
  h: Animated.Adaptable<number>,
  s: Animated.Adaptable<number>,
  v: Animated.Adaptable<number>
) => {
  // vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  const K = {
    x: 1,
    y: 2 / 3,
    z: 1 / 3,
    w: 3,
  };
  // vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  const p = {
    x: abs(sub(multiply(fract(add(h, K.x)), 6), K.w)),
    y: abs(sub(multiply(fract(add(h, K.y)), 6), K.w)),
    z: abs(sub(multiply(fract(add(h, K.z)), 6), K.w)),
  };
  // return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  const rgb = {
    x: multiply(v, mix(s, K.x, clamp(sub(p.x, K.x), 0, 1))),
    y: multiply(v, mix(s, K.x, clamp(sub(p.y, K.x), 0, 1))),
    z: multiply(v, mix(s, K.x, clamp(sub(p.z, K.x), 0, 1))),
  };
  return {
    r: round(multiply(rgb.x, 255)),
    g: round(multiply(rgb.y, 255)),
    b: round(multiply(rgb.z, 255)),
  };
};

export const hsv2color = proc(
  // @ts-ignore
  (
    h: Animated.Adaptable<number>,
    s: Animated.Adaptable<number>,
    v: Animated.Adaptable<number>
  ) => {
    const { r, g, b } = hsv2rgb(h, s, v);
    return color(r, g, b);
  }
);

const interpolateColorsHSV = (
  animationValue: Animated.Adaptable<number>,
  inputRange: readonly Animated.Adaptable<number>[],
  colors: number[]
): Animated.Node<number> => {
  const colorsAsHSV = colors.map(c => rgbToHsv(c));
  const h = interpolate(animationValue, {
    inputRange,
    outputRange: colorsAsHSV.map(c => c.h),
    extrapolate: Extrapolate.CLAMP,
  });
  const s = interpolate(animationValue, {
    inputRange,
    outputRange: colorsAsHSV.map(c => c.s),
    extrapolate: Extrapolate.CLAMP,
  });
  const v = interpolate(animationValue, {
    inputRange,
    outputRange: colorsAsHSV.map(c => c.v),
    extrapolate: Extrapolate.CLAMP,
  });
  return hsv2color(h, s, v);
};

const interpolateColorsRGB = (
  animationValue: Animated.Adaptable<number>,
  inputRange: readonly Animated.Adaptable<number>[],
  colors: number[]
) => {
  const r = round(
    interpolate(animationValue, {
      inputRange,
      outputRange: colors.map(c => red(c)),
      extrapolate: Extrapolate.CLAMP,
    })
  );
  const g = round(
    interpolate(animationValue, {
      inputRange,
      outputRange: colors.map(c => green(c)),
      extrapolate: Extrapolate.CLAMP,
    })
  );
  const b = round(
    interpolate(animationValue, {
      inputRange,
      outputRange: colors.map(c => blue(c)),
      extrapolate: Extrapolate.CLAMP,
    })
  );
  const a = interpolate(animationValue, {
    inputRange,
    outputRange: colors.map(c => opacity(c)),
    extrapolate: Extrapolate.CLAMP,
  });

  return color(r, g, b, a);
};

export interface ReanimatedPath {
  totalLength: number;
  segments: { start: number; end: number; p0x: number; p3x: number }[];
  length: number[];
  start: number[];
  end: number[];
  p0x: number[];
  p0y: number[];
  p1x: number[];
  p1y: number[];
  p2x: number[];
  p2y: number[];
  p3x: number[];
  p3y: number[];
}

type BezierPoint =
  | 'p0x'
  | 'p0y'
  | 'p1x'
  | 'p1y'
  | 'p2x'
  | 'p2y'
  | 'p3x'
  | 'p3y';

export interface PathInterpolationConfig {
  inputRange: readonly Animated.Adaptable<number>[];
  outputRange: readonly (ReanimatedPath | string)[];
  extrapolate?: Animated.Extrapolate;
  extrapolateLeft?: Animated.Extrapolate;
  extrapolateRight?: Animated.Extrapolate;
}

export const interpolatePath = (
  value: Animated.Adaptable<number>,
  { inputRange, outputRange, ...config }: PathInterpolationConfig
): Animated.Node<string> => {
  const paths = outputRange.map(path =>
    typeof path === 'string' ? parsePath(path) : path
  );
  const [path] = paths;
  const commands = path.segments.map((_, index) => {
    const interpolatePoint = (point: BezierPoint) =>
      interpolate(value, {
        inputRange,
        outputRange: paths.map(p => p[point][index]),
        ...config,
      });

    const mx = interpolatePoint('p0x');
    const my = interpolatePoint('p0y');

    const p1x = interpolatePoint('p1x');
    const p1y = interpolatePoint('p1y');

    const p2x = interpolatePoint('p2x');
    const p2y = interpolatePoint('p2y');

    const p3x = interpolatePoint('p3x');
    const p3y = interpolatePoint('p3y');

    return string`${
      index === 0 ? string`M${mx},${my} ` : ''
    }C${p1x},${p1y} ${p2x},${p2y} ${p3x},${p3y}`;
  });
  return concat(...commands);
};

type SVGMoveCommand = ['M', number, number];
type SVGCurveCommand = ['C', number, number, number, number, number, number];

interface Point {
  x: number;
  y: number;
}

interface BezierCubicCurve {
  length: number;
  p0: Point;
  p1: Point;
  p2: Point;
  p3: Point;
}

export type Concatable =
  | Animated.Adaptable<string>
  | Animated.Adaptable<number>;

type SVGNormalizedCommands = [SVGMoveCommand, ...SVGCurveCommand[]];

export const string = (
  strings: readonly string[],
  ...values: readonly Concatable[]
) => {
  if (values.length === 0) {
    return concat(strings[0]);
  }
  const result = values.reduce<Concatable[]>(
    (acc, v, idx) => [...acc, strings[idx], v],
    []
  );
  result.push(strings[strings.length - 1]);
  return concat(...result);
};

const MX = 1;
const MY = 2;
const CX1 = 1;
const CY1 = 2;
const CX2 = 3;
const CY2 = 4;
const CX = 5;
const CY = 6;

export const parsePath = (d: string): ReanimatedPath => {
  const [move, ...curves]: SVGNormalizedCommands = normalizeSVG(
    absSVG(parseSVG(d))
  );
  // @ts-ignore
  const parts: BezierCubicCurve[] = curves.map((curve, index) => {
    const prevCurve = curves[index - 1];
    const p0 =
      index === 0
        ? { x: move[MX], y: move[MY] }
        : { x: prevCurve[CX], y: prevCurve[CY] };
    const p1 = { x: curve[CX1], y: curve[CY1] };
    const p2 = { x: curve[CX2], y: curve[CY2] };
    const p3 = { x: curve[CX], y: curve[CY] };
    const length = cubicBezierLength(p0, p1, p2, p3);
    return {
      p0,
      p1,
      p2,
      p3,
      length,
    };
  });
  const segments = parts.map((part, index) => {
    const start = parts.slice(0, index).reduce((acc, p) => acc + p.length, 0);
    const end = start + part.length;
    return {
      start,
      end,
      p0x: part.p0.x,
      p3x: part.p3.x,
    };
  });
  return {
    segments,
    totalLength: parts.reduce((acc, part) => acc + part.length, 0),
    length: parts.map(part => part.length),
    start: segments.map(segment => segment.start),
    end: segments.map(segment => segment.end),
    p0x: parts.map(part => part.p0.x),
    p0y: parts.map(part => part.p0.y),
    p1x: parts.map(part => part.p1.x),
    p1y: parts.map(part => part.p1.y),
    p2x: parts.map(part => part.p2.x),
    p2y: parts.map(part => part.p2.y),
    p3x: parts.map(part => part.p3.x),
    p3y: parts.map(part => part.p3.y),
  };
};
