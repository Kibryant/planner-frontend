import Svg, { Path, type SvgProps } from "react-native-svg";

export function DownloadIcon(props: SvgProps) {
  return (
    <Svg width={9} height={15} viewBox="0 0 9 15" fill="none" {...props}>
      <Path
        d="M7.811 2.815V9.94a3.485 3.485 0 11-6.97 0V3.075a2.323 2.323 0 014.647 0v6.83a1.162 1.162 0 11-2.324 0V3.7"
        stroke="#fff"
        strokeWidth={1.26733}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
