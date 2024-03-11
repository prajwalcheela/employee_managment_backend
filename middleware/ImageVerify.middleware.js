
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, next) {
    console.log(req.body.f_Image)
    next(null, 'uploads/'); 
  },
  filename: function (req, file, next) {
    next(null, file.originalname);
  }
});

const fileFilter = function (req, file, next) {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    next(null, true); // Accept the file
  } else {
    next(new Error('Only JPEG and PNG files are allowed'), false); // Reject the file
  }
};

const upload = multer({ storage: storage});

module.exports = { upload };
// , fileFilter: fileFilter 