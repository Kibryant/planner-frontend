import Svg, { Path, type SvgProps } from "react-native-svg";

export function CalendarIcon(props: SvgProps) {
  return (
    <Svg width={25} height={25} viewBox="0 0 25 25" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.175 3.3a1.348 1.348 0 001.348-1.348 1.348 1.348 0 112.695 0A1.348 1.348 0 008.565 3.3h1.348a1.348 1.348 0 001.348-1.348 1.348 1.348 0 012.695 0A1.348 1.348 0 0015.303 3.3h1.348a1.348 1.348 0 001.347-1.348 1.348 1.348 0 012.695 0A1.348 1.348 0 0022.041 3.3a2.695 2.695 0 012.695 2.695v1.347A1.348 1.348 0 0123.39 8.69H1.828A1.348 1.348 0 01.48 7.342V5.995A2.695 2.695 0 013.175 3.3zM.48 22.166v-9.434a1.347 1.347 0 011.348-1.347h21.56a1.348 1.348 0 011.348 1.348v9.433a2.695 2.695 0 01-2.695 2.695H3.175A2.695 2.695 0 01.48 22.166zM8.58 14.08a1.348 1.348 0 10-2.696 0 1.348 1.348 0 002.696 0zm2.695 0a1.347 1.347 0 112.695 0 1.347 1.347 0 01-2.695 0zm8.085 0a1.347 1.347 0 10-2.694 0 1.347 1.347 0 002.694 0zM5.884 19.47a1.348 1.348 0 112.695 0 1.348 1.348 0 01-2.695 0zm8.085 0a1.348 1.348 0 10-2.695 0 1.348 1.348 0 002.695 0zm2.695 0a1.348 1.348 0 112.696 0 1.348 1.348 0 01-2.696 0z"
        fill="#FF005E"
      />
    </Svg>
  );
}