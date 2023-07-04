package com.seb_main_004.whosbook.stubdata;

import com.seb_main_004.whosbook.member.Member;

public class Stub {


    //Member클래스의 stub 메서드 예시
    static Member getStubMembers(){

        Member member= new Member();

        member.setMemberId(1L);
        member.setNickname("쥬댕");
        member.setEmail("jjj@naver.com");

        return member;
    }
}
