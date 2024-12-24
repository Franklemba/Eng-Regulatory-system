const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
require('dotenv').config();	
// Configure AWS SDK
aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Replace with your access key ID
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Replace with your secret access key
    region: process.env.AWS_REGION // Replace with your region
});

// Create S3 instance
const s3 = new aws.S3();

const applicationMimeType = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/bmp',
    'image/webp'
];

// Configure multer-s3 storage
const storage = multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME, // Replace with your S3 bucket name
    acl: 'public-read', // Set the appropriate permissions
    key: function(req, file, cb) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // Replace ':' and '.' to make it a valid filename
        const extension = path.extname(file.originalname);
        const productName = `uploaded-${timestamp}${extension}`;
        cb(null, productName);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        if (applicationMimeType.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new Error('Invalid file type'), false);
        }
    }
});

module.exports = upload;
