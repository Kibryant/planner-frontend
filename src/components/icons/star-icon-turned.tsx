import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

export function StarIconTurned(props: SvgProps) {
  return (
    <Svg width={47} height={44} viewBox="0 0 47 44" fill="none" {...props}>
      <Path
        d="M27.58 3.112c-1.573-3.74-6.932-3.74-8.505 0l-4.034 9.585-10.47.83c-4.083.322-5.739 5.361-2.627 7.997l7.977 6.755-2.438 10.102c-.95 3.94 3.385 7.054 6.881 4.943l8.964-5.412 8.963 5.414c3.496 2.112 7.832-1.002 6.882-4.945l-2.438-10.097 7.976-6.758c3.112-2.635 1.456-7.672-2.626-7.997l-10.47-.828-4.034-9.589z"
        fill="#FF005E"
        fillOpacity={0.5}
      />
    </Svg>
  );
}
