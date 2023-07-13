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

const PrevArrow = ({ className, style, onClick }: IProps) => {
  return (
    <div className={className} style={{ ...style, backgroundColor: 'skyblue' }} onClick={onClick} />
  );
};

export default PrevArrow;
