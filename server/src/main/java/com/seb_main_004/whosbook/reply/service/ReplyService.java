package com.seb_main_004.whosbook.reply.service;


import com.seb_main_004.whosbook.exception.BusinessLogicException;
import com.seb_main_004.whosbook.exception.ExceptionCode;
import com.seb_main_004.whosbook.member.entity.Member;
import com.seb_main_004.whosbook.member.service.MemberService;
import com.seb_main_004.whosbook.reply.entity.Reply;
import com.seb_main_004.whosbook.reply.repository.ReplyRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ReplyService {

    private final ReplyRepository replyRepository;

    private final MemberService memberService;

    public ReplyService(ReplyRepository replyRepository, MemberService memberService) {
        this.replyRepository = replyRepository;
        this.memberService = memberService;
    }

    public Reply createReply(Reply reply, String userEmail){

        //로그인한 사용자인지아닌지 검증
        Member findEmail= memberService.findVerifiedMemberByEmail(userEmail);

        //큐레이션 아이디를 가져옴(연관관계맵핑후 추후 로직 추가 예정)

        //reply와 member의 연관관계매핑을 통해 reply에 회원을 추가해야함.

        //댓글저장
        Reply savedReply= replyRepository.save(reply);

        return  savedReply;

    }

    public Reply updateReply(Reply reply,String userEmail) {

        Member findEmail= memberService.findVerifiedMemberByEmail(userEmail);
        //큐레이션 아이디를 가져옴(연관관계맵핑후 추후 로직 추가 예정)

        //reply와 member의 연관관계매핑을 통해 reply에 회원을 추가해야함.

        Reply updateReply= replyRepository.save(reply);

        return updateReply;

    }

    public void deleteReply(long replyId, String userEmail) {

         Reply findReply= findVerifiedReply(replyId); //유효한 댓글인지 검증

         replyRepository.delete(findReply);

    }
    //입력된 댓글이 유효한지 검증
    public Reply findVerifiedReply(long replyId){

        Optional<Reply> reply= replyRepository.findById(replyId);

        return reply.orElseThrow(()-> new BusinessLogicException(ExceptionCode.REPLY_NOT_FOUND));
    }

    //입렫된 댓글이 findReply의 회원과 로그인된 회원이 일치하는지 확
    private void verifyUser(String userEmail, Reply reply) {

        //큐레이션과 회원의 연관관계맵핑후 설정

    }
}
