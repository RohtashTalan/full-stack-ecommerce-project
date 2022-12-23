import s3 from "../config/s3.config";

// upload the file to aws s3 bucket
export const s3FileUpload = async ({ bucketName, key, body, contentType }) => {
  return await s3
    .upload({
      Bucket: bucketName,
      key: key,
      Body: body,
      ContentType: contentType,
    })
    .promise();
};

// delete file from aws bucket
export const deleteFile = async ({ bucketName, key }) => {
  return await s3
    .deleteObject({
      Bucket: bucketName,
      key: key,
    })
    .promise();
};
