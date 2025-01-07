import Svg, { Rect, Path, type SvgProps } from "react-native-svg";

export function Logout(props: SvgProps) {
  return (
    <Svg width={20} height={22} viewBox="0 0 20 22" fill="none" {...props}>
      <Rect
        x={-0.00012207}
        y={0.857178}
        width={20.0002}
        height={20.2857}
        rx={10.0001}
        fill="#FF005E"
      />
      <Path
        d="M6 11h8m-8 0l3.143 3.143M6 11l3.143-3.143"
        stroke="#3D0016"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
