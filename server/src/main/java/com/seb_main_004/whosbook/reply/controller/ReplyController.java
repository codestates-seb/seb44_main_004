package com.seb_main_004.whosbook.reply.controller;

import com.seb_main_004.whosbook.curation.entity.Curation;
import com.seb_main_004.whosbook.curation.repository.CurationRepository;
import com.seb_main_004.whosbook.curation.service.CurationService;
import com.seb_main_004.whosbook.dto.MultiResponseDto;
import com.seb_main_004.whosbook.reply.dto.ReplyPatchDto;
import com.seb_main_004.whosbook.reply.dto.ReplyPostDto;
import com.seb_main_004.whosbook.reply.entity.Reply;
import com.seb_main_004.whosbook.reply.mapper.ReplyMapper;
import com.seb_main_004.whosbook.reply.service.ReplyService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/curations")
public class ReplyController {

    private final ReplyService replyService;
    private final ReplyMapper replyMapper;

    private final CurationService curationService;

    private final CurationRepository curationRepository;

    public ReplyController(ReplyService replyService, ReplyMapper replyMapper, CurationService curationService, CurationRepository curationRepository) {
        this.replyService = replyService;
        this.replyMapper = replyMapper;
        this.curationService = curationService;
        this.curationRepository = curationRepository;
    }

    //댓글 작성
    @PostMapping("/{curation-id}/replies")
    public ResponseEntity postReply(@Valid @PathVariable("curation-id") long curationId,
                                    @RequestBody ReplyPostDto replyPostDto,
                                    Authentication authentication){

        String userEmail= authentication.getPrincipal().toString();

        //큐레이션 글에 해당한는 curation-id찾기
        Curation findCurationId= curationService.findVerifiedCurationById(curationId);

        curationRepository.save(findCurationId);

        Reply reply= replyService.createReply(replyMapper.replyToPostDtoToReply(replyPostDto), userEmail, findCurationId);

        return new ResponseEntity(replyMapper.replyToReplyResponseDto(reply), HttpStatus.CREATED);


    }

    //댓글 수정
    @PatchMapping("replies/{reply-id}")
    public ResponseEntity updateReply(@Positive @PathVariable("reply-id") long replyId,@Valid @RequestBody
                                          ReplyPatchDto replyPatchDto,
                                      Authentication authentication){

        String userEmail= authentication.getPrincipal().toString();

        Reply patchReply= replyService.updateReply(replyMapper.replyToPatchToReply(replyPatchDto),replyId,userEmail);

        return new ResponseEntity(replyMapper.replyToReplyResponseDto(patchReply),HttpStatus.OK);

    }

    //댓글 삭제
    @DeleteMapping("replies/{reply-id}")
    public ResponseEntity deleteReply(@Positive @PathVariable("reply-id") long replyId,@Valid
                                      Authentication authentication){

        String userEmail= authentication.getPrincipal().toString();

        replyService.deleteReply(replyId,userEmail);

        return  new ResponseEntity(HttpStatus.NO_CONTENT);



    }

    //댓글조회
    @GetMapping("replies")
    public ResponseEntity getReplyList( @Positive @RequestParam("page")int page,
                                       @Positive @RequestParam("size") int size){


        Page<Reply> replyPage= replyService.getReplyList(page-1, size);

        List<Reply> replyList= replyPage.getContent();

        return  new ResponseEntity<>(
                new MultiResponseDto<>(replyMapper.replyToReplyResponseDto(replyList),
                        replyPage),
                HttpStatus.OK
        );


    }


}
