import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    },
})


const fileFilter = (req, file, cb)=>{
    const allowedTypes = '/image\/jpeg|image\/jpg|image\/png/';
    const exctractedtype = allowedTypes.test()
}