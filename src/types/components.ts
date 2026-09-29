import { SvgProps } from 'react-native-svg';

export interface AppButtonProps {
  label: string;
  icon: React.FC<SvgProps>;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  flex?: boolean;
  reverse?: boolean;
  className?: string;
}
