package com.seb_main_004.whosbook.reply.mapper;

import com.seb_main_004.whosbook.reply.dto.ReplyPatchDto;
import com.seb_main_004.whosbook.reply.dto.ReplyPostDto;
import com.seb_main_004.whosbook.reply.dto.ReplyResponseDto;
import com.seb_main_004.whosbook.reply.entity.Reply;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ReplyMapper {
    ReplyPostDto replyToPostDtoToReply(ReplyPostDto replyPostDto);

    @Mapping(source = "member.memberId",target = "memberId")
    ReplyResponseDto replyToReplyResponseDto(Reply reply);

    ReplyPatchDto replyToPatchToReply(ReplyPatchDto replyPatchDto);
}
