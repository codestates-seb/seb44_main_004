package com.seb_main_004.whosbook.exception;

import lombok.Getter;

public enum ExceptionCode {
    USER_NOT_FOUND(404,"사용자를 찾을 수 없습니다."),
    USER_EXISTS(409,"사용자가 이미 존재 합니다."),
    USER_NO_HAVE_AUTHORIZATION(401,"인증되지 않은 사용자입니다."),
    USERS_NOT_VALID(409, "등록되지 않은 사용자입니다."),
    INVALID_USER_STATUS(400,"잘못된 사용자 상태입니다."),
    USER_DOES_NOT_MATCH(403,"사용자가 맞지 않습니다."),
    QUESTION_NOT_FOUND(404,"질문을 찾을 수 없습니다."),
    QUESTION_CANNOT_CHANGE(403,"질문을 수정 할 수 없습니다."),
    QUESTION_CANNOT_DELETE(403,"질문을 삭제 할 수 없습니다."),
    QUESTION_HAS_BEEN_DELETED(403,"질문이 삭제 되었습니다."),
    ANSWER_NOT_FOUND(404,"답변을 찾을 수 없습니다."),
    ANSWER_EXISTS(409, "답변이 이미 존재 합니다."),
    ANSWER_CANNOT_CHANGE(403,"답변을 수정 할 수 없습니다."),
    ANSWER_CANNOT_DELETE(403,"답변을 삭제 할 수 없습니다."),
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
