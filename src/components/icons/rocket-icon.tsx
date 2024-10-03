import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

export function RocketIcon(props: SvgProps) {
  return (
    <Svg width={25} height={25} viewBox="0 0 19 19" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.593 1.571c.213.212.354.486.404.782.294 1.711.657 5.195-.906 6.76-1.77 1.768-8.485 5.517-10.611 6.683a.987.987 0 01-1.176-.173l-.882-.88-.877-.884a.988.988 0 01-.173-1.177c1.165-2.126 4.913-8.84 6.682-10.61C11.616.507 15.1.872 16.81 1.166c.296.05.57.191.782.404zM2.663 5.483l4-.34-2.69 4.48-2.857-.335A.996.996 0 01.55 7.594l2.112-2.11zm11.357 7.02l-.34 4-2.111 2.113a.997.997 0 01-1.69-.565l-.422-2.807 4.563-2.74zm.84-6.21a1.99 1.99 0 11-3.98 0 1.99 1.99 0 013.98 0z"
        fill="#FF005E"
      />
    </Svg>
  );
}
