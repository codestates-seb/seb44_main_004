package com.seb_main_004.whosbook.subscribe.service;

import com.seb_main_004.whosbook.auth.utils.CustomAuthorityUtils;
import com.seb_main_004.whosbook.exception.BusinessLogicException;
import com.seb_main_004.whosbook.exception.ExceptionCode;
import com.seb_main_004.whosbook.member.entity.Member;
import com.seb_main_004.whosbook.member.repository.MemberRepository;
import com.seb_main_004.whosbook.subscribe.entity.Subscribe;
import com.seb_main_004.whosbook.subscribe.repository.SubscribeRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SubscribeService {
    private final SubscribeRepository subscribeRepository;
    private final MemberRepository memberRepository;
    public SubscribeService(SubscribeRepository subscribeRepository, MemberRepository memberRepository) {
        this.subscribeRepository = subscribeRepository;
        this.memberRepository = memberRepository;
    }

    public void createSubscribe(long subscribedMemberId, String authenticatedEmail) {
        Member subscriber = findVerifiedMemberByEmail(authenticatedEmail);
        Member subscribingMember = findVerifiedMemberByMemberId(subscribedMemberId);

        Subscribe subscribe = new Subscribe();
        Optional<Subscribe> optionalSubscribe = subscribeRepository.findBySubscriberAndSubscribedMember(subscriber, subscribingMember);

        if (optionalSubscribe.isPresent()) {
            subscribe = optionalSubscribe.get();

            if(subscribe.getSubscribeStatus() == Subscribe.SubscribeStatus.SUBSCRIBE_ACTIVE){
                throw new BusinessLogicException(ExceptionCode.SUBSCRIBE_HAS_BEEN_ACTIVE);
            }
        } else {
            subscribe.setSubscriber(subscriber);
            subscribe.setSubscribedMember(subscribingMember);
        }

        subscribe.setSubscribeStatus(Subscribe.SubscribeStatus.SUBSCRIBE_ACTIVE);
        subscribeRepository.save(subscribe);
    }

    public void deleteSubscribe(long subscribedMemberId, String authenticatedEmail) {
        Member subscriber = findVerifiedMemberByEmail(authenticatedEmail);
        Member subscribingMember = findVerifiedMemberByMemberId(subscribedMemberId);
        Optional<Subscribe> optionalSubscribe = subscribeRepository.findBySubscriberAndSubscribedMember(subscriber, subscribingMember);
        Subscribe subscribe= optionalSubscribe.orElseThrow(()-> new BusinessLogicException(ExceptionCode.SUBSCRIBE_NOT_FOUND));


        if(subscribe.getSubscribeStatus() == Subscribe.SubscribeStatus.SUBSCRIBE_NON_ACTIVE)
            throw new BusinessLogicException(ExceptionCode.SUBSCRIBE_HAS_BEEN_NON_ACTIVE);

        subscribe.setSubscribeStatus(Subscribe.SubscribeStatus.SUBSCRIBE_NON_ACTIVE);
        subscribeRepository.save(subscribe);
    }

    public Member findVerifiedMemberByEmail(String email){
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        return optionalMember.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND)
        );
    }

    public Member findVerifiedMemberByMemberId(long memberId){
        Optional<Member> optionalMember = memberRepository.findByMemberId(memberId);
        return optionalMember.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND)
        );
    }


}
