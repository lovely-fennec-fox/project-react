const express = require('express');
const router = express.Router();
const fs = require('fs');
var multer = require('multer');
// var upload = multer({
//     dest: 'uploads/'
// });


var storage = multer.diskStorage({
    // 서버에 저장할 폴더
    destination: function (req, file, cb) {
        // console.log(file);
        cb(null, '../public/jpg');
    },
    // 서버에 저장할 파일명
    filename: function (req, file, cb) {
        // console.log(file);
        file.uploadfilename = file.originalname.substring(0, file.originalname.lastIndexOf('.'));
        cb(null, file.originalname);
    }
});

var imgFileFilter = function (req, file, callback) {
    var ext = path.extname(file.originalname);
    console.log('확장자 : ', ext);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return callback(new Error('Only images are allowed'))
    }
    callback(null, true);
};

var imgUpload = multer({
    storage: storage,
    fileFilter: imgFileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});
// router.post('/', (req,res)=>{
//     console.log('/server/uploadimage 요청 받음');
//     console.log(req.files);
//     console.log(req.file);
//     console.log(req.body);
// });
router.post('/', imgUpload.single('image'), async (req, res) => {
    console.log('/server/imageupload요청 받음')
    let origin_image = req.body.origin_image;
    if (origin_image !== "./jpg/basicprofile.jpg") {
        origin_image = origin_image.substring(1);
        origin_image = "../public"+origin_image;
        console.log(origin_image);
        fs.unlink(origin_image, function (err) {
            if (err) throw err;
            console.log('원래 이미지 삭제 됨');
        });
    }
    await save.updatedb('Users_TB', [{ name: 'image_path', value: `./jpg/${req.file.filename}` }], 'name_user', req.body.username);
    res.json({ image_path: `./jpg/${req.file.filename}` });
});

module.exports = router;