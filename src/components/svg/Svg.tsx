import React, { FC } from 'react';
import { SvgConfig } from "../../svg/waveforms";

interface Props {
  dimension?: string;
  onClick?: () => void;
  config: SvgConfig;
  className?: string;
  strokeColor?: string;
}

export const Svg: FC<Props> = ({strokeColor = '#618099', config: { markup, ...rest}, className, onClick, dimension}) =>
  <svg
    {...rest}
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke={strokeColor}
    height={dimension}
    width={dimension}
  >
    {markup}
  </svg>