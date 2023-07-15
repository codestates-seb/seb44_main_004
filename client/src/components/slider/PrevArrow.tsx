interface StyleProps {
  style: {
    color?: string;
    width?: string;
    height?: string;
    backgroundColor?: string;
  };
}
interface IProps {
  className?: string;
  style?: StyleProps;
  onClick?: () => void;
}

const PrevArrow = ({ className, style, onClick }: IProps) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        backgroundColor: 'gray',
        borderRadius: '50%',
      }}
      onClick={onClick}
    />
  );
};

export default PrevArrow;
