package com.seb_main_004.whosbook.reply.mapper;

import com.seb_main_004.whosbook.reply.dto.ReplyPatchDto;
import com.seb_main_004.whosbook.reply.dto.ReplyPostDto;
import com.seb_main_004.whosbook.reply.dto.ReplyResponseDto;
import com.seb_main_004.whosbook.reply.entity.Reply;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReplyMapper {
    ReplyPostDto replyToPostDtoToReply(ReplyPostDto replyPostDto);

    @Mapping(source = "member.memberId",target = "memberId")
    @Mapping(source = "member.nickname",target = "nickname")
    @Mapping(source = "member.imageUrl",target = "imageUrl")
    ReplyResponseDto replyToReplyResponseDto(Reply reply);

    ReplyPatchDto replyToPatchToReply(ReplyPatchDto replyPatchDto);

    List<ReplyResponseDto> replyToReplyResponseDto(List<Reply> replyList);
}
