import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

export function ThunderIconTurned(props: SvgProps) {
  return (
    <Svg width={44} height={56} viewBox="0 0 44 56" fill="none" {...props}>
      <Path
        d="M43.727 27.555c-.197-.79-.987-1.382-1.776-1.382H30.105l7.699-23.097c.197-.79 0-1.777-.79-2.172-.79-.592-1.58-.395-2.369 0L1.086 26.568C.494 27.16.1 27.95.494 28.739c.395.79 1.184 1.382 1.974 1.382h11.845l-7.7 23.097c-.197.79 0 1.777.79 2.172.198.197.593.395.987.395.395 0 .79-.198 1.185-.395l33.56-25.664c.592-.592.987-1.381.592-2.171z"
        fill="#FF005E"
        fillOpacity={0.5}
      />
    </Svg>
  );
}
