package com.seb_main_004.whosbook.image.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.seb_main_004.whosbook.exception.BusinessLogicException;
import com.seb_main_004.whosbook.exception.ExceptionCode;
import com.seb_main_004.whosbook.image.utils.ImageStorageUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

@Service
@Slf4j
@RequiredArgsConstructor
public class S3StorageService implements StorageService{
    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;
    private final AmazonS3Client s3Client;
    @Override
    public String store(MultipartFile file, String imageKey) {
        // S3 object key 생성

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(file.getContentType());

        try(InputStream inputStream = file.getInputStream()) {
           PutObjectResult result = s3Client.putObject(new PutObjectRequest(bucketName, imageKey,inputStream, objectMetadata));
           log.info("# 업로드에 성공했습니다. 이미지 정보 : {}", result.getETag());

           return URLDecoder.decode(s3Client.getUrl(bucketName, imageKey).toString(), StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new BusinessLogicException(ExceptionCode.IMAGE_UPLOAD_FAILED);
        }
    }

    @Override
    public String makeObjectKey(MultipartFile file, String imagePath, long memberId) {
        StringBuilder newFileName = new StringBuilder(imagePath);
        return newFileName
                .append("/")
                .append(memberId)
                .append("_")
                .append(System.currentTimeMillis())
                .append(ImageStorageUtils.getFileExtension(file))
                .toString();
    }

    @Override
    public void delete(String imageKey) {
        try {
            s3Client.deleteObject(bucketName, imageKey);
            log.info("# AWS S3 이미지가 삭제 되었습니다. 이미지명 : {}", imageKey);
        } catch (AmazonServiceException e) {
            log.error(e.getErrorMessage());
        }
    }

}
