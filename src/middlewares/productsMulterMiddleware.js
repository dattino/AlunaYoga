const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/products');
    },
    filename: (req, file, cb) => {
        const imageName = Date.now() + '-' + file.originalname;
        cb(null, imageName);
    }
});

const fileFilter = (req, file, cb) => {
    const accepted = ['image/jpeg', 'image/jpg', 'image/png','image/gif'];
    if(accepted.includes(file.mimetype)) {
        cb(null,true)
    } else {
        cb(null,false)
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;