import PropTypes from 'prop-types'
import React, { memo } from 'react'
import {
  Defs,
  Ellipse,
  G,
  Line,
  LinearGradient,
  Path,
  Polygon,
  Polyline,
  RadialGradient,
  Rect,
  Stop,
  Svg,
  Symbol,
  Use,
  Circle as _Circle,
  Text as _Text,
} from 'react-native-svg'

import { IconProps } from '../IconProps'
import { themed } from '../themed'

const Icon = (props) => {
  const { color = 'black', size = 24, ...otherProps } = props
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={`${color}`}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...otherProps}
    >
      <Path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4" stroke={`${color}`} />
      <Path
        d="M5 19.5C5.5 18 6 15 6 12c0-.7.12-1.37.34-2"
        stroke={`${color}`}
      />
      <Path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" stroke={`${color}`} />
      <Path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" stroke={`${color}`} />
      <Path d="M8.65 22c.21-.66.45-1.32.57-2" stroke={`${color}`} />
      <Path d="M14 13.12c0 2.38 0 6.38-1 8.88" stroke={`${color}`} />
      <Path d="M2 16h.01" stroke={`${color}`} />
      <Path d="M21.8 16c.2-2 .131-5.354 0-6" stroke={`${color}`} />
      <Path d="M9 6.8a6 6 0 0 1 9 5.2c0 .47 0 1.17-.02 2" stroke={`${color}`} />
    </Svg>
  )
}

Icon.displayName = 'Fingerprint'

export const Fingerprint = memo<IconProps>(themed(Icon))
