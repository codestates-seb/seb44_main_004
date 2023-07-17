import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../store/store';
import { UserPageType } from '../../types';
import { CurationProps } from '../../types/card';
import { getWrittenCuratoionsAPI, getUserWrittenCurationsAPI } from '../../api/profileApi';
import ProfileCuration from './ProfileCard';

interface WrittenListProps {
  type: UserPageType;
}

const WrittenList = ({ type }: WrittenListProps) => {
  const { usernickname } = useSelector((state: RootState) => state.nickanme);
  const { nickname } = useSelector((state: RootState) => state.user);
  const { memberId } = useParams();

  const [writtenCurations, setWrittenCurations] = useState<Array<CurationProps>>();
  const [totalWirttenCurations, setTotalWirttenCurations] = useState<number>(0);
  const [writtenPage, setWrittenPage] = useState<number>(0);
  const [totalWrittenPage, setTotalWrittenPage] = useState<number>(0);

  const SIZE = 10;
  //내가 쓴 큐레이션 조회
  const handleGetWrittenCurations = async () => {
    const response =
      type === UserPageType.MYPAGE
        ? await getWrittenCuratoionsAPI(writtenPage + 1, SIZE)
        : await getUserWrittenCurationsAPI(Number(memberId), writtenPage + 1, SIZE);

    if (response) {
      setWrittenCurations(response.data.data);
      setTotalWirttenCurations(response.data.pageInfo.totalElement);
      setTotalWrittenPage(response.data.pageInfo.totalPages);
    }
  };
  const handleWrittenPageChange = async (selectedItem: { selected: number }) => {
    const selectedPage = selectedItem.selected;
    setWrittenPage(selectedPage);
  };

  useEffect(() => {
    handleGetWrittenCurations();
  }, [writtenPage]);
  return (
    <>
      {totalWirttenCurations} 개의 큐레이션
      <ProfileCuration
        type={type}
        nickname={type === UserPageType.MYPAGE ? nickname : usernickname}
        curations={writtenCurations}
        totalPage={totalWrittenPage}
        page={writtenPage}
        handlePageChange={handleWrittenPageChange}
      />
    </>
  );
};
export default WrittenList;
