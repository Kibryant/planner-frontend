import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

export function MoneyIcon(props: SvgProps) {
  return (
    <Svg width={28} height={28} viewBox="0 0 28 28" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.893 18.72a9.055 9.055 0 1118.109 0 9.055 9.055 0 01-18.11 0zm5.802-2.8c.355-.819 1-1.478 1.811-1.85a1.509 1.509 0 013.006-.04 4.03 4.03 0 011.677 1.131 1.51 1.51 0 11-2.258 2.002 1.029 1.029 0 00-.543-.321 1.506 1.506 0 01-.17-.048.603.603 0 00-.595.111c.187.191.426.324.686.384.878.209 1.67.683 2.27 1.358.563.653 1.01 1.648.7 2.75a1.493 1.493 0 01-.07.196 3.63 3.63 0 01-1.707 1.798 1.51 1.51 0 01-2.952.14 4.044 4.044 0 01-1.852-1.203 1.51 1.51 0 01.638-2.456 1.508 1.508 0 011.635.471c.143.164.335.278.548.326.057.014.113.03.167.048a.604.604 0 00.596-.111 1.404 1.404 0 00-.686-.384 4.392 4.392 0 01-2.268-1.358c-.566-.653-1.005-1.643-.704-2.742.02-.069.043-.136.071-.202zm2.843.865l.005.012c-.005-.008-.005-.012-.005-.012zm.83 3.943s-.003-.003-.004-.01a.045.045 0 01.004.01zM2.348 17.21a1.509 1.509 0 011.509 1.51v6.036a1.509 1.509 0 01-3.018 0v-6.037a1.509 1.509 0 011.509-1.509zm4.527-3.018a1.51 1.51 0 011.509 1.51v9.054a1.509 1.509 0 01-3.018 0V15.7a1.51 1.51 0 011.509-1.509zM16.684 2.12A1.51 1.51 0 0118.193.61h5.281a1.51 1.51 0 011.51 1.51v4.527a1.51 1.51 0 01-3.019 0V5.446l-3.532 3.092a1.509 1.509 0 01-1.872.09l-4.367-3.117-5.902 4.592A1.51 1.51 0 114.44 7.72l6.79-5.281a1.509 1.509 0 011.804-.038l4.31 3.078L19.46 3.63h-1.267a1.51 1.51 0 01-1.51-1.51z"
        fill="#FF005E"
      />
    </Svg>
  );
}
