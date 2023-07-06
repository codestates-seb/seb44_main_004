package com.seb_main_004.whosbook.reply.controller;

import com.seb_main_004.whosbook.reply.dto.ReplyPostDto;
import com.seb_main_004.whosbook.reply.entity.Reply;
import com.seb_main_004.whosbook.reply.mapper.ReplyMapper;
import com.seb_main_004.whosbook.reply.service.ReplyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/curations")
public class ReplyController {

    private final ReplyService replyService;
    private final ReplyMapper replyMapper;

    public ReplyController(ReplyService replyService, ReplyMapper replyMapper) {
        this.replyService = replyService;
        this.replyMapper = replyMapper;
    }

    @PostMapping("replys")
    public ResponseEntity postReply(@Valid @RequestBody ReplyPostDto replyPostDto, Authentication authentication){

        String userEmail= authentication.getPrincipal().toString();

        Reply reply= replyService.createReply(replyMapper.replyToPostDtoToReply(replyPostDto), userEmail);

        return new ResponseEntity(replyMapper.replyToReplyResponseDto(reply), HttpStatus.CREATED);


    }


}
