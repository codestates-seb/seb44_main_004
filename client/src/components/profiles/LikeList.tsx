import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProfileLoading from './ProfileLoading';
import ProfileCuration from './ProfileCard';
import { UserPageType } from '../../types';
import { CurationProps } from '../../types/card';
import { getLikeCuratoionsAPI, getUserLikeCurationsAPI } from '../../api/profileApi';

interface LikeListProps {
  type: UserPageType;
}
const LikeList = ({ type }: LikeListProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { memberId } = useParams();

  const [likeCurations, setLikeCurations] = useState<Array<CurationProps>>();
  const [totalLikeCurations, setTotalLikeCurations] = useState<number>(0);
  const [likePage, setLikePage] = useState<number>(0);
  const [totalLikePage, setTotalLikePage] = useState<number>(0);

  const SIZE = 10;

  //내가 좋아요한 큐레이션 조회
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
  const handleLikePageChange = (selectedItem: { selected: number }) => {
    const selectedPage = selectedItem.selected;
    setLikePage(selectedPage);
  };

  useEffect(() => {
    handleGetLikeCurations();
  }, [likePage]);

  return (
    <>
      {likeCurations === undefined ? (
        <div>아직 좋아요한 큐레이션이 없습니다.</div>
      ) : isLoading ? (
        <>
          <ProfileLoading loading={isLoading} />
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
