import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import ProfileCard from './ProfileCard';
import ClockLoading from '../Loading/ClockLoading';
import { CuratorProps } from '../../types/card';
import { getSubscribersAPI } from '../../api/profileApi';
import { Comment } from './WrittenList';
import { itemsPerSize } from '../../types';

const loadingStyle = {
  height: '15vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const CuraotrList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchParmas] = useSearchParams();
  const pageParm = searchParmas.get('page');

  const [subscribers, setSubscribers] = useState<CuratorProps[] | null>(null);
  const [totalSubscribers, setTotalSubscribers] = useState<number>(0);
  const [subscriberPage, setSubscriberPage] = useState<number>((Number(pageParm) - 1) | 0);
  const [totalSubscriberPage, setTotalSubscriberPage] = useState<number>(0);

  const navigate = useNavigate();

  const handleGetSubscribers = async () => {
    try {
      setIsLoading(true);
      const response = await getSubscribersAPI(subscriberPage + 1, itemsPerSize);
      if (response) {
        setSubscribers(response.data.data);
        setTotalSubscribers(response.data.pageInfo.totalElement);
        setTotalSubscriberPage(response.data.pageInfo.totalPages);
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCuratorPageChange = async (selectedItem: { selected: number }) => {
    const selectedPage = selectedItem.selected;
    setSubscriberPage(selectedPage);
    navigate(`/mypage/subscribe?page=${selectedPage + 1}&size=${itemsPerSize}`);
  };

  useEffect(() => {
    handleGetSubscribers();
  }, [subscriberPage]);

  useEffect(() => {
    setSubscriberPage(Number(pageParm) - 1);
  }, [pageParm]);
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
        <Comment>아직 구독한 큐레이터가 없어요 😂</Comment>
      )}
    </>
  );
};
export default CuraotrList;
