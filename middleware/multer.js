const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const destinationPath = `uploads/media/${year}/${month}/${day}`;

        // Create the destination folder if it does not exist
        if (!fs.existsSync(destinationPath)) {
            fs.mkdirSync(destinationPath, { recursive: true });
        }
        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const imageFileFilter = (req, file, cb) => {
    if (!file) { cb("Image file missing", false) };
    if (!file.mimetype.startsWith("image")) {
        cb("Supports only image files", false);
    }
    cb(null, true);
};

const videoFileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith("video")) {
        cb("Supports only image files", false);
    }
    cb(null, true);
};

exports.uploadImage = multer({ storage, imageFileFilter, limits: { fieldSize: 1000000000 } });
exports.uploadVideo = multer({ storage, videoFileFilter });
