package com.seb_main_004.whosbook.image.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

@Service
@Slf4j
@RequiredArgsConstructor
public class S3StorageService implements StorageService{
    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;
    private final AmazonS3Client s3Client;
    @Override
    public String store(MultipartFile file, String imagePath) {
        // S3 object key 생성
        String key = makeS3ObjectKey(file, imagePath);

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(file.getContentType());

        try(InputStream inputStream = file.getInputStream()) {
           PutObjectResult result = s3Client.putObject(new PutObjectRequest(bucketName, key,inputStream, objectMetadata));
           log.info("# 업로드에 성공했습니다. 이미지 정보 : {}", result.getETag());
           return s3Client.getUrl(bucketName, key).toString();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private String makeS3ObjectKey(MultipartFile file, String imagePath){
        final String fileName = file.getOriginalFilename();
        return imagePath.concat("/").concat(fileName);
    }
}
