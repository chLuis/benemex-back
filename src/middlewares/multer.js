const multer = require('multer');
const path = require('path');

module.exports = multer({
    storage: multer.diskStorage({ }),
    fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.webp') return cb(new Error('Formato incorrecto'), false);
      cb(null, true);
    },
    // limits: {
    //     fileSize: 100 * 1024 * 1024
    // }
})// .single('file')