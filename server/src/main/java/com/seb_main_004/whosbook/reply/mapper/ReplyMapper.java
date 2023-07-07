package com.seb_main_004.whosbook.reply.mapper;

import com.seb_main_004.whosbook.reply.dto.ReplyPatchDto;
import com.seb_main_004.whosbook.reply.dto.ReplyPostDto;
import com.seb_main_004.whosbook.reply.dto.ReplyResponseDto;
import com.seb_main_004.whosbook.reply.entity.Reply;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ReplyMapper {
    Reply replyToPostDtoToReply(ReplyPostDto replyPostDto);

    ReplyResponseDto replyToReplyResponseDto(Reply reply);

    Reply replyToPatchToReply(ReplyPatchDto replyPatchDto);
}
