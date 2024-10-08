import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

export function TriangleBackIcon(props: SvgProps) {
  return (
    <Svg width={8} height={12} viewBox="0 0 8 12" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.8.9a.75.75 0 011.2.6v9a.75.75 0 01-1.2.6l-6-4.5a.75.75 0 010-1.2l6-4.5z"
        fill="#f4f4f5"
      />
    </Svg>
  );
}
