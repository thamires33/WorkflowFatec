// Backend/src/config/multer.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Garante que a pasta de uploads exista
const uploadDir = path.resolve(__dirname, '..', '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuração de armazenamento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const sanitizedName = file.originalname.replace(/\s+/g, '_').replace(/[^\w.-]/g, '');
    cb(null, `${timestamp}-${sanitizedName}`);
  }
});

const upload = multer({ storage });

module.exports = upload;
