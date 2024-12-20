// logger.js
const logger = {
    info: (message, meta = {}) => {
        console.log(message);
        if (Object.keys(meta).length > 0) {
            console.log(JSON.stringify(meta, null, 2));
        }
    },
    error: (message, error) => {
        console.error(message);
        if (error) {
            console.error(JSON.stringify(error, null, 2));
        }
    }
};

module.exports = {logger};