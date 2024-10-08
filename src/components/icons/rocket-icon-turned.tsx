import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

export function RocketIconTurned(props: SvgProps) {
  return (
    <Svg width={43} height={43} viewBox="0 0 43 43" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M40.714 2.34c.493.49.82 1.125.936 1.811.681 3.965 1.522 12.04-2.1 15.666-4.102 4.097-19.663 12.785-24.59 15.487a2.288 2.288 0 01-2.725-.4l-2.044-2.04-2.033-2.048a2.29 2.29 0 01-.4-2.728c2.7-4.927 11.385-20.488 15.485-24.59C26.863-.124 34.935.722 38.9 1.403c.686.116 1.321.442 1.813.936zm-34.6 9.065l9.27-.79L9.15 20.997l-6.62-.774a2.308 2.308 0 01-1.31-3.926l4.894-4.892zm26.32 16.268l-.789 9.27-4.892 4.897a2.309 2.309 0 01-3.916-1.31l-.978-6.505 10.574-6.35v-.002zm1.946-14.391a4.612 4.612 0 11-9.223 0 4.612 4.612 0 019.223 0z"
        fill="#FF005E"
        fillOpacity={0.5}
      />
    </Svg>
  );
}