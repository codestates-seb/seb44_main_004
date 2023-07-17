import { CuratorProps } from '../../types/card';
import { useEffect, useState } from 'react';
import { getSubscribersAPI } from '../../api/profileApi';
import ProfileLoading from './ProfileLoading';
import ProfileCard from './ProfileCard';

const CuraotrList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //   const { nickname } = useSelector((state: RootState) => state.user);
  const [subscribers, setSubscribers] = useState<Array<CuratorProps>>([]);
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
  console.log(subscribers);
  return (
    <>
      {subscribers.length == 0 ? (
        <div>아직 구독한 큐레이터가 없습니다.</div>
      ) : isLoading ? (
        <>
          <ProfileLoading loading={isLoading} />
        </>
      ) : (
        <>
          {totalSubscribers}명의 큐레이터
          <ProfileCard
            curators={subscribers}
            totalPage={totalSubscriberPage}
            page={subscriberPage}
            handlePageChange={handleCuratorPageChange}
          />
        </>
      )}
    </>
  );
};
export default CuraotrList;
