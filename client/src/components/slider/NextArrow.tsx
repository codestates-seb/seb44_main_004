interface StyleProps {
  style: {
    color: string;
  };
}

interface IProps {
  className?: string;
  style?: StyleProps;
  onClick?: () => void;
}

const NextArrow = ({ className, style, onClick }: IProps) => {
  return (
    <div
      className={className}
      style={{ ...style, backgroundColor: 'gray', borderRadius: '50%' }}
      onClick={onClick}
    />
  );
};

export default NextArrow;
