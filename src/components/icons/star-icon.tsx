import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

export function StarIcon(props: SvgProps) {
  return (
    <Svg width={27} height={25} viewBox="0 0 27 25" fill="none" {...props}>
      <Path
        d="M15.985 1.584c-.879-2.09-3.875-2.09-4.754 0L8.976 6.942l-5.853.464c-2.282.18-3.208 2.997-1.468 4.47l4.459 3.777L4.75 21.3c-.531 2.202 1.892 3.943 3.847 2.763l5.01-3.025 5.01 3.026c1.955 1.18 4.379-.56 3.848-2.764l-1.363-5.645 4.459-3.777c1.74-1.473.813-4.29-1.469-4.47l-5.852-.463-2.256-5.36z"
        fill="#FF005E"
      />
    </Svg>
  );
}
