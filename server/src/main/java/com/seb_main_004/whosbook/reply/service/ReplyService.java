package com.seb_main_004.whosbook.reply.service;


import com.seb_main_004.whosbook.curation.entity.Curation;
import com.seb_main_004.whosbook.curation.service.CurationService;
import com.seb_main_004.whosbook.exception.BusinessLogicException;
import com.seb_main_004.whosbook.exception.ExceptionCode;
import com.seb_main_004.whosbook.member.entity.Member;
import com.seb_main_004.whosbook.member.service.MemberService;
import com.seb_main_004.whosbook.reply.dto.ReplyPatchDto;
import com.seb_main_004.whosbook.reply.dto.ReplyPostDto;
import com.seb_main_004.whosbook.reply.entity.Reply;
import com.seb_main_004.whosbook.reply.repository.ReplyRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ReplyService {

    private final ReplyRepository replyRepository;

    private final MemberService memberService;

    private final CurationService curationService;

    public ReplyService(ReplyRepository replyRepository, MemberService memberService, CurationService curationService) {
        this.replyRepository = replyRepository;
        this.memberService = memberService;
        this.curationService = curationService;
    }

    //댓글작성
    public Reply createReply(ReplyPostDto replyPostDto, String userEmail, Curation findCurationId){

        //로그인한 사용자인지아닌지 검증
        Member findEmail= memberService.findVerifiedMemberByEmail(userEmail);

        //큐레이션 아이디,작성자이메일을저장하기위한 댓글객체 생성
        Reply reply= new Reply();

        reply.setContent(replyPostDto.getContent());
        reply.setMember(findEmail);
        reply.setCuration(findCurationId);

        Reply postReply=replyRepository.save(reply);

        //댓글저장
        return  postReply;

    }
    //댓글 수정
    public Reply updateReply(ReplyPatchDto replyPatchDto, long replyId, String userEmail) {

        Reply findReply= findVerifiedReply(replyId);

        verifyUser(userEmail,findReply);

        Optional.ofNullable(replyPatchDto.getContent()).ifPresent(findReply::setContent);

        return replyRepository.save(findReply);

    }
   //댓글 삭제
    public void deleteReply(long replyId, String userEmail) {

         Reply findReply= findVerifiedReply(replyId); //유효한 댓글인지 검증

         verifyUser(userEmail,findReply);

         replyRepository.delete(findReply);

    }
    //입력된 댓글이 유효한지 검증
    public Reply findVerifiedReply(long replyId){

        Optional<Reply> reply= replyRepository.findById(replyId);

        return reply.orElseThrow(()-> new BusinessLogicException(ExceptionCode.REPLY_NOT_FOUND));
    }

    //입렫된 댓글이 findReply의 회원과 로그인된 회원이 일치하는지 확인
    private void verifyUser(String userEmail, Reply reply) {

        if(!reply.getMember().getEmail().equals(userEmail)){
            throw  new BusinessLogicException(ExceptionCode.MEMBER_DOES_NOT_MATCH);
        }

    }

    public Page<Reply> getReplyList(int page, int size,
                                   Curation findCurationId) {

        //큐레이션에 해당하는 id를 가져와서 데이터를 뿌려준다.
        return replyRepository.findByCuration(findCurationId,
                PageRequest.of(page, size, Sort.by("createdAt").descending()));


    }
}
