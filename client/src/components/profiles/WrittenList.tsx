import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProfileCuration from './ProfileCard';
import ClockLoading from '../Loading/ClockLoading';
import { UserPageType } from '../../types';
import { CurationProps } from '../../types/card';
import { getWrittenCuratoionsAPI, getUserWrittenCurationsAPI } from '../../api/profileApi';

interface WrittenListProps {
  type: UserPageType;
}
const loadingStyle = {
  width: '80vw',
  height: '15vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
const WrittenList = ({ type }: WrittenListProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { memberId } = useParams();

  const [writtenCurations, setWrittenCurations] = useState<Array<CurationProps>>();
  const [totalWirttenCurations, setTotalWirttenCurations] = useState<number>(0);
  const [writtenPage, setWrittenPage] = useState<number>(0);
  const [totalWrittenPage, setTotalWrittenPage] = useState<number>(0);

  const SIZE = 10;

  const handleGetWrittenCurations = async () => {
    setIsLoading(true);
    const response =
      type === UserPageType.MYPAGE
        ? await getWrittenCuratoionsAPI(writtenPage + 1, SIZE)
        : await getUserWrittenCurationsAPI(Number(memberId), writtenPage + 1, SIZE);

    if (response) {
      setWrittenCurations(response.data.data);
      setTotalWirttenCurations(response.data.pageInfo.totalElement);
      setTotalWrittenPage(response.data.pageInfo.totalPages);
      setIsLoading(false);
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
      {writtenCurations?.length === 0 ? (
        <div>아직 작성한 큐레이션이 없습니다.</div>
      ) : isLoading ? (
        <>
          <ClockLoading color="#3173f6" style={{ ...loadingStyle }} />
        </>
      ) : (
        <>
          {totalWirttenCurations} 개의 큐레이션
          <ProfileCuration
            type={UserPageType.MYPAGE}
            curations={writtenCurations}
            totalPage={totalWrittenPage}
            page={writtenPage}
            handlePageChange={handleWrittenPageChange}
          />
        </>
      )}
    </>
  );
};
export default WrittenList;
