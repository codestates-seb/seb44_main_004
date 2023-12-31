package com.seb_main_004.whosbook.auth.userdetails;

import com.seb_main_004.whosbook.auth.utils.CustomAuthorityUtils;
import com.seb_main_004.whosbook.exception.BusinessLogicException;
import com.seb_main_004.whosbook.exception.ExceptionCode;
import com.seb_main_004.whosbook.member.entity.Member;
import com.seb_main_004.whosbook.member.repository.MemberRepository;
import com.seb_main_004.whosbook.member.service.MemberService;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;

@Component
public class MemberDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    private final CustomAuthorityUtils authorityUtils;

    private  final MemberService memberService;

    public MemberDetailsService(MemberRepository memberRepository, CustomAuthorityUtils authorityUtils, MemberService memberService) {
        this.memberRepository = memberRepository;
        this.authorityUtils = authorityUtils;
        this.memberService = memberService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        //Optional<Member> optionalMember= memberRepository.findByEmail(username);


        Member verifiedMemberByEmail = memberService.findVerifiedMemberByEmail(username);

        return  new MemberDetails(verifiedMemberByEmail);
    }



    private final class MemberDetails extends  Member implements  UserDetails{

        //Member의 데이터를 가져오는 부분
        MemberDetails(Member member){

            setMemberId(member.getMemberId());
            setNickname(member.getNickname());
            setImageUrl(member.getImageUrl());
            setEmail(member.getEmail());
            setPassword(member.getPassword());
            setRoles(member.getRoles());
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return authorityUtils.createAuthorities(this.getRoles());
        }

        @Override
        public String getUsername() {
            return getEmail();
        }


        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }
}
