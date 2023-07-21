import { useEffect, useState } from 'react';

import ProfileCard from './ProfileCard';
import ClockLoading from '../Loading/ClockLoading';
import { CuratorProps } from '../../types/card';
import { getSubscribersAPI } from '../../api/profileApi';

const loadingStyle = {
  height: '15vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const CuraotrList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [subscribers, setSubscribers] = useState<CuratorProps[] | null>(null);
  const [totalSubscribers, setTotalSubscribers] = useState<number>(0);
  const [subscriberPage, setSubscriberPage] = useState<number>(0);
  const [totalSubscriberPage, setTotalSubscriberPage] = useState<number>(0);

  const SIZE = 10;

  //내가 구독한 구독자 조회
  const handleGetSubscribers = async () => {
    setIsLoading(true);
    const response = await getSubscribersAPI(subscriberPage + 1, SIZE);
    if (response) {
      setSubscribers(response.data.data);
      setTotalSubscribers(response.data.pageInfo.totalElement);
      setTotalSubscriberPage(response.data.pageInfo.totalPages);
      setIsLoading(false);
    }
  };

  const handleCuratorPageChange = async (selectedItem: { selected: number }) => {
    const selectedPage = selectedItem.selected;
    setSubscriberPage(selectedPage);
  };

  useEffect(() => {
    handleGetSubscribers();
  }, [subscriberPage]);

  return (
    <>
      {isLoading && !subscribers?.length ? (
        <ClockLoading color="#3173f6" style={{ ...loadingStyle }} />
      ) : subscribers?.length ? (
        <>
          {totalSubscribers}명의 큐레이터
          <ProfileCard
            curators={subscribers}
            totalPage={totalSubscriberPage}
            page={subscriberPage}
            handlePageChange={handleCuratorPageChange}
          />
        </>
      ) : (
        <div>데이터가 없습니다..</div>
      )}
    </>
  );
};
export default CuraotrList;
