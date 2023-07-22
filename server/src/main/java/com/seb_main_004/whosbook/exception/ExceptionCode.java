package com.seb_main_004.whosbook.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404,"인증에 실패했습니다."),
    JWT_EXPIRED(401, "이메일이 존재하지 않거나 비밀번호가 불일치합니다."),
    MEMBER_EXISTS(409,"사용자가 이미 존재 합니다."),
    MEMBER_HAS_BEEN_DELETED(404,"이미 탈퇴한 사용자입니다."),
    NICKNAME_EXISTS(409,"닉네임이 이미 존재 합니다."),
    MEMBER_NO_HAVE_AUTHORIZATION(401,"인증되지 않은 사용자입니다."),
    MEMBER_NOT_VALID(409, "등록되지 않은 사용자입니다."),
    MEMBER_DOES_NOT_MATCH(403,"사용자가 맞지 않습니다."),
    INVALID_MEMBER_STATUS(400,"잘못된 사용자 상태입니다."),
    CURATION_NOT_FOUND(404,"큐레이션을 찾을 수 없습니다."),
    CURATION_NOT_POST(404,"작성한 큐레이션이 없습니다."),
    CURATION_ACCESS_DENIED(403,"큐레이션을 열람 할 수 없습니다."),
    CURATION_CANNOT_CHANGE(403,"큐레이션을 수정 할 수 없습니다."),
    CURATION_CANNOT_DELETE(403,"큐레이션을 삭제 할 수 없습니다."),
    CURATION_HAS_BEEN_DELETED(404,"이미 삭제된 큐레이션입니다."),
    REPLY_NOT_FOUND(404,"댓글을 찾을 수 없습니다."),
    REPLY_CANNOT_CHANGE(403,"댓글을 수정 할 수 없습니다."),
    REPLY_CANNOT_DELETE(403,"댓글을 삭제 할 수 없습니다."),
    SUBSCRIBE_HAS_BEEN_ACTIVE(409, "이미 구독 중 입니다."),
    SUBSCRIBE_HAS_BEEN_NON_ACTIVE(404, "이미 구독취소 상태 입니다."),
    FILE_EXTENSION_NOT_ACCEPTABLE(415, "이미지 확장자만 등록 가능합니다."),
    IMAGE_NOT_FOUND(404, "이미지를 찾을 수 없습니다."),
    IMAGE_CAN_NOT_SAVE(403, "이미지를 저장 할 수 있는 권한이 없습니다."),
    IMAGE_UPLOAD_FAILED(500, "파일 업로드에 실패했습니다."),
    CATEGORY_NOT_FOUND(404, "카테고리를 찾을 수 없습니다."),
    NOT_IMPLEMENTATION(501,"Not Implementation");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }

}
