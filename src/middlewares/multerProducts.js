//----------* REQUIRE'S *----------//
const multer = require('multer');
const path = require('path');


//----------* VARIABLE'S *----------//
const publicImagesPath = path.resolve(__dirname, '../../public/img');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(publicImagesPath, 'products'));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


//----------* MIDDLEWARE *----------//
module.exports = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        const isAccepted = acceptedExtensions.includes(path.extname(file.originalname).toLowerCase());
        if(!isAccepted){
            req.files = [...req.files, file];
        }
        cb(null, isAccepted);
    }
});