import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import ProfileCuration from './ProfileCard';
import ClockLoading from '../Loading/ClockLoading';
import { UserPageType } from '../../types';
import { CurationProps } from '../../types/card';
import { getLikeCuratoionsAPI, getUserLikeCurationsAPI } from '../../api/profileApi';
import { Comment } from './WrittenList';
import { itemsPerSize } from '../../types';

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
  const [searchParmas] = useSearchParams();
  const pageParm = searchParmas.get('page');

  const { memberId } = useParams();

  const [likeCurations, setLikeCurations] = useState<CurationProps[] | null>(null);
  const [totalLikeCurations, setTotalLikeCurations] = useState<number>(0);
  const [likePage, setLikePage] = useState<number>((Number(pageParm) - 1) | 0);
  const [totalLikePage, setTotalLikePage] = useState<number>(0);

  const navigate = useNavigate();
  const handleGetLikeCurations = async () => {
    try {
      setIsLoading(true);

      const response =
        type === UserPageType.MYPAGE
          ? await getLikeCuratoionsAPI(likePage + 1, itemsPerSize)
          : await getUserLikeCurationsAPI(Number(memberId), likePage + 1, itemsPerSize);
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

  const handleLikePageChange = (selectedItem: { selected: number }) => {
    const selectedPage = selectedItem.selected;
    setLikePage(selectedPage);

    if (type === UserPageType.MYPAGE) {
      navigate(`/mypage/like?page=${selectedPage + 1}&size=${itemsPerSize}`);
    } else {
      navigate(`/userpage/${memberId}/like?page=${selectedPage + 1}&size=${itemsPerSize}`);
    }
  };
  useEffect(() => {
    handleGetLikeCurations();
  }, [likePage]);

  useEffect(() => {
    setLikePage(Number(pageParm) - 1);
  }, [pageParm]);

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
