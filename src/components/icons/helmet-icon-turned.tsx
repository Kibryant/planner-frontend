import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

export function HelmetIconTurned(props: SvgProps) {
  return (
    <Svg width={40} height={44} viewBox="0 0 40 44" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.32 1.09a2.42 2.42 0 013.42 0l6.55 6.55h-6.842L23.32 4.512a2.42 2.42 0 010-3.421zm.292 6.55l-6.55-6.55a2.42 2.42 0 00-3.42 0l-6.55 6.55h16.52zm-18.94 2.42l-.135.133a4.84 4.84 0 00-3.702 4.706v24.195a4.839 4.839 0 004.84 4.839h29.033a4.839 4.839 0 004.84-4.84h-9.679a12.097 12.097 0 010-24.194h9.678a4.839 4.839 0 00-3.702-4.706l-.135-.133H4.672z"
        fill="#FF005E"
        fillOpacity={0.5}
      />
    </Svg>
  );
}
