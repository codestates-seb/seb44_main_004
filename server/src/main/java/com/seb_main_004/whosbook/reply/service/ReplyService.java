package com.seb_main_004.whosbook.reply.service;


import com.seb_main_004.whosbook.member.entity.Member;
import com.seb_main_004.whosbook.member.service.MemberService;
import com.seb_main_004.whosbook.reply.entity.Reply;
import com.seb_main_004.whosbook.reply.repository.ReplyRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ReplyService {

    private final ReplyRepository replyRepository;

    private final MemberService memberService;

    public ReplyService(ReplyRepository replyRepository, MemberService memberService) {
        this.replyRepository = replyRepository;
        this.memberService = memberService;
    }

    public Reply createReply(Reply reply, String userEmail){

        //로그인한 사용자인지아닌지 검증(추후 로직 추가 예정)

        //Member member= memberService.

        //큐레이션 아이디를 가져옴(연관관계맵핑후 추후 로직 추가 예정)

        //댓글저장
        Reply savedReply= replyRepository.save(reply);

        return  savedReply;

    }
}
