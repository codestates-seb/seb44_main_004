import { frontError } from '../../utils/importImgUrl';

const ServerError = () => {
  return (
    <div>
      <img src={frontError} alt="404 error page" />
    </div>
  );
};

export default ServerError;
