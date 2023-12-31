package com.seb_main_004.whosbook.subscribe.entity;

import com.seb_main_004.whosbook.member.entity.Member;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Data
public class Subscribe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long subscribeId;

    // 구독자(구독한 유저)
    @JoinColumn(name = "subscriber")
    @ManyToOne
    private Member subscriber;

    // 인플루언서(구독당한 유저)
    @JoinColumn(name = "subscribedMember")
    @ManyToOne
    private Member subscribedMember;
}
