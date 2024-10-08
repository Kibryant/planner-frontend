import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

export function TriangleGoIcon(props: SvgProps) {
  return (
    <Svg width={9} height={12} viewBox="0 0 9 12" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.043.9a.75.75 0 00-1.2.6v9a.75.75 0 001.2.6l6-4.5a.75.75 0 000-1.2l-6-4.5z"
        fill="#fff"
      />
    </Svg>
  );
}
