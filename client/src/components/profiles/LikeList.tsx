import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProfileCuration from './ProfileCard';
import ClockLoading from '../Loading/ClockLoading';
import { UserPageType } from '../../types';
import { CurationProps } from '../../types/card';
import { getLikeCuratoionsAPI, getUserLikeCurationsAPI } from '../../api/profileApi';

interface LikeListProps {
  type: UserPageType;
}
const loadingStyle = {
  width: '80vw',
  height: '15vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
const LikeList = ({ type }: LikeListProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { memberId } = useParams();

  const [likeCurations, setLikeCurations] = useState<Array<CurationProps>>();
  const [totalLikeCurations, setTotalLikeCurations] = useState<number>(0);
  const [likePage, setLikePage] = useState<number>(0); //force 강조된 페이지
  const [totalLikePage, setTotalLikePage] = useState<number>(0);

  const SIZE = 10;

  const handleGetLikeCurations = async () => {
    setIsLoading(true);
    const response =
      type === UserPageType.MYPAGE
        ? await getLikeCuratoionsAPI(likePage + 1, SIZE)
        : await getUserLikeCurationsAPI(Number(memberId), likePage + 1, SIZE);
    if (response) {
      setLikeCurations(response.data.data);
      setTotalLikeCurations(response.data.pageInfo.totalElement);
      setTotalLikePage(response.data.pageInfo.totalPages);
      setIsLoading(false);
    }
  };

  //active 버튼으로 변경하는 함수 핸들러
  const handleLikePageChange = (selectedItem: { selected: number }) => {
    const selectedPage = selectedItem.selected;
    setLikePage(selectedPage);
  };

  //다음 버튼클릭시 -> totalPages 수를 넘어가면 안됨
  const handleNextChange = () => {
    if (totalLikePage > likePage + 1) {
    }
    if (likePage != totalLikePage - 1) {
      setLikePage(likePage + 1);
    }
  };
  const handlePrevChange = () => {
    if (likePage !== 0) {
      setLikePage(likePage - 1);
    }
  };

  useEffect(() => {
    handleGetLikeCurations();
  }, [likePage]);

  return (
    <>
      {likeCurations?.length === 0 ? (
        <div>아직 좋아요한 큐레이션이 없습니다.</div>
      ) : isLoading ? (
        <>
          <ClockLoading color="#3173f6" style={{ ...loadingStyle }} />
        </>
      ) : (
        <>
          {totalLikeCurations} 개의 큐레이션
          <ProfileCuration
            type={UserPageType.MYPAGE}
            curations={likeCurations}
            totalPage={totalLikePage}
            page={likePage}
            handlePageChange={handleLikePageChange}
          />
        </>
      )}
    </>
  );
};
export default LikeList;
