import Svg, { Circle, Path, SvgProps } from 'react-native-svg';

export const HomeFillVector = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M4 10.5L12 4L20 10.5V19C20 19.5523 19.5523 20 19 20H15C14.4477 20 14 19.5523 14 19V15C14 14.4477 13.5523 14 13 14H11C10.4477 14 10 14.4477 10 15V19C10 19.5523 9.55228 20 9 20H5C4.44772 20 4 19.5523 4 19V10.5Z"
      fill={props.color ?? '#000'}
    />
  </Svg>
);

export const HomeOutlineVector = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M4 10.5L12 4L20 10.5V19C20 19.5523 19.5523 20 19 20H15C14.4477 20 14 19.5523 14 19V15C14 14.4477 13.5523 14 13 14H11C10.4477 14 10 14.4477 10 15V19C10 19.5523 9.55228 20 9 20H5C4.44772 20 4 19.5523 4 19V10.5Z"
      stroke={props.color ?? '#000'}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ProfileFillVector = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Circle cx={12} cy={7.5} r={3.5} fill={props.color ?? '#000'} />
    <Path
      d="M5 18.5C5 15.7386 7.68629 13.5 12 13.5C16.3137 13.5 19 15.7386 19 18.5"
      stroke={props.color ?? '#000'}
      strokeWidth={2.2}
      strokeLinecap="round"
    />
  </Svg>
);

export const ProfileOutlineVector = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Circle cx={12} cy={7.5} r={3.5} stroke={props.color ?? '#000'} strokeWidth={1.8} />
    <Path
      d="M5 18.5C5 15.7386 7.68629 13.5 12 13.5C16.3137 13.5 19 15.7386 19 18.5"
      stroke={props.color ?? '#000'}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  </Svg>
);

export const DiscoverVector = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Circle cx={12} cy={12} r={8.5} stroke={props.color ?? '#000'} strokeWidth={1.8} />
    <Path
      d="M14.8 9.2L12.9 13L9.2 14.8L11.1 11L14.8 9.2Z"
      stroke={props.color ?? '#000'}
      strokeWidth={1.8}
      strokeLinejoin="round"
    />
  </Svg>
);
