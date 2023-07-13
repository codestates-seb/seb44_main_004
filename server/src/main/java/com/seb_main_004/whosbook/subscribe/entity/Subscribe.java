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

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private SubscribeStatus subscribeStatus = SubscribeStatus.SUBSCRIBE_NON_ACTIVE;

    // 구독자(구독한 유저)
    @JoinColumn(name = "subscriber")
    @ManyToOne
    private Member subscriber;

    // 인플루언서(구독당한 유저)
    @JoinColumn(name = "subscribedMember")
    @ManyToOne
    private Member subscribedMember;

    @Getter
    public enum SubscribeStatus{

        SUBSCRIBE_ACTIVE("구독중"),
        SUBSCRIBE_NON_ACTIVE("구독취소");

        @Getter
        @Setter
        private String status;

        SubscribeStatus(String status) {
            this.status = status;
        }
    }
}
