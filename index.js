const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const multer = require('multer');
const path = require('path');
const mime = require('mime-types'); // new
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const upload = multer({
    dest: 'uploads/',
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only JPEG and PNG images are allowed'));
        }
    }
});

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('WhatsApp Client is ready!');
});

client.initialize();

// API to send text message
app.post('/send-message', async (req, res) => {
    const { number, message } = req.body;

    try {
        const chatId = number.includes('@c.us') ? number : `${number}@c.us`;

        await client.sendMessage(chatId, message);

        res.json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to send message' });
    }
});

// Install it first if needed
// npm install mime-types

app.post('/send-media', upload.single('file'), async (req, res) => {
    const { number, caption } = req.body;
    const filePath = req.file.path;
    const fileName = req.file.originalname;

    try {
        const chatId = number.includes('@c.us') ? number : `${number}@c.us`;

        const mimeType = mime.lookup(filePath); // detect MIME type (image/jpeg, image/png, etc)
        const fileData = fs.readFileSync(filePath); // read the file
        const base64Data = fileData.toString('base64'); // convert file to Base64

        const media = new MessageMedia(mimeType, base64Data, fileName); // create correct media

        await client.sendMessage(chatId, media, { caption: caption }); // send with caption

        fs.unlinkSync(filePath); // delete file after sending

        res.json({ success: true, message: 'Media sent successfully!' });
    } catch (error) {
        console.error('Error sending media:', error);
        res.status(500).json({ success: false, message: 'Failed to send media' });
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
