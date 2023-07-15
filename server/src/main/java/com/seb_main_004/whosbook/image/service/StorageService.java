package com.seb_main_004.whosbook.image.service;

import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
    String store(MultipartFile file, String imageKey);
    String makeObjectKey(MultipartFile multipartFile, String imagePath, long memberId);
    void delete(String imageKey);
}
