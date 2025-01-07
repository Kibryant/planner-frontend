import Svg, { Path, type SvgProps } from "react-native-svg";

export function Question(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 10C0 4.477 4.477 0 10 0s10 4.477 10 10-4.477 10-10 10S0 15.523 0 10zm9.008-3.018a1.502 1.502 0 012.522 1.159v.024a1.441 1.441 0 01-1.493 1.418A1 1 0 009 10.582V12a1 1 0 102 0v-.539a3.44 3.44 0 002.529-3.256 3.502 3.502 0 00-7-.255 1 1 0 102 .076 1.49 1.49 0 01.479-1.044zm.982 7.026a1 1 0 000 2H10a1 1 0 000-2h-.01z"
        fill="#FF005E"
      />
    </Svg>
  );
}
