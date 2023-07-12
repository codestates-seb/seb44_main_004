package com.seb_main_004.whosbook.subscribe.repository;

import com.seb_main_004.whosbook.member.entity.Member;
import com.seb_main_004.whosbook.subscribe.entity.Subscribe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SubscribeRepository extends JpaRepository<Subscribe, Long> {

    //구독한 멤버와 구독된 멤버 외래키를 통해 구독객체를 탐색
    Optional<Subscribe> findBySubscriberAndSubscribedMember(Member subscriber, Member subscribedMember);
    List<Subscribe> findBySubscriber(Member subscriber);

}
