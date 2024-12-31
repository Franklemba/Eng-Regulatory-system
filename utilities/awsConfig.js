const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
require('dotenv').config();

// Configure S3 Client with AWS SDK v3 including timeout and retry settings
const s3Client = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_REGION,
    requestHandler: {
        connectionTimeout: 30000, // 30 seconds
        socketTimeout: 60000      // 60 seconds
    },
    maxAttempts: 3,  // Number of retry attempts
    retryMode: 'adaptive'  // Use adaptive retry mode
});

const applicationMimeType = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.oasis.opendocument.text',
    'text/plain'
];

// Configure multer-s3 storage
const storage = multerS3({
    s3: s3Client,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    key: function(req, file, cb) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const extension = path.extname(file.originalname);
        const docName = `uploaded-${timestamp}${extension}`;
        cb(null, docName);
    }
});

// Create multer upload object with size limits
const uploadConfig = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: (req, file, callback) => {
        if (applicationMimeType.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new Error('Invalid file type'), false);
        }
    }
});

// Export with original structure
const upload = {
    single: (fieldName) => uploadConfig.single(fieldName),
    array: (fieldName, maxCount) => uploadConfig.array(fieldName, maxCount),
    fields: (fields) => uploadConfig.fields(fields)
};

module.exports = upload;