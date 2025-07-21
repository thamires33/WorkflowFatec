const multer = require('multer');
const path = require('path');

// Configuração de armazenamento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads')); // pasta "uploads"
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const nome = path.basename(file.originalname, ext);
    cb(null, `${timestamp}-${nome}${ext}`);
  }
});

const upload = multer({ storage });

module.exports = upload;
