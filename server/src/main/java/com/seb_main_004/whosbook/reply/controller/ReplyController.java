package com.seb_main_004.whosbook.reply.controller;

import com.seb_main_004.whosbook.reply.dto.ReplyPatchDto;
import com.seb_main_004.whosbook.reply.dto.ReplyPostDto;
import com.seb_main_004.whosbook.reply.entity.Reply;
import com.seb_main_004.whosbook.reply.mapper.ReplyMapper;
import com.seb_main_004.whosbook.reply.service.ReplyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/curations")
public class ReplyController {

    private final ReplyService replyService;
    private final ReplyMapper replyMapper;

    public ReplyController(ReplyService replyService, ReplyMapper replyMapper) {
        this.replyService = replyService;
        this.replyMapper = replyMapper;
    }

    //댓글 작성
    @PostMapping("replys")
    public ResponseEntity postReply(@Valid @RequestBody ReplyPostDto replyPostDto,
                                    Authentication authentication){

        String userEmail= authentication.getPrincipal().toString();

        Reply reply= replyService.createReply(replyMapper.replyToPostDtoToReply(replyPostDto), userEmail);

        return new ResponseEntity(replyMapper.replyToReplyResponseDto(reply), HttpStatus.CREATED);


    }

    //댓글 수정
    @PatchMapping("replys/{reply-id}")
    public ResponseEntity updateReply(@Positive @PathVariable("reply-id") long replyId,@Valid @RequestBody
                                          ReplyPatchDto replyPatchDto,
                                      Authentication authentication){

        String userEmail= authentication.getPrincipal().toString();

        Reply patchReply= replyService.updateReply(replyMapper.replyToPatchToReply(replyPatchDto),userEmail);

        return new ResponseEntity(replyMapper.replyToReplyResponseDto(patchReply),HttpStatus.OK);

    }

    //댓글 삭제
    @DeleteMapping("replys/{reply-id}")
    public ResponseEntity deleteReply(@Positive @PathVariable("reply-id") long replyId,@Valid
                                      Authentication authentication){

        String userEmail= authentication.getPrincipal().toString();

        replyService.deleteReply(replyId,userEmail);

        return  new ResponseEntity(HttpStatus.NO_CONTENT);



    }


}
