package com.seb_main_004.whosbook.reply.repository;

import com.seb_main_004.whosbook.curation.entity.Curation;
import com.seb_main_004.whosbook.reply.entity.Reply;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReplyRepository extends JpaRepository<Reply,Long> {
    Page<Reply> findByCuration(Curation findCurationId, Pageable pageable);
}
