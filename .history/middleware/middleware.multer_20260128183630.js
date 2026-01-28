import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    },
})


const fileFilter = (req, file, cb) => {
    const allowedTypes = '/image\/jpeg|image\/jpg|image\/png/';
    const exctractedtype = allowedTypes.test(Path.exctractedName(file.originalname).lowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (exctractedtype && mimetype) {
        cb(null, true)
    } else {
        cb(new Error('Only .jpeg, .jpg and .png format allowed!'), false)
    }
}

const uploads = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter

})

export default uploads;