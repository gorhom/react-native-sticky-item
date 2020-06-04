import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const PlusSVG = () => {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18">
      <G
        stroke="#fff"
        strokeWidth={2}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M8 1v14M1 8h14" />
      </G>
    </Svg>
  );
};

export default PlusSVG;
