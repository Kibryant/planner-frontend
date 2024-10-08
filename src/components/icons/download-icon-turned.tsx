import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

export function DownloadIconTurned(props: SvgProps) {
  return (
    <Svg width={21} height={21} viewBox="0 0 21 21" fill="none" {...props}>
      <Path
        d="M19.391 13.074v4a2 2 0 01-2 2h-14a2 2 0 01-2-2v-4"
        stroke="#EF0052"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.391 8.074l5 5 5-5M10.391 13.074v-12"
        stroke="#EF0052"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
