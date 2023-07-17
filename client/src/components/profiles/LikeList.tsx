import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../store/store';
import { UserPageType } from '../../types';
import { CurationProps } from '../../types/card';
import { getWrittenCuratoionsAPI } from '../../api/profileApi';
import ProfileCuration from './ProfileCard';
interface LikeListProps {
  type: UserPageType;
}
const LikeList = ({ type }: LikeListProps) => {
  const { nickname } = useSelector((state: RootState) => state.user);
  const [likeCurations, setLikeCurations] = useState<Array<CurationProps>>();
  const [totalLikeCurations, setTotalLikeCurations] = useState<number>(0);
  const [likePage, setLikePage] = useState<number>(0);
  const [totalLikePage, setTotalLikePage] = useState<number>(0);

  const SIZE = 10;

  //내가 좋아요한 큐레이션 조회
  const handleGetLikeCurations = async () => {
    const response =
      type === UserPageType.MYPAGE && (await getWrittenCuratoionsAPI(likePage + 1, SIZE));
    // : await getUserWrittenCurationsAPI(Number(memberId), writtenPage + 1, SIZE);
    if (response) {
      setLikeCurations(response.data.data);
      setTotalLikeCurations(response.data.pageInfo.totalElement);
      setTotalLikePage(response.data.pageInfo.totalPages);
    }
  };
  const handleLikePageChange = (selectedItem: { selected: number }) => {
    setLikePage(selectedItem.selected);
    handleGetLikeCurations();
  };

  useEffect(() => {
    handleGetLikeCurations();
  }, [likePage]);

  return (
    <>
      {totalLikeCurations} 개의 큐레이션
      <ProfileCuration
        type={UserPageType.MYPAGE}
        nickname={nickname}
        curations={likeCurations}
        totalPage={totalLikePage}
        page={likePage}
        handlePageChange={handleLikePageChange}
      />
    </>
  );
};
export default LikeList;
