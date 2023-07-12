package com.seb_main_004.whosbook.image.utils;

import com.seb_main_004.whosbook.exception.BusinessLogicException;
import com.seb_main_004.whosbook.exception.ExceptionCode;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class ImageStorageUtils {
    private static final List<String> ACCEPT_IMG_EXTENSION = List.of("jpg", "png", "jpeg", "gif");
    public static void verifyImageExtension(MultipartFile image){
        // TODO : Apache Tika 같은 라이브러리로 파일 위변조 여부 확인 필요

        if (ACCEPT_IMG_EXTENSION.contains(getFileExtension(image)) == false) {
            throw new BusinessLogicException(ExceptionCode.FILE_EXTENSION_NOT_ACCEPTABLE);
        }
    }

    private static String getFileExtension(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        return fileName.substring(fileName.lastIndexOf(".") + 1);
    }
}
