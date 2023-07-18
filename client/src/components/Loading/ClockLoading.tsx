import { CSSProperties } from 'react';
import { ClockLoader } from 'react-spinners';

interface IProps {
  loading?: boolean;
  color: string;
  speedMultiplier?: number;
  style?: CSSProperties;
  size?: number | string;
}

const ClockLoading = ({ loading, color, speedMultiplier, style, size }: IProps) => {
  return (
    <div style={{ ...style }}>
      <ClockLoader loading={loading} color={color} speedMultiplier={speedMultiplier} size={size} />
    </div>
  );
};

export default ClockLoading;
