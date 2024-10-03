import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

export function HomeIcon(props: SvgProps) {
  return (
    <Svg width={23} height={24} viewBox="0 0 23 24" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.553 1.066a1.257 1.257 0 011.778 0l7.544 7.544 2.514 2.515a1.258 1.258 0 01-1.777 1.777l-.369-.368v8.28a2.514 2.514 0 01-2.514 2.515h-3.772a1.257 1.257 0 01-1.258-1.257V18.3h-2.514v3.772a1.258 1.258 0 01-1.257 1.257H5.156a2.514 2.514 0 01-2.515-2.514v-8.28l-.368.367a1.257 1.257 0 01-1.778-1.777L3.009 8.61l7.544-7.544z"
      />
    </Svg>
  );
}
