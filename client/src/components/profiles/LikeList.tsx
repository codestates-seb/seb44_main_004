import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ProfileCuration from './ProfileCard';
import ClockLoading from '../Loading/ClockLoading';
import { UserPageType } from '../../types';
import { CurationProps } from '../../types/card';
import { getLikeCuratoionsAPI, getUserLikeCurationsAPI } from '../../api/profileApi';
import { Comment } from './WrittenList';

interface LikeListProps {
  type: UserPageType;
}
const loadingStyle = {
  height: '15vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
const LikeList = ({ type }: LikeListProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { memberId } = useParams();
  const { page } = useParams();

  const userpage = location.pathname.split('/')[4];

  const [likeCurations, setLikeCurations] = useState<CurationProps[] | null>(null);
  const [totalLikeCurations, setTotalLikeCurations] = useState<number>(0);
  const [likePage, setLikePage] = useState<number>((Number(page) - 1) | 0);
  const [totalLikePage, setTotalLikePage] = useState<number>(0);

  const SIZE = 10;
  const navigate = useNavigate();
  const handleGetLikeCurations = async () => {
    try {
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
    } catch (err) {
      console.error(err);
    }
  };

  //active 버튼으로 변경하는 함수 핸들러
  const handleLikePageChange = (selectedItem: { selected: number }) => {
    const selectedPage = selectedItem.selected;
    setLikePage(selectedPage);
    if (type === UserPageType.MYPAGE) {
      navigate(`/mypage/like/${selectedPage + 1}`);
    } else {
      navigate(`/userpage/${memberId}/like/${selectedPage + 1}`);
    }
  };
  useEffect(() => {
    handleGetLikeCurations();
  }, [likePage]);

  useEffect(() => {
    if (type === UserPageType.USERPAGE) {
      if (userpage) {
        navigate(`/userpage/${memberId}/like/${userpage}`);
      } else {
        navigate(`/userpage/${memberId}/like/1`);
      }
    }
  }, []);
  return (
    <>
      {isLoading && !likeCurations?.length ? (
        <ClockLoading color="#3173f6" style={{ ...loadingStyle }} />
      ) : likeCurations?.length ? (
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
      ) : (
        <Comment>아직 좋아요한 큐레이션이 없어요 😂</Comment>
      )}
    </>
  );
};
export default LikeList;
