package com.seb_main_004.whosbook.image.service;

import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
    String store(MultipartFile file, String imagePath);
    String makeObjectKey(MultipartFile file, String imagePath);
    void delete(String imageKey);
}
