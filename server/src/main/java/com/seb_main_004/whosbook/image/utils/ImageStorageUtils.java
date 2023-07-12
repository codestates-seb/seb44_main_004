package com.seb_main_004.whosbook.image.utils;

import com.seb_main_004.whosbook.exception.BusinessLogicException;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class ImageStorageUtils {
    private static final List<String> ACCEPT_IMG_EXTENSION = List.of("jpg", "png", "jpeg", "gif");
    public static void verifyImageExtension(MultipartFile image){
        if (ACCEPT_IMG_EXTENSION.contains(getFileExtension(image)) == false) {
        }
    }

    private static String getFileExtension(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        return fileName.substring(fileName.lastIndexOf(".") + 1);
    }
}
