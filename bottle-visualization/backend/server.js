
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const sharp = require('sharp');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const outputPath = path.join(__dirname, 'uploads', 'processed.png');
        await sharp(req.file.path)
            .resize(500, 500)
            .toFormat('png')
            .toFile(outputPath);
        res.sendFile(outputPath);
    } catch (err) {
        res.status(500).send('Error processing image');
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));
