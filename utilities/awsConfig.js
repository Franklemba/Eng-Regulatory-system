const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
require('dotenv').config();

// Configure S3 Client with AWS SDK v3
const s3Client = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_REGION
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

// Configure multer-s3 storage with AWS SDK v3
const storage = multerS3({
    s3: s3Client,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    // acl: 'public-read',
    key: function(req, file, cb) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const extension = path.extname(file.originalname);
        const docName = `uploaded-${timestamp}${extension}`;
        cb(null, docName);
    }
});

// Rest of your code remains the same
const uploadConfig = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        if (applicationMimeType.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new Error('Invalid file type'), false);
        }
    }
});

const upload = {
    single: (fieldName) => uploadConfig.single(fieldName),
    array: (fieldName, maxCount) => uploadConfig.array(fieldName, maxCount),
    fields: (fields) => uploadConfig.fields(fields)
};

module.exports = upload;